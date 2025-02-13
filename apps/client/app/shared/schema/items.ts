import { z } from 'zod'

export const nanoidSchema = z
    .string()
    .length(21, 'ID должен быть длиной 21 символ')
    .regex(/^[a-zA-Z0-9_-]{21}$/, 'Некорректный формат ID')

export const BaseFormSchema = z
    .object({
        id: nanoidSchema,
        name: z.string().min(1, 'Название обязательно'),
        description: z.string().min(1, 'Описание обязательно'),
        location: z.string().min(1, 'Локация обязательна'),
        photo: z.string().optional(),
        type: z.enum(['REAL_ESTATE', 'AUTO', 'SERVICES']),
    })
    .strict()

export const RealEstateSchema = BaseFormSchema.extend({
    type: z.literal('REAL_ESTATE'),
    propertyType: z.string().min(1, 'Тип недвижимости обязателен'),
    area: z.number().positive('Площадь должна быть положительным числом'),
    rooms: z.number().int().positive('Количество комнат должно быть положительным числом'),
    price: z.number().positive('Цена должна быть положительным числом'),
}).strict()

export const CarSchema = BaseFormSchema.extend({
    type: z.literal('AUTO'),
    brand: z.string().min(1, 'Марка обязательна'),
    model: z.string().min(1, 'Модель обязательна'),
    year: z.number().int().min(1886, 'Некорректный год выпуска'),
    mileage: z.number().positive('Пробег должен быть положительным числом').optional(),
}).strict()

export const ServiceSchema = BaseFormSchema.extend({
    type: z.literal('SERVICES'),
    serviceType: z.string().min(1, 'Тип услуги обязателен'),
    experience: z.number().int().nonnegative('Опыт работы должен быть положительным числом'),
    cost: z.number().positive('Стоимость должна быть положительным числом'),
    workSchedule: z.string().optional(),
}).strict()

export const FormSchema = z.discriminatedUnion('type', [RealEstateSchema, CarSchema, ServiceSchema])

export type TFormValues = z.infer<typeof FormSchema>

export const ClientFormSchema = FormSchema

export const ServerFormSchema = FormSchema

// import { nanoid } from 'nanoid'
// import { z } from 'zod'

// const nanoidSchema = z
//   .string()
//   .length(21, 'ID должен быть длиной 21 символ')
//   .regex(/^[a-zA-Z0-9_-]{21}$/, 'Некорректный формат ID')

// export const BaseFormSchema = z.object({
//   id: nanoidSchema.default(() => nanoid()), // Генерация ID по умолчанию
//   name: z.string().min(1, 'Название обязательно').default(''),
//   description: z.string().min(1, 'Описание обязательно').default(''),
//   location: z.string().min(1, 'Локация обязательна').default(''),
//   photo: z.string().optional().default(''),
//   type: z.enum(['REAL_ESTATE', 'AUTO', 'SERVICES']),
// })

// const RealEstateDefaults = {
//   propertyType: '',
//   area: 0,
//   rooms: 0,
//   price: 0,
// } as const

// const CarDefaults = {
//   brand: '',
//   model: '',
//   year: new Date().getFullYear(),
//   mileage: undefined,
// } as const

// const ServiceDefaults = {
//   serviceType: '',
//   experience: 0,
//   cost: 0,
//   workSchedule: '',
// } as const

// // Создаём схемы с дефолтными значениями
// const RealEstateSchema = BaseFormSchema.extend({
//   type: z.literal('REAL_ESTATE'),
//   propertyType: z.string().min(1, 'Тип недвижимости обязателен'),
//   area: z.number().positive('Площадь должна быть положительным числом'),
//   rooms: z.number().int().positive('Количество комнат должно быть положительным числом'),
//   price: z.number().positive('Цена должна быть положительным числом'),
// }).merge(z.object(RealEstateDefaults).partial())

// const CarSchema = BaseFormSchema.extend({
//   type: z.literal('AUTO'),
//   brand: z.string().min(1, 'Марка обязательна'),
//   model: z.string().min(1, 'Модель обязательна'),
//   year: z.number().int().min(1886, 'Некорректный год выпуска'),
//   mileage: z.number().positive('Пробег должен быть положительным числом').optional(),
// }).merge(z.object(CarDefaults).partial())

// const ServiceSchema = BaseFormSchema.extend({
//   type: z.literal('SERVICES'),
//   serviceType: z.string().min(1, 'Тип услуги обязателен'),
//   experience: z.number().int().nonnegative('Опыт работы должен быть положительным числом'),
//   cost: z.number().positive('Стоимость должна быть положительным числом'),
//   workSchedule: z.string().optional(),
// }).merge(z.object(ServiceDefaults).partial())

// export const FormSchema = z.discriminatedUnion('type', [RealEstateSchema, CarSchema, ServiceSchema])

// export type TFormValues = z.infer<typeof FormSchema>
