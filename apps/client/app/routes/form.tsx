import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { FormItem2 } from '~/features/form/ui'
import { formItemSchemaValidate } from '~/features/form/model/schema'

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = Object.fromEntries(await request.formData())

    const parsedData = {
        ...formData,
        image: Object(formData.image),
        area: Number(formData.area),
        rooms: Number(formData.rooms),
        price: Number(formData.price),
        year: Number(formData.year),
        mileage: formData.mileage ? Number(formData.mileage) : undefined,
        experience: Number(formData.experience),
        cost: Number(formData.cost),
    }

    const result = formItemSchemaValidate.safeParse(parsedData)

    if (!result.success) return json({ errors: result.error.flatten().fieldErrors }, { status: 400 })

    return json({ success: true, data: result.data })
}

export default function FormRoute() {
    return (
        <section className='flex flex-col justify-center items-center min-h-full max-w-[800px] mx-auto'>
            <FormItem2 />
        </section>
        // <div className='flex flex-col justify-center items-center'>
        //     <Form className='w-[300px]  gap-4' method='POST' onSubmit={handleSubmit(onSubmit)}>
        //         <Label htmlFor='name'>Название:</Label>
        //         <Input className='p-6' {...register('name')} />
        //         <FormItemErrorMessage errorMessage={errors.name?.message} />

        //         <Label htmlFor='description'>Описание:</Label>
        //         <Textarea {...register('description')} />
        //         <FormItemErrorMessage errorMessage={errors.description?.message} />

        //         <Label htmlFor='location'>Локация:</Label>
        //         <Input {...register('location')} />
        //         <FormItemErrorMessage errorMessage={errors.location?.message} />

        //         {/* <Label htmlFor='image'>Фото:</Label>
        //         <Input type='file' {...register('image')} />
        //         <FormItemErrorMessage errorMessage={errors.image?.message} /> */}
        //         <div className='mt-4'>

        //         <Select onValueChange={e => setCategory(e as ItemsType)}>
        //             <SelectTrigger >
        //                 <SelectValue placeholder='Выберите категорию' />
        //             </SelectTrigger>
        //             <SelectContent>
        //                 {Object.values(ItemsType).map(type => (
        //                     <SelectItem key={type} value={type}>
        //                         {type}
        //                     </SelectItem>
        //                 ))}
        //             </SelectContent>
        //         </Select>
        //         <FormItemErrorMessage errorMessage={errors.type?.message} />
        //        </div>
        //         {category &&
        //             Object.entries(categorySchemas[category].shape).map(([field, _]) => (
        //                 <div key={field}>
        //                     <Input
        //                         {...register(field as keyof TFormData)}
        //                         placeholder={cn({
        //                           'Площадь м2': field === 'area',
        //                         })}
        //                         className='border p-2 w-full rounded'
        //                     />
        //                     <FormItemErrorMessage errorMessage={errors[field as keyof TFormData]?.message as string} />
        //                 </div>
        //             ))}
        //         <div className='mt-6'>

        //         <InteractiveHoverButton type='submit' disabled={postItemMutation.isPending}>
        //             {postItemMutation.isPending ? 'Отправка...' : 'Отправить'}
        //         </InteractiveHoverButton>

        //         </div>
        //         {/* {actionData?.вф && <p>Ошибка при отправке</p>} */}
        //         {/* {actionData?.success && <p>Форма успешно отправлена!</p>} */}
        //     </Form>
        // </div>
    )
}

// export default function FormRoute() {
//     const actiodData = useActionData<typeof action>()

//     const [category, setCategory] = useState<ItemsType | ''>('')
//     const postItemMutation = usePostItems()

//     const {
//         register,
//         handleSubmit,
//         reset,
//         watch,
//         formState: { errors },
//     } = useForm<TFormData>({
//         resolver,
//     })

//     console.log(watch('name'))

//     useEffect(() => {
//         reset(prev => ({ ...prev, type: category }))
//     }, [category, reset])

//     // const onSubmit = (data: FormData) => {
//     //     console.log('Submitted data:', data)
//     //     // postItemMutation.mutate(data);
//     // }

