import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { loadItems } from '../storage/items.ts'
import { z } from 'zod'
import { FormSchema } from '../schema/items.ts'

const getAllItems: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/items',
        schema: {
            response: {
                200: z.array(FormSchema),
            },
        },
        async handler(_, reply) {
            const items = await loadItems()
            return reply.send(items)
        },
    })
}

export default getAllItems
