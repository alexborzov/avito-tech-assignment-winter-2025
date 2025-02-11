import { type FastifyCorsOptions } from '@fastify/cors'
import fp from 'fastify-plugin'

const sensibleFp = fp<FastifyCorsOptions>(
    async fastify => {
        await fastify.register(import('@fastify/cors'), {
            origin: ['*'],
        })
    },
    {
        name: 'fastifyCors',
        fastify: '5.x',
    },
)

export default sensibleFp