//     const onSubmit: SubmitHandler<TFormData> = data => console.log(data)

//     return (
//         <>
//             <div className='flex items-center justify-center'>
//                 <ValidatedForm
//                     onSubmit={onSubmit}
//                     validator={createItemValidator}
//                     className='flex flex-col space-y-4 w-10/12 lg:w-1/2'
//                     method='POST'
//                 >
//                     <>
//                         <Label className='font-bold' htmlFor='name'>
//                             Название
//                         </Label>
//                         <Input {...register('name')} />
//                         <FormItemErrorMessage errorMessage={errors.name && errors.name.message} />
//                     </>
//                     <div className='w-full flex justify-center items-center'>
//                         <Button type='submit'>SUBMIT</Button>
//                     </div>
//                     {data && (
//         <Label>{}</Label>
//       )}
//                 </ValidatedForm>
//             </div>
//         </>

// <>
//     <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md mx-auto'>
//         <div>
//             <label>Название</label>
//             <input {...register('')} className='input' />
//             {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
//         </div>

//         <div>
//             <label>Описание</label>
//             <input {...register('description')} className='input' />
//             {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
//         </div>

//         <div>
//             <label>Локация</label>
//             <input {...register('location')} className='input' />
//             {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
//         </div>

//         <div>
//             <label>Категория</label>
//             <select {...register('type')} className='input'>
//                 <option value=''>Выберите категорию</option>
//                 {Object.values(ItemsType).map(type => (
//                     <option key={type} value={type}>
//                         {type}
//                     </option>
//                 ))}
//             </select>
//             {errors.type && <p className='text-red-500'>{errors.type.message}</p>}
//         </div>

//         {/* Динамические поля */}
//         {selectedType === ItemsType.Недвижимость && (
//             <>
//                 <div>
//                     <label>Тип недвижимости</label>
//                     <input {...register('propertyType')} className='input' />
//                     {errors.propertyType && <p className='text-red-500'>{errors.propertyType.message}</p>}
//                 </div>
//                 <div>
//                     <label>Площадь</label>
//                     <input type='number' {...register('area')} className='input' />
//                     {errors.area && <p className='text-red-500'>{errors.area.message}</p>}
//                 </div>
//                 <div>
//                     <label>Количество комнат</label>
//                     <input type='number' {...register('rooms')} className='input' />
//                     {errors.rooms && <p className='text-red-500'>{errors.rooms.message}</p>}
//                 </div>
//                 <div>
//                     <label>Цена</label>
//                     <input type='number' {...register('price')} className='input' />
//                     {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
//                 </div>
//             </>
//         )}

//         {selectedType === ItemsType.Авто && (
//             <>
//                 <div>
//                     <label>Марка</label>
//                     <input {...register('brand')} className='input' />
//                     {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}
//                 </div>
//                 <div>
//                     <label>Модель</label>
//                     <input {...register('model')} className='input' />
//                     {errors.model && <p className='text-red-500'>{errors.model.message}</p>}
//                 </div>
//                 <div>
//                     <label>Год</label>
//                     <input type='number' {...register('year')} className='input' />
//                     {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
//                 </div>
//                 <div>
//                     <label>Пробег (необязательно)</label>
//                     <input type='number' {...register('mileage')} className='input' />
//                 </div>
//             </>
//         )}

//         {selectedType === ItemsType.Услуги && (
//             <>
//                 <div>
//                     <label>Тип услуги</label>
//                     <input {...register('serviceType')} className='input' />
//                     {errors.serviceType && <p className='text-red-500'>{errors.serviceType.message}</p>}
//                 </div>
//                 <div>
//                     <label>Опыт</label>
//                     <input type='number' {...register('experience')} className='input' />
//                     {errors.experience && <p className='text-red-500'>{errors.experience.message}</p>}
//                 </div>
//                 <div>
//                     <label>Стоимость</label>
//                     <input type='number' {...register('cost')} className='input' />
//                     {errors.cost && <p className='text-red-500'>{errors.cost.message}</p>}
//                 </div>
//                 <div>
//                     <label>График работы (необязательно)</label>
//                     <input {...register('workSchedule')} className='input' />
//                 </div>
//             </>
//         )}

