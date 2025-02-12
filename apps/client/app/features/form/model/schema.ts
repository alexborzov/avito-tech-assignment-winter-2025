import { z } from 'zod'
import { ItemsType } from '~/shared/api'

const categorySchemas = {
    [ItemsType.Недвижимость]: [
        { name: 'propertyType', label: 'Тип недвижимости' },
        { name: 'area', label: 'Площадь м²', type: 'number' },
        { name: 'rooms', label: 'Количество комнат', type: 'number' },
        { name: 'price', label: 'Цена', type: 'number' },
    ] as const,
    [ItemsType.Авто]: [
        { name: 'brand', label: 'Марка' },
        { name: 'model', label: 'Модель' },
        { name: 'year', label: 'Год выпуска', type: 'number' },
        { name: 'mileage', label: 'Пробег', type: 'number', optional: true },
    ] as const,
    [ItemsType.Услуги]: [
        { name: 'serviceType', label: 'Тип услуги' },
        { name: 'experience', label: 'Опыт (лет)', type: 'number' },
        { name: 'cost', label: 'Стоимость', type: 'number' },
        { name: 'workSchedule', label: 'График работы', optional: true },
    ] as const,
}

const baseSchemaValidate = z.object({
    name: z.string().min(1, 'Название обязательно'),
    description: z.string().min(1, 'Описание обязательно'),
    location: z.string().min(1, 'Локация обязательна'),
    image: z.string().optional(),
    type: z.nativeEnum(ItemsType, { errorMap: () => ({ message: 'Выберите категорию' }) }),
})

const categorySchemasValidate = {
    [ItemsType.Недвижимость]: z.object({
        propertyType: z.string().min(1, 'Тип недвижимости обязателен'),
        area: z.preprocess(v => Number(v), z.number().min(1, 'Укажите площадь')),
        rooms: z.preprocess(v => Number(v), z.number().min(1, 'Укажите количество комнат')),
        price: z.preprocess(v => Number(v), z.number().min(1, 'Укажите цену')),
        type: z.literal(ItemsType.Недвижимость).default(ItemsType.Недвижимость), // Устанавливаем тип по умолчанию
    }),
    [ItemsType.Авто]: z.object({
        brand: z.string().min(1, 'Марка обязательна'),
        model: z.string().min(1, 'Модель обязательна'),
        year: z.preprocess(v => Number(v), z.number().min(1886, 'Укажите корректный год')),
        mileage: z.preprocess(v => (v ? Number(v) : undefined), z.number().optional()),
        type: z.literal(ItemsType.Авто).default(ItemsType.Авто), // Устанавливаем тип по умолчанию
    }),
    [ItemsType.Услуги]: z.object({
        serviceType: z.string().min(1, 'Тип услуги обязателен'),
        experience: z.preprocess(v => Number(v), z.number().min(1, 'Опыт обязателен')),
        cost: z.preprocess(v => Number(v), z.number().min(1, 'Стоимость обязательна')),
        workSchedule: z.string().optional(),
        type: z.literal(ItemsType.Услуги).default(ItemsType.Услуги), // Устанавливаем тип по умолчанию
    }),
}

const formItemSchemaValidate = z.intersection(
    z.union([
        categorySchemasValidate[ItemsType.Недвижимость],
        categorySchemasValidate[ItemsType.Авто],
        categorySchemasValidate[ItemsType.Услуги],
    ]),
    baseSchemaValidate,
)

type TFormItemData = z.infer<typeof formItemSchemaValidate>

const getDefaultValues = (type: ItemsType): TFormItemData => {
  switch (type) {
      case ItemsType.Недвижимость:
          return {
              name: '',
              description: '',
              location: '',
              image: '',
              type: ItemsType.Недвижимость,
              propertyType: '',
              area: 0,
              rooms: 0,
              price: 0,
          }
      case ItemsType.Авто:
          return {
              name: '',
              description: '',
              location: '',
              image: '',
              type: ItemsType.Авто,
              brand: '',
              model: '',
              year: 0,
              mileage: 0,
          }
      case ItemsType.Услуги:
          return {
              name: '',
              description: '',
              location: '',
              image: '',
              type: ItemsType.Услуги,
              serviceType: '',
              experience: 0,
              cost: 0,
              workSchedule: '',
          }
      default:
          return {
              name: '',
              description: '',
              location: '',
              image: '',
              type: ItemsType.Недвижимость,
              propertyType: '',
              area: 0,
              rooms: 0,
              price: 0,
          }
  }
}


export { formItemSchemaValidate, categorySchemasValidate, baseSchemaValidate, categorySchemas, getDefaultValues }
export type { TFormItemData }
