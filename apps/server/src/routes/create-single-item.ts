import { itemsSchema } from '../schema/items.ts'
import type { FastifyPluginAsync } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { items, itemsIdCounter } from '../storage/items.ts'
import { ItemTypes } from '../constants/item-types.ts'

const createSingleItem: FastifyPluginAsync = async (fastify): Promise<void> => {
    fastify.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/items',
        schema: {
            body: itemsSchema,
        },
        async handler(request, reply) {
            const { name, description, location, type, ...rest } = request.body

            switch (type) {
                case ItemTypes.REAL_ESTATE:
                    if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
                        return reply.code(400).send({ error: 'Missing required fields for Real estate' })
                    }
                    break
                case ItemTypes.AUTO:
                    if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
                        return reply.code(400).send({ error: 'Missing required fields for Auto' })
                    }
                    break
                case ItemTypes.SERVICES:
                    if (!rest.serviceType || !rest.experience || !rest.cost) {
                        return reply.code(400).send({ error: 'Missing required fields for Services' })
                    }
                    break
                default:
                    return reply.code(400).send({ error: 'Invalid type' })
            }

            const item = Object.assign({
              id: itemsIdCounter(),
              name,
              description,
              location,
              type,
          }, rest);

            items.push(item)

            return reply.code(201).send(item)
        },
    })
}

export default createSingleItem