//         <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
//             Отправить
//         </button>
//     </form>
// </>
// )
// }

// export default function FormRoute() {
//     const {
//         register,
//         handleSubmit,
//         watch,
//         control,
//         reset,
//         formState: { errors },
//     } = useForm<FormData>({
//         resolver,
//         defaultValues: {
//             get: 'type',
//         },
//     })

//     const selectedType = watch('')

//     useEffect(() => {
//         reset(prev => ({ ...prev, type: selectedType }))
//     }, [selectedType, reset])

//     const onSubmit = (data: FormData) => {
//         console.log('Submitted data:', data)
//     }

//     return (
//         <>
//             <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 max-w-md mx-auto'>
//                 <div>
//                     <label>Название</label>
//                     <input {...register('name')} className='input' />
//                     {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
//                 </div>

//                 <div>
//                     <label>Описание</label>
//                     <input {...register('description')} className='input' />
//                     {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
//                 </div>

//                 <div>
//                     <label>Локация</label>
//                     <input {...register('location')} className='input' />
//                     {errors.location && <p className='text-red-500'>{errors.location.message}</p>}
//                 </div>

//                 <div>
//                     <label>Категория</label>
//                     <select {...register('type')} className='input'>
//                         <option value=''>Выберите категорию</option>
//                         {Object.values(ItemsType).map(type => (
//                             <option key={type} value={type}>
//                                 {type}
//                             </option>
//                         ))}
//                     </select>
//                     {errors.type && <p className='text-red-500'>{errors.type.message}</p>}
//                 </div>

//                 {/* Динамические поля */}
//                 {selectedType === ItemsType.Недвижимость && (
//                     <>
//                         <div>
//                             <label>Тип недвижимости</label>
//                             <input {...register('propertyType')} className='input' />
//                             {errors.propertyType && <p className='text-red-500'>{errors.propertyType.message}</p>}
//                         </div>
//                         <div>
//                             <label>Площадь</label>
//                             <input type='number' {...register('area')} className='input' />
//                             {errors.area && <p className='text-red-500'>{errors.area.message}</p>}
//                         </div>
//                         <div>
//                             <label>Количество комнат</label>
//                             <input type='number' {...register('rooms')} className='input' />
//                             {errors.rooms && <p className='text-red-500'>{errors.rooms.message}</p>}
//                         </div>
//                         <div>
//                             <label>Цена</label>
//                             <input type='number' {...register('price')} className='input' />
//                             {errors.price && <p className='text-red-500'>{errors.price.message}</p>}
//                         </div>
//                     </>
//                 )}

//                 {selectedType === ItemsType.Авто && (
//                     <>
//                         <div>
//                             <label>Марка</label>
//                             <input {...register('brand')} className='input' />
//                             {errors.brand && <p className='text-red-500'>{errors.brand.message}</p>}
//                         </div>
//                         <div>
//                             <label>Модель</label>
//                             <input {...register('model')} className='input' />
//                             {errors.model && <p className='text-red-500'>{errors.model.message}</p>}
//                         </div>
//                         <div>
//                             <label>Год</label>
//                             <input type='number' {...register('year')} className='input' />
//                             {errors.year && <p className='text-red-500'>{errors.year.message}</p>}
//                         </div>
//                         <div>
//                             <label>Пробег (необязательно)</label>
//                             <input type='number' {...register('mileage')} className='input' />
//                         </div>
//                     </>
//                 )}

//                 {selectedType === ItemsType.Услуги && (
//                     <>
//                         <div>
//                             <label>Тип услуги</label>
//                             <input {...register('serviceType')} className='input' />
//                             {errors.serviceType && <p className='text-red-500'>{errors.serviceType.message}</p>}
//                         </div>
//                         <div>
//                             <label>Опыт</label>
//                             <input type='number' {...register('experience')} className='input' />
//                             {errors.experience && <p className='text-red-500'>{errors.experience.message}</p>}
//                         </div>
//                         <div>
//                             <label>Стоимость</label>
//                             <input type='number' {...register('cost')} className='input' />
//                             {errors.cost && <p className='text-red-500'>{errors.cost.message}</p>}
//                         </div>
//                         <div>
//                             <label>График работы (необязательно)</label>
//                             <input {...register('workSchedule')} className='input' />
//                         </div>
//                     </>
//                 )}

