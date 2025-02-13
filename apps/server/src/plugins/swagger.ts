import { jsonSchemaTransform, createJsonSchemaTransformObject } from 'fastify-type-provider-zod'
import fp from 'fastify-plugin'
import fastifySwagger, { type FastifySwaggerOptions } from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { RealEstateSchema, CarSchema, ServiceSchema, FormSchema } from '../schema/items.ts'

const swaggerFp = fp<FastifySwaggerOptions>(
    async fastify => {
        try {
            await fastify.register(fastifySwagger, {
                openapi: {
                    info: {
                        title: 'avito-tech-assignment-winter-2025-server-swagger 🚀',
                        version: '1.0.0',
                    },
                    servers: [],
                },
                transform: jsonSchemaTransform,
                transformObject: createJsonSchemaTransformObject({
                    schemas: {
                        RealEstateSchema,
                        CarSchema,
                        ServiceSchema,
                        FormSchema,
                    },
                }),
            })

            await fastify.register(fastifySwaggerUI, {
                routePrefix: '/documentation',
            })
        } catch (error) {
            if (error instanceof Error) {
                fastify.log.error(error)
            }
        }
    },
    {
        name: 'fastifySwagger',
        fastify: '5.x',
    },
)

export default swaggerFp
