import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoLoad, { type AutoloadPluginOptions } from '@fastify/autoload'
import type { FastifyPluginAsync } from 'fastify'
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

export type AppOptions = {} & Partial<AutoloadPluginOptions>

const options: AppOptions = {}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const Bootstrap: FastifyPluginAsync = async (fastify, _options) => {
    try {
        fastify.setValidatorCompiler(validatorCompiler)

        fastify.setSerializerCompiler(serializerCompiler)

        console.log('💠 Registering plugins...')
        await fastify.register(AutoLoad, {
            dir: join(__dirname, 'plugins'),
            forceESM: true,
            ..._options,
        })

        console.log('🔀 Registering routes...')
        await fastify.register(AutoLoad, {
            dir: join(__dirname, 'routes'),
            forceESM: true,
            ..._options,
        })

        fastify.log.info('🚀 Server listening on 3000')

        fastify.log.info('📄 Documentation running at http://localhost:3000/documentation')
    } catch (error) {
        if (error instanceof Error) {
            fastify.log.error(error)
            process.exit(1)
        }
    }
}

export default Bootstrap
export { Bootstrap, options }