//                 <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
//                     Отправить
//                 </button>
//             </form>
//         </>
//     )
// }

// export default function ItemForm() {
// const schema = baseSchema.merge(category ? categorySchemas[category] : z.object({}));
// const actionData = useActionData<typeof action>()
// const postItemMutation = usePostItems()

// const [category, setCategory] = useState<ItemsType | ''>('')

// const schema = useMemo(() => {
//     return baseSchema.merge(category ? categorySchemas[category] : z.object({}))
// }, [category])

// const {
//     register,
//     handleSubmit,
//     formState: { errors },
// } = useForm<TFormData>({ mode: 'onSubmit', resolver: zodResolver(schema) })

// const onSubmit = (data: TFormData) => {
//     postItemMutation.mutate(data)
// }

// @ts-ignore
// const onSubmit = (data: TFormData) => postItemMutation.mutate(data)

// return (
//     <div className='p-4 max-w-md mx-auto'>
//         <h2 className='text-xl font-bold mb-4'>Создать объявление</h2>
//         {actionData?.error && <p className='text-red-500'>{actionData.error}</p>}
//         <Form method='post' className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
//             <Input {...register('name')} placeholder='Название' />
//             <>
//                 <TextAnimate animation='blurIn' as='span'>
//                     {errors.name?.message}
//                 </TextAnimate>
//                 <Textarea {...register('description')} placeholder='Описание' />
//                 <TextAnimate animation='blurIn' as='span'>
//                     {errors.description?.message}
//                 </TextAnimate>
//                 <Input {...register('location')} placeholder='Локация' />
//                 <TextAnimate animation='blurIn' as='span'>
//                     {errors.location?.message}
//                 </TextAnimate>
//             </>
//             <Select onValueChange={e => setCategory(e as ItemsType)}>
//                 <SelectTrigger className='w-[180px]'>
//                     <SelectValue placeholder='Выберите категорию' />
//                 </SelectTrigger>
//                 <SelectContent>
//                     {Object.values(ItemsType).map(type => (
//                         <SelectItem key={type} value={type}>
//                             {type}
//                         </SelectItem>
//                     ))}
//                 </SelectContent>
//             </Select>

//             {errors.type && (
//                 <TextAnimate animation='blurIn' as='span'>
//                     {errors.type.message}
//                 </TextAnimate>
//             )}

//             {category &&
//                 Object.keys(categorySchemas[category].shape).map(field => (
//                     <div key={field}>
//                         <Input {...register(field)} placeholder={field} />
//                         {errors[field] && (
//                             <TextAnimate animation='blurIn' as='span'>
//                                 {errors[field]?.message as string}
//                             </TextAnimate>
//                         )}
//                     </div>
//                 ))}

//             <InteractiveHoverButton type='submit' disabled={postItemMutation.isPending}>
//                 {postItemMutation.isPending ? 'Отправка...' : 'Отправить'}
//             </InteractiveHoverButton>
//         </Form>
//     </div>
// )
//     return (
//         <div className='p-4 max-w-md mx-auto'>
//             <h2 className='text-xl font-bold mb-4'>Создать объявление</h2>
//             {actionData?.error && <p className='text-red-500'>{actionData.error}</p>}
//             <Form method='post' className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
//                 <input {...register('name')} placeholder='Название' className='border p-2 w-full rounded' />
//                 {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

//                 <textarea {...register('description')} placeholder='Описание' className='border p-2 w-full rounded' />
//                 {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

//                 <input {...register('location')} placeholder='Локация' className='border p-2 w-full rounded' />
//                 {errors.location && <p className='text-red-500'>{errors.location.message}</p>}

//                 <select
//                     {...register('type')}
//                     className='border p-2 w-full rounded'
//                     onChange={e => setCategory(e.target.value as ItemsType)}
//                 >
//                     <option value=''>Выберите категорию</option>
//                     {Object.values(ItemsType).map(type => (
//                         <option key={type} value={type}>
//                             {type}
//                         </option>
//                     ))}
//                 </select>
//                 {errors.type && <p className='text-red-500'>{errors.type.message}</p>}

