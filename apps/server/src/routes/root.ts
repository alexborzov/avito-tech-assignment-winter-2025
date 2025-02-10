import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/',
        async handler(request, response) {
            response.send('Hello from Fastify!')
        },
    })
}

export default root
