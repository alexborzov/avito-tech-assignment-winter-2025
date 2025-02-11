import type { TItems } from '../schema/items.ts'
import { ItemTypes } from '../constants/item-types.ts'

const examples = [
    {
        id: 1,
        name: 'Квартира в центре',
        description: 'Просторная квартира в центре города',
        location: 'Москва',
        type: ItemTypes.REAL_ESTATE,
        propertyType: 'Квартира',
        area: 100,
        rooms: 3,
        price: 15000000,
    },
    {
        id: 2,
        name: 'Toyota Camry',
        description: 'Надежный автомобиль',
        location: 'Москва',
        type: ItemTypes.AUTO,
        brand: 'Toyota',
        model: 'Camry',
        year: 2020,
        mileage: 15000,
    },
    {
        id: 3,
        name: 'Ремонт квартир',
        description: 'Качественный ремонт квартир',
        location: 'Москва',
        type: ItemTypes.SERVICES,
        serviceType: 'Ремонт',
        experience: 5,
        cost: 50000,
        workSchedule: 'Пн-Пт, 9:00-18:00',
    },
]

const items: TItems[] = [...examples]

const makeCounter = () => {
    let count = 0
    return () => count++
}

const itemsIdCounter = makeCounter()

export { items, itemsIdCounter }