//                 {category &&
//                     Object.keys(categorySchemas[category].shape).map(field => (
//                         <div key={field}>
//                             <input {...register(field)} placeholder={field} className='border p-2 w-full rounded' />
//                             {errors[field] && <p className='text-red-500'>{errors[field]?.message as string}</p>}
//                         </div>
//                     ))}

//                 <button
//                     type='submit'
//                     className='bg-blue-500 text-white px-4 py-2 rounded'
//                     disabled={postItemMutation.isPending}
//                 >
//                     {postItemMutation.isPending ? 'Отправка...' : 'Отправить'}
//                 </button>
//             </Form>
//         </div>
//     )
// }

// export async function action({ request }: ActionFunctionArgs) {
//     const formData = await request.formData()
//     const name = formData.get('name')
//     const description = formData.get('description')
//     const location = formData.get('location')
//     const image = formData.get('image')
//     const type = formData.get('type')

//     if (!name || !location || !type || !description) {
//         return { error: 'Все поля (название, локация, тип, описание) обязательны' }
//     }

//     const newItem = {
//         name,
//         description,
//         location,
//         image,
//         type,
//     }

//     const response = await fetch('http://localhost:3000/items', {
//         method: 'POST',
//         body: JSON.stringify(newItem),
//         headers: { 'Content-Type': 'application/json' },
//     })

//     if (!response.ok) {
//         return { error: 'Ошибка при отправке данных' }
//     }

//     return { success: 'Данные успешно отправлены!' }
// }

// export default function ItemForm() {
//     const actionData = useActionData<typeof action>()
//     const mutation = useMutation({
//         mutationFn: async (data: { title: string; description: string }) => {
//             return fetch('http://localhost:3000/items', {
//                 method: 'POST',
//                 body: JSON.stringify(data),
//                 headers: { 'Content-Type': 'application/json' },
//             }).then(res => res.json())
//         },
//     })

//     return (
//         <div className='p-4 max-w-md mx-auto'>
//             <h2 className='text-xl font-bold mb-4'>Создать элемент</h2>

//             {actionData?.error && <p className='text-red-500'>{actionData.error}</p>}
//             {actionData?.success && <p className='text-green-500'>{actionData.success}</p>}

//             <Form method='post' className='space-y-3'>
//                 <label className='block'>
//                     <span>Название:</span>
//                     <input type='text' name='name' className='border p-2 w-full rounded' required />
//                 </label>

//                 <label className='block'>
//                     <span>Локация:</span>
//                     <input type='text' name='location' className='border p-2 w-full rounded' required />
//                 </label>

//                 <label className='block'>
//                     <span>Тип:</span>
//                     <select name='type' className='border p-2 w-full rounded' required>
//                         <option value=''>Выберите категорию</option>
//                         <option value='Недвижимость'>Недвижимость</option>
//                         <option value='Авто'>Авто</option>
//                         <option value='Услуги'>Услуги</option>
//                     </select>
//                 </label>

//                 <label className='block'>
//                     <span>Описание:</span>
//                     <textarea name='description' className='border p-2 w-full rounded' required />
//                 </label>

//                 <label className='block'>
//                     <span>Изображение (необязательно):</span>
//                     <input type='text' name='image' className='border p-2 w-full rounded' />
//                 </label>

//                 <button
//                     type='submit'
//                     className='bg-blue-500 text-white px-4 py-2 rounded'
//                     disabled={mutation.isPending}
//                 >
//                     {mutation.isPending ? 'Отправка...' : 'Отправить'}
//                 </button>
//             </Form>
//         </div>
//     )
//   }

//   import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Form, useActionData } from '@remix-run/react';
// import type { ActionFunction } from '@remix-run/node';
// import { json, redirect } from '@remix-run/node';

// const categories = ['Недвижимость', 'Авто', 'Услуги'] as const;

