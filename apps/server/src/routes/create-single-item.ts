import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { FormSchema } from '../schema/items.ts'
import { loadItems, saveItems } from '../storage/items.ts'

const createSingleItem: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/items',
        schema: {
            body: FormSchema,
        },
        async handler(request, reply) {
            const validatedData = FormSchema.parse(request.body)

            const newItem = validatedData

            const items = await loadItems()

            items.push(newItem)

            await saveItems(items)

            return reply.code(201).send(newItem)
        },
    })
}

export default createSingleItem
