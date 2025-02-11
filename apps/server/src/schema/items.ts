import { z } from 'zod'
import { ItemTypes } from '../constants/item-types.ts'

export const paramsSchema = z.object({
    id: z.string().transform(Number),
})

export const itemsSchema = z
    .object({
        id: z.number(),
        name: z.string(),
        description: z.string(),
        location: z.string(),
        type: z.nativeEnum(ItemTypes),
        image: z.string().optional(),

        // Общие поля для всех типов
        propertyType: z.string().optional(),
        area: z.number().optional(),
        rooms: z.number().optional(),
        price: z.number().optional(),
        brand: z.string().optional(),
        model: z.string().optional(),
        year: z.number().optional(),
        mileage: z.number().optional(),
        serviceType: z.string().optional(),
        experience: z.number().optional(),
        cost: z.number().optional(),
        workSchedule: z.string().optional(),
    })
    .refine(
        data => {
            if (data.type === ItemTypes.REAL_ESTATE) {
                return (
                    data.propertyType !== undefined &&
                    data.area !== undefined &&
                    data.rooms !== undefined &&
                    data.price !== undefined
                )
            }
            if (data.type === ItemTypes.AUTO) {
                return data.brand !== undefined && data.model !== undefined && data.year !== undefined
            }
            if (data.type === ItemTypes.SERVICES) {
                return data.serviceType !== undefined && data.experience !== undefined && data.cost !== undefined
            }
            return true
        },
        {
            message: 'Некоторые обязательные поля отсутствуют в зависимости от типа объявления',
        },
    )
    .refine(
        data => {
            // Дополнительная проверка для авто: пробег может быть, но не обязателен
            if (data.type === ItemTypes.AUTO) {
                return data.mileage === undefined || typeof data.mileage === 'number'
            }
            // Для услуг: график работы опционален
            if (data.type === ItemTypes.SERVICES) {
                return data.workSchedule === undefined || typeof data.workSchedule === 'string'
            }
            return true
        },
        {
            message: 'Неверный формат дополнительных полей',
        },
    )

export type TItems = z.infer<typeof itemsSchema>
