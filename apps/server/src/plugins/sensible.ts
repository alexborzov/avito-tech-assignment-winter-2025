import { type FastifySensibleOptions } from '@fastify/sensible'
import fp from 'fastify-plugin'

const sensibleFp = fp<FastifySensibleOptions>(async fastify => await fastify.register(import('@fastify/sensible')), {
    name: 'fastifySensible',
    fastify: '5.x',
})

export default sensibleFp
