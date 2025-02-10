import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

const cookie: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/cookie',
        async handler(request, reply) {
            reply
                .setCookie('foo', 'foo', {
                    domain: 'localhost',
                    path: '/cookie',
                })
                .cookie('baz', 'baz') // alias for setCookie
                .setCookie('bar', 'bar', {
                    path: '/',
                    signed: true,
                })
                .send({ hello: 'world' })
        },
    })
}

export default cookie