// const baseSchema = z.object({
//     name: z.string().min(1, 'Название обязательно'),
//     description: z.string().min(1, 'Описание обязательно'),
//     location: z.string().min(1, 'Локация обязательна'),
//     image: z.string().optional(),
//     type: z.enum(categories, { errorMap: () => ({ message: 'Выберите категорию' }) }),
// });

// type BaseFormValues = z.infer<typeof baseSchema>;

// type CategoryFields = {
//     Недвижимость: {
//         propertyType: string;
//         area: number;
//         rooms: number;
//         price: number;
//     };
//     Авто: {
//         brand: string;
//         model: string;
//         year: number;
//         mileage?: number;
//     };
//     Услуги: {
//         serviceType: string;
//         experience: number;
//         cost: number;
//         workSchedule?: string;
//     };
// };

// const categorySchemas: Record<string, z.ZodObject<any>> = {
//     Недвижимость: z.object({
//         propertyType: z.string().min(1, 'Тип недвижимости обязателен'),
//         area: z.number().min(1, 'Укажите площадь'),
//         rooms: z.number().min(1, 'Укажите количество комнат'),
//         price: z.number().min(1, 'Укажите цену'),
//     }),
//     Авто: z.object({
//         brand: z.string().min(1, 'Марка обязательна'),
//         model: z.string().min(1, 'Модель обязательна'),
//         year: z.number().min(1886, 'Укажите корректный год'),
//         mileage: z.number().optional(),
//     }),
//     Услуги: z.object({
//         serviceType: z.string().min(1, 'Тип услуги обязателен'),
//         experience: z.number().min(1, 'Опыт обязателен'),
//         cost: z.number().min(1, 'Стоимость обязательна'),
//         workSchedule: z.string().optional(),
//     }),
// };

// export const action: ActionFunction = async ({ request }) => {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);

//     try {
//         const baseValidated = baseSchema.parse(data);
//         const categorySchema = categorySchemas[baseValidated.type];
//         const categoryValidated = categorySchema?.parse(data);

//         const newItem = { ...baseValidated, ...categoryValidated };

//         const response = await fetch('http://localhost:3000/items', {
//             method: 'POST',
//             body: JSON.stringify(newItem),
//             headers: { 'Content-Type': 'application/json' },
//         });

//         if (!response.ok) {
//             return json({ error: 'Ошибка при отправке данных' }, { status: 400 });
//         }

//         return redirect('/');
//     } catch (error) {
//         return json({ error: 'Некорректные данные' }, { status: 400 });
//     }
// };

// export default function ItemForm() {
//     const actionData = useActionData<typeof action>();
//     const [category, setCategory] = useState<string>('');
//     const categorySchema = categorySchemas[category] || z.object({});
//     const schema = baseSchema.merge(categorySchema);

//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: zodResolver(schema),
//     });

//     return (
//         <div className='p-4 max-w-md mx-auto'>
//             <h2 className='text-xl font-bold mb-4'>Создать объявление</h2>

//             {actionData?.error && <p className='text-red-500'>{actionData.error}</p>}

//             <Form method='post' className='space-y-3' onSubmit={handleSubmit(() => {})}>
//                 <input {...register('name')} placeholder='Название' className='border p-2 w-full rounded' />
//                 {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

//                 <textarea {...register('description')} placeholder='Описание' className='border p-2 w-full rounded' />
//                 {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

//                 <input {...register('location')} placeholder='Локация' className='border p-2 w-full rounded' />
//                 {errors.location && <p className='text-red-500'>{errors.location.message}</p>}

//                 <select {...register('type')} className='border p-2 w-full rounded' onChange={(e) => setCategory(e.target.value)}>
//                     <option value=''>Выберите категорию</option>
//                     {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//                 </select>
//                 {errors.type && <p className='text-red-500'>{errors.type.message}</p>}

//                 {category && Object.keys(categorySchemas[category].shape).map(field => (
//                     <div key={field}>
//                         <input {...register(field)} placeholder={field} className='border p-2 w-full rounded' />
//                         {errors[field] && <p className='text-red-500'>{errors[field]?.message as string}</p>}
//                     </div>
//                 ))}

//                 <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>Отправить</button>
//             </Form>
//         </div>
//     );
// }
