import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { loadItems } from '../storage/items.ts'
import { nanoidSchema } from '../schema/items.ts'
import { z } from 'zod'

const deleteItemById: FastifyPluginAsync = async fastify => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'DELETE',
        url: '/items/:id',
        schema: {
            params: z.object({
                id: nanoidSchema,
            }),
        },
        handler: async (request, reply) => {
            const items = await loadItems()

            const itemIndex = items.findIndex(i => i.id === request.params.id)

            if (itemIndex === -1) return reply.code(404).send({ error: 'Item not found' })

            items.splice(itemIndex, 1)

            return reply.code(204).send()
        },
    })
}

export default deleteItemById
