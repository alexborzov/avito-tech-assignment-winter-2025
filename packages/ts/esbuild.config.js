// @ts-check
import { mkdir, writeFile, copyFile, readFile } from 'node:fs/promises'
import { isolatedDeclaration } from 'oxc-transform'
import * as path from 'node:path'
import * as esbuild from 'esbuild'

const getDtsEsbuildPlugin = () => {
    const wroteTrack = new Set()
    return {
        name: 'oxc-transform-dts',
        setup(build) {
            const rootPath = path.resolve('src')
            const outPath = path.resolve('dist')

            build.onStart(() => wroteTrack.clear())

            build.onLoad({ filter: /\.ts$/ }, async args => {
                if (args.path.startsWith(rootPath) && !wroteTrack.has(args.path)) {
                    wroteTrack.add(args.path)
                    const fileContent = await readFile(args.path, 'utf-8')
                    const { code } = isolatedDeclaration(args.path, fileContent)
                    const outFilePath = path.join(
                        outPath,
                        args.path.replace(new RegExp(`^${rootPath}`), '').replace(/\.ts$/, '.d.ts'),
                    )
                    await mkdir(path.dirname(outFilePath), { recursive: true })
                    await writeFile(outFilePath, code)
                }
                return undefined
            })
        },
    }
}

const copyFiles = async (files, srcDir, destDir) => {
    await Promise.all(
        files.map(async file => {
            const srcPath = path.join(srcDir, file)
            const destPath = path.join(destDir, file)

            await copyFile(srcPath, destPath)
        }),
    )
}

const build = async () => {
    const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf-8'))
    const filesToCopy = [
        'typescript.base.json',
        'typescript.fastify.json',
        'typescript.gatsby.json',
        'typescript.nestjs.json',
        'typescript.node.json',
        'typescript.nextjs.json',
        'typescript.react.json',
        'typescript.vite.json',
    ]

    try {
        await esbuild.build({
            entryPoints: ['src/index.ts'],
            outdir: 'dist',
            bundle: true,
            format: 'esm',
            platform: 'node',
            target: 'esnext',
            minify: true,
            sourcemap: true,
            external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
            tsconfig: 'tsconfig.json',
            plugins: [getDtsEsbuildPlugin()],
        })

        await copyFiles(filesToCopy, 'src', 'dist')
        console.log('Build completed successfully! 🚀')
    } catch (error) {
        console.error('Build failed:', {
            cause: error,
        })
    }
}

await build()
