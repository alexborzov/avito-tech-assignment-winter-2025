import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { items } from '../storage/items.ts'
import { z } from 'zod'
import { itemsSchema } from '../schema/items.ts'

const getAllItems: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.after(() => {
        fastify.withTypeProvider<ZodTypeProvider>().route({
            method: 'GET',
            url: '/items',
            schema: {
                response: {
                    200: z.array(itemsSchema),
                },
            },
            async handler(_, reply) {
                return reply.send(items)
            },
        })
    })
}

export default getAllItems
