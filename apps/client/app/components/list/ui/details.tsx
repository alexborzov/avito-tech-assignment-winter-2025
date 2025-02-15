import type { GetItemsId200 } from '~/shared/api'
export const details = (item: GetItemsId200) => {
    switch (item?.type) {
        case 'REAL_ESTATE':
            return (
                <>
                    <p>
                        🏠 <strong>Тип недвижимости:</strong> {item.propertyType}
                    </p>
                    <p>
                        📏 <strong>Площадь:</strong> {item.area} м²
                    </p>
                    <p>
                        🚪 <strong>Комнат:</strong> {item.rooms}
                    </p>
                    <p>
                        💰 <strong>Цена:</strong> {item.price ? item.price.toLocaleString('ru-RU') : 'Не указана'} ₽
                    </p>
                </>
            )
        case 'AUTO':
            return (
                <>
                    <p>
                        🚗 <strong>Марка:</strong> {item.brand}
                    </p>
                    <p>
                        🚘 <strong>Модель:</strong> {item.model}
                    </p>
                    <p>
                        📅 <strong>Год:</strong> {item.year}
                    </p>
                    <p>
                        ⏳ <strong>Пробег:</strong> {item.mileage?.toLocaleString('ru-RU')} км
                    </p>
                </>
            )
        case 'SERVICES':
            return (
                <>
                    <p>
                        🛠 <strong>Тип услуги:</strong> {item.serviceType}
                    </p>
                    <p>
                        📅 <strong>Опыт:</strong> {item.experience} лет
                    </p>
                    <p>
                        💵 <strong>Стоимость:</strong> {item.cost?.toLocaleString()} ₽
                    </p>
                    <p>
                        🕒 <strong>График работы:</strong> {item.workSchedule}
                    </p>
                </>
            )
        default:
            return <p>Нет дополнительных данных</p>
    }
}
