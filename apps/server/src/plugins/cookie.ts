import fastifyCookie, { type FastifyCookieOptions } from '@fastify/cookie'
import fp from 'fastify-plugin'

const cookieFp = fp<FastifyCookieOptions>(
    async fastify =>
        await fastify.register(fastifyCookie, {
            secret: 'secret',
        }),
    { name: 'fastifyCookie', fastify: '5.x' },
)

export default cookieFp
