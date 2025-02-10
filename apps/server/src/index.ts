import type { FastifyPluginAsync } from 'fastify'
import AutoLoad, { type AutoloadPluginOptions } from '@fastify/autoload'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export type AppOptions = {} & Partial<AutoloadPluginOptions>

const options: AppOptions = {}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const Bootstrap: FastifyPluginAsync<AppOptions> = async (fastify, _options): Promise<void> => {
    try {
        fastify.setValidatorCompiler(validatorCompiler)
        fastify.setSerializerCompiler(serializerCompiler)
        await fastify.register(AutoLoad, {
            dir: join(__dirname, 'plugins'),
            forceESM: true,
            ignorePattern: /^.*(?:test|spec).ts$/,
            ignoreFilter: path => path.endsWith('.spec.ts'),
            encapsulate: false,
            ..._options,
        })
        fastify.register(AutoLoad, {
            dir: join(__dirname, 'routes'),
            forceESM: true,
            ignorePattern: /^.*(?:test|spec).ts$/,
            ignoreFilter: path => path.endsWith('.spec.ts'),
            ..._options,
        })
        fastify.ready()
    } catch (error) {
        if (error instanceof Error) {
            Error(error.message)
            process.exit(1)
        }
    }
}

export default Bootstrap
export { Bootstrap, options }
