import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const sensible: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/not-found',
        async handler() {
            throw fastify.httpErrors.notFound()
        },
        schema: {
            response: {
                '404': { $ref: 'HttpError' },
            },
        },
    })
}

export default sensible
