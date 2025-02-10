import fastifySensible, { type FastifySensibleOptions } from '@fastify/sensible'
import fp from 'fastify-plugin'

const sensibleFp = fp<FastifySensibleOptions>(async fastify => await fastify.register(fastifySensible), {
    name: 'fastifySensible',
    fastify: '5.x',
})

export default sensibleFp
