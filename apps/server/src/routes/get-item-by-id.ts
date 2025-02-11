import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { items } from '../storage/items.ts'
import { itemsSchema, paramsSchema } from '../schema/items.ts'
import { z } from 'zod'

const errorSchema = z.object({
    error: z.string(),
})

// const responseSchema = z.union([itemsSchema, errorSchema]);

const getItemById: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'GET',
        url: '/items/:id',
        schema: {
            response: {
                200: itemsSchema,
                404: errorSchema,
            },
            params: paramsSchema,
        },
        async handler(request, reply) {
            const item = items.find(i => i.id === request.params.id)

            if (!item) return reply.status(404).send({ error: 'Item not found' })

            return reply.send(item)
        },
    })
}

export default getItemById
