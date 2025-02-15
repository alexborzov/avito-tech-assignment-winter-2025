import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FormSchema, nanoidSchema } from '../schema/items.ts'
import { loadItems, saveItems } from '../storage/items.ts'
import { z } from 'zod'

const updateItemById: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'PUT',
        url: '/items/:id',
        schema: {
            body: FormSchema,
            params: z.object({
                id: nanoidSchema,
            }),
        },
        async handler(request, reply) {
            const items = await loadItems()

            const item = items.find(i => i.id === request.params.id)

            if (!item) return reply.status(404).send({ error: 'Item not found' })

            const updatedItem = FormSchema.parse(request.body)

            Object.assign(item, updatedItem)

            await saveItems(items)

            return reply.code(200).send(item)
        },
    })
}

export default updateItemById
