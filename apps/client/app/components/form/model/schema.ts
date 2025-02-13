// import type { TFormValues } from "~/shared/schema/items"

// export const categorySchemas = {
//   REAL_ESTATE: [
//     { name: 'propertyType', label: 'Тип недвижимости' },
//     { name: 'area', label: 'Площадь м²', type: 'number' },
//     { name: 'rooms', label: 'Количество комнат', type: 'number' },
//     { name: 'price', label: 'Цена', type: 'number' },
//   ] as const,
//   AUTO: [
//     { name: 'brand', label: 'Марка' },
//     { name: 'model', label: 'Модель' },
//     { name: 'year', label: 'Год выпуска', type: 'number' },
//     { name: 'mileage', label: 'Пробег', type: 'number', optional: true },
//   ] as const,
//   SERVICES: [
//     { name: 'serviceType', label: 'Тип услуги' },
//     { name: 'experience', label: 'Опыт (лет)', type: 'number' },
//     { name: 'cost', label: 'Стоимость', type: 'number' },
//     { name: 'workSchedule', label: 'График работы', optional: true },
//   ] as const,
// }

// const defaultValuesMap: Record<TFormValues['type'], Partial<TFormValues>> = {
//   REAL_ESTATE: {
//       propertyType: '',
//       area: 0,
//       rooms: 0,
//       price: 0,
//   },
//   AUTO: {
//       brand: '',
//       model: '',
//       year: 0,
//       mileage: 0,
//   },
//   SERVICES: {
//       serviceType: '',
//       experience: 0,
//       cost: 0,
//       workSchedule: '',
//   },
// }

// export const getDefaultValues = (category: TFormValues['type']): TFormValues => ({
//   name: '',
//   description: '',
//   location: '',
//   photo: '',
//   type: category,
//   ...structuredClone(defaultValuesMap[category]),
// }) as

import type { FormSchema as TFormSchema } from '~/shared/api'
import { nanoid } from 'nanoid'
import { z } from 'zod'

export const nanoidSchema = z
    .string()
    .length(21, 'ID должен быть длиной 21 символ')
    .regex(/^[a-zA-Z0-9_-]{21}$/, 'Некорректный формат ID')

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

export const getDefaultValues = (type: TFormSchema['type']) => {
    return {
        name: '',
        description: '',
        location: '',
        photo: undefined,
        type,
        ...(type === 'REAL_ESTATE'
            ? { propertyType: '', area: 0, rooms: 0, price: 0 }
            : type === 'AUTO'
              ? { brand: '', model: '', year: new Date().getFullYear(), mileage: 0 }
              : { serviceType: '', experience: 0, cost: 0, workSchedule: '' }),
    }
}

export const FormSchema = z.discriminatedUnion('type', [RealEstateSchema, CarSchema, ServiceSchema])

// export const getDefaultValues = (type: TFormSchema['type']): TFormSchema => {
//   return {
//     name: '',
//     description: '',
//     location: '',
//     photo: undefined,
//     type: z.union([z.literal('REAL_ESTATE'), z.literal('AUTO'), z.literal('SERVICES')]),
//     ...(type === 'REAL_ESTATE'
//         ? { propertyType: '', area: 0, rooms: 0, price: 0 }
//         : type === 'AUTO'
//         ? { brand: '', model: '', year: new Date().getFullYear(), mileage: 0 }
//         : { serviceType: '', experience: 0, cost: 0, workSchedule: '' }),
//   }
// }

// export const getDefaultRealEstateValues = (): RealEstateSchema => {
//   return {
//     name: '',
//     description: '',
//     location: '',
//     photo: undefined,
//     type: 'REAL_ESTATE',
//     propertyType: '',
//     area: 0,
//     rooms: 0,
//     price: 0,
//   }
// }

// export const getDefaultCarValues = (): CarSchema => {
//   return {
//     name: '',
//     description: '',
//     location: '',
//     photo: undefined,
//     type: 'AUTO',
//     brand: '',
//     model: '',
//     year: new Date().getFullYear(),
//     mileage: 0,
//   }
// }

// export const getDefaultServiceValues = (): ServiceSchema => {
//   return {
//     name: '',
//     description: '',
//     location: '',
//     photo: undefined,
//     type: 'SERVICES',
//     serviceType: '',
//     experience: 0,
//     cost: 0,
//     workSchedule: '',
//   }
// }
