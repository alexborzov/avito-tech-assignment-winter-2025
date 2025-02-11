import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { itemsSchema, paramsSchema } from '../schema/items.ts'
import { items } from '../storage/items.ts'

const updateItemById: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'PUT',
        url: '/items/:id',
        schema: {
            body: itemsSchema,
            params: paramsSchema,
        },
        async handler(request, reply) {
            const item = items.find(i => i.id === request.params.id)

            if (!item) return reply.status(404).send({ error: 'Item not found' })

            Object.assign(item, request.body)

            return reply.code(200).send(item)
        },
    })
}

export default updateItemById
