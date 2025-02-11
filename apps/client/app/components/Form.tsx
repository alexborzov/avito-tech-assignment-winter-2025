import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Select } from '~/shared/ui'
import { Form } from '@remix-run/react'
import type { FC } from 'react'
import { Link } from '@remix-run/react'

// const categories = ['Недвижимость', 'Авто', 'Услуги']
// const realEstateTypes = ['Квартира', 'Дом', 'Коттедж']
// const carBrands = ['Toyota', 'BMW', 'Mercedes']
// const serviceTypes = ['Ремонт', 'Уборка', 'Доставка']

// const AdForm: FC<IAdFormProps> = ({ defaultValues }) => {
//     const [step, setStep] = useState(1)
//     const {
//         register,
//         control,
//         handleSubmit,
//         watch,
//         formState: { errors },
//     } = useForm({
//         resolver: zodResolver(schema),
//         defaultValues,
//     })

//     const category = watch('category')

//     const onSubmit = (data: any) => {
//         console.log('Отправка данных:', data)
//     }

//     return (
//         <Form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
//             {step === 1 && (
//                 <>
//                     <Input label='Название' {...register('name')} error={errors.name?.message} />
//                     <Input label='Описание' {...register('description')} error={errors.description?.message} />
//                     <Input label='Локация' {...register('location')} error={errors.location?.message} />
//                     <Input label='Фото (URL)' {...register('photo')} error={errors.photo?.message} />
//                     <Controller
//                         control={control}
//                         name='category'
//                         render={({ field }) => <Select label='Категория' options={categories} {...field} />}
//                     />
//                     <Button onClick={() => setStep(2)}>Далее</Button>
//                 </>
//             )}

//             {step === 2 && category === 'Недвижимость' && (
//                 <>
//                     <Controller
//                         control={control}
//                         name='realEstate.propertyType'
//                         render={({ field }) => <Select label='Тип недвижимости' options={realEstateTypes} {...field} />}
//                     />
//                     <Input label='Площадь (м²)' type='number' {...register('realEstate.area')} />
//                     <Input label='Количество комнат' type='number' {...register('realEstate.rooms')} />
//                     <Input label='Цена (₽)' type='number' {...register('realEstate.price')} />
//                 </>
//             )}

//             {step === 2 && category === 'Авто' && (
//                 <>
//                     <Controller
//                         control={control}
//                         name='car.brand'
//                         render={({ field }) => <Select label='Марка' options={carBrands} {...field} />}
//                     />
//                     <Input label='Модель' {...register('car.model')} />
//                     <Input label='Год выпуска' type='number' {...register('car.year')} />
//                     <Input label='Пробег (км)' type='number' {...register('car.mileage')} />
//                 </>
//             )}

//             {step === 2 && category === 'Услуги' && (
//                 <>
//                     <Controller
//                         control={control}
//                         name='service.serviceType'
//                         render={({ field }) => <Select label='Тип услуги' options={serviceTypes} {...field} />}
//                     />
//                     <Input label='Опыт работы (лет)' type='number' {...register('service.experience')} />
//                     <Input label='Стоимость (₽)' type='number' {...register('service.cost')} />
//                     <Input label='График работы' {...register('service.workSchedule')} />
//                 </>
//             )}

//             {step === 2 && (
//                 <>
//                     <Button type='button' onClick={() => setStep(1)}>
//                         Назад
//                     </Button>
//                     <Button type='submit'>Сохранить</Button>
//                 </>
//             )}
//         </Form>
//     )
// }

// export { AdForm }

import type { ReactNode } from 'react'

interface IFormProps {
    children?: ReactNode
    params: {
        id: string
    }
}

const Form: FC<IFormProps> = () => {
    return (
        <main className='p-4 max-w-md mx-auto'>
            <h2 className='text-xl font-bold mb-4'>Создать объявление</h2>
            {actionData?.error && <p className='text-red-500'>{actionData.error}</p>}
            <Form method='post' className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
                <Input {...register('name')} placeholder='Название' />
                <TextAnimate animation='blurIn' as='span'>
                    {errors.name?.message}
                </TextAnimate>
                <Textarea {...register('description')} placeholder='Описание' />
                <TextAnimate animation='blurIn' as='span'>
                    {errors.description?.message}
                </TextAnimate>
                <Input {...register('location')} placeholder='Локация' />
                <TextAnimate animation='blurIn' as='span'>
                    {errors.location?.message}
                </TextAnimate>

                <Select onValueChange={e => setCategory(e as ItemsType)}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Выберите категорию' />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(ItemsType).map(type => (
                            <SelectItem key={type} value={type}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {errors.type && (
                    <TextAnimate animation='blurIn' as='span'>
                        {errors.type.message}
                    </TextAnimate>
                )}

                {category &&
                    Object.keys(categorySchemas[category].shape).map(field => (
                        <div key={field}>
                            <Input {...register(field)} placeholder={field} className='border p-2 w-full rounded' />
                            {errors[field] && (
                                <TextAnimate animation='blurIn' as='span'>
                                    {errors[field]?.message as string}
                                </TextAnimate>
                            )}
                        </div>
                    ))}

                <InteractiveHoverButton type='submit' disabled={postItemMutation.isPending}>
                    {postItemMutation.isPending ? 'Отправка...' : 'Отправить'}
                </InteractiveHoverButton>
            </Form>
        </main>
    )
}

export default Form
