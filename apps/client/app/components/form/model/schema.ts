import { nanoid } from 'nanoid'
import { z } from 'zod'

type CategorySchemaMap = {
    REAL_ESTATE: {
        propertyType: string
        area: number
        rooms: number
        price: number
    }
    AUTO: {
        brand: string
        model: string
        year: number
        mileage: number
    }
    SERVICES: {
        serviceType: string
        experience: number
        cost: number
        workSchedule: string | undefined
    }
}

interface CategoryField {
    name: string
    label: string
    type?: 'text' | 'number'
    optional?: boolean
}

export const nanoidSchema = z
    .string()
    .length(21, 'ID должен быть длиной 21 символ')
    .regex(/^[a-zA-Z0-9_-]{21}$/, 'Некорректный формат ID')
    .optional()

export const BaseFormSchema = z
    .object({
        id: nanoidSchema.default(() => nanoid()),
        name: z.string().min(1, 'Название обязательно').default(''),
        description: z.string().min(1, 'Описание обязательно').default(''),
        location: z.string().min(1, 'Локация обязательна').default(''),
        photo: z.string().optional(),
        type: z.enum(['REAL_ESTATE', 'AUTO', 'SERVICES']).default('REAL_ESTATE'),
    })
    .strict()

export const RealEstateSchema = BaseFormSchema.extend({
    type: z.literal('REAL_ESTATE'),
    propertyType: z.string().min(1, 'Тип недвижимости обязателен').default(''),
    area: z.number().positive('Площадь должна быть положительным числом').default(0),
    rooms: z.number().int().positive('Количество комнат должно быть положительным числом').default(0),
    price: z.number().positive('Цена должна быть положительным числом').default(0),
}).strict()

export const CarSchema = BaseFormSchema.extend({
    type: z.literal('AUTO'),
    brand: z.string().min(1, 'Марка обязательна').default(''),
    model: z.string().min(1, 'Модель обязательна').default(''),
    year: z.number().int().min(1886, 'Некорректный год выпуска').default(0),
    mileage: z.number().positive('Пробег должен быть положительным числом').optional().default(0),
}).strict()

export const ServiceSchema = BaseFormSchema.extend({
    type: z.literal('SERVICES'),
    serviceType: z.string().min(1, 'Тип услуги обязателен'),
    experience: z.number().int().nonnegative('Опыт работы должен быть положительным числом'),
    cost: z.number().positive('Стоимость должна быть положительным числом'),
    workSchedule: z.string().optional(),
}).strict()

export const categorySchemasMap: Record<keyof CategorySchemaMap, CategoryField[]> = {
    REAL_ESTATE: [
        { name: 'propertyType', label: 'Тип недвижимости' },
        { name: 'area', label: 'Площадь м²', type: 'number' },
        { name: 'rooms', label: 'Количество комнат', type: 'number' },
        { name: 'price', label: 'Цена', type: 'number' },
    ],
    AUTO: [
        { name: 'brand', label: 'Марка' },
        { name: 'model', label: 'Модель' },
        { name: 'year', label: 'Год выпуска', type: 'number' },
        { name: 'mileage', label: 'Пробег', type: 'number', optional: true },
    ],
    SERVICES: [
        { name: 'serviceType', label: 'Тип услуги' },
        { name: 'experience', label: 'Опыт (лет)', type: 'number' },
        { name: 'cost', label: 'Стоимость', type: 'number' },
        { name: 'workSchedule', label: 'График работы', optional: true },
    ],
}

export const getDefaultValues = (type: TFormSchema['type'], existingId?: string) => ({
    id: existingId ?? nanoid(),
    name: '',
    description: '',
    location: '',
    photo: undefined,
    ...(type === 'REAL_ESTATE'
        ? { propertyType: '', area: 0, rooms: 0, price: 0 }
        : type === 'AUTO'
          ? { brand: '', model: '', year: new Date().getFullYear(), mileage: 0 }
          : { serviceType: '', experience: 0, cost: 0, workSchedule: undefined }),
})

export const FormSchema = z.discriminatedUnion('type', [RealEstateSchema, CarSchema, ServiceSchema])

export type TFormSchema = z.infer<typeof FormSchema>

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const setFormValues = (form: any, item: TFormSchema) => {
    const defaultValues = getDefaultValues(item.type, item.id)
    form.reset({ ...defaultValues, ...item })
}
