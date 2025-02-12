import { useGetItemsId, ItemsType } from '~/shared/api'
import { BoxReveal, Button, VelocityScroll } from '~/shared/ui'
import type { FC } from 'react'

interface IListIdProps {
    params: {
        itemId: string
    }
}

const ListId: FC<IListIdProps> = ({ params: { itemId } }) => {
    const { data: item, error, isLoading } = useGetItemsId(itemId)

    if (isLoading) return <div>Loading...</div>
    if (error instanceof Error) return <div>Error: {error.message}</div>

    const details = () => {
        switch (item?.data.type) {
            case ItemsType.Недвижимость:
                return (
                    <>
                        <p>
                            🏠 <strong>Тип недвижимости:</strong> {item.data.propertyType}
                        </p>
                        <p>
                            📏 <strong>Площадь:</strong> {item.data.area} м²
                        </p>
                        <p>
                            🚪 <strong>Комнат:</strong> {item.data.rooms}
                        </p>
                        <p>
                            💰 <strong>Цена:</strong> {item.data.price?.toLocaleString()} ₽
                        </p>
                    </>
                )
            case ItemsType.Авто:
                return (
                    <>
                        <p>
                            🚗 <strong>Марка:</strong> {item.data.brand}
                        </p>
                        <p>
                            🚘 <strong>Модель:</strong> {item.data.model}
                        </p>
                        <p>
                            📅 <strong>Год:</strong> {item.data.year}
                        </p>
                        <p>
                            ⏳ <strong>Пробег:</strong> {item.data.mileage?.toLocaleString()} км
                        </p>
                    </>
                )
            case ItemsType.Услуги:
                return (
                    <>
                        <p>
                            🛠 <strong>Тип услуги:</strong> {item.data.serviceType}
                        </p>
                        <p>
                            📅 <strong>Опыт:</strong> {item.data.experience} лет
                        </p>
                        <p>
                            💵 <strong>Стоимость:</strong> {item.data.cost?.toLocaleString()} ₽
                        </p>
                        <p>
                            🕒 <strong>График работы:</strong> {item.data.workSchedule}
                        </p>
                    </>
                )
            default:
                return <p>Нет дополнительных данных</p>
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center min-w-full mb-40'>
                <div className='size-full max-w-lg items-center justify-center overflow-hidden pt-8'>
                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <p className='text-[3.5rem] font-semibold'>
                            {item?.data.name}
                            <span className='text-[#5046e6]'>.</span>
                        </p>
                    </BoxReveal>

                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <h2 className='mt-[.5rem] text-[1rem]'>
                            {item?.data.description}{' '}
                            <span className='text-[#5046e6] font-semibold'>{item?.data.location}</span>
                        </h2>
                    </BoxReveal>

                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <div className='mt-6 space-y-2 text-lg'>{details()}</div>
                    </BoxReveal>

                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <Button className='mt-[1.6rem] bg-[#5046e6]' variant='default'>
                            Редактировать
                        </Button>
                    </BoxReveal>
                </div>
            </div>
        </>
    )
}

export { ListId }
