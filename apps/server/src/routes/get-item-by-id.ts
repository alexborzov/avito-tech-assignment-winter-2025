import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { loadItems } from '../storage/items.ts'
import { nanoidSchema, FormSchema } from '../schema/items.ts'
import { z } from 'zod'

const getItemById: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/items/:id',
        schema: {
            response: {
                200: FormSchema,
            },
            params: z.object({
              id: nanoidSchema
            }),
        },
        async handler(request, reply) {
            const items = await loadItems()

            const item = items.find(i => i.id === request.params.id)

            // @ts-ignore
            if (!item) return reply.status(404).send({ error: 'Item not found' })

            return reply.send(item)
        },
    })
}

export default getItemById
