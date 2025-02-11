import type { ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { json, redirect } from '@remix-run/node'
import { ItemsType, usePostItems } from '~/shared/api'
import { useMemo, useEffect } from 'react'
import {
    TextAnimate,
    Select,
    Textarea,
    Input,
    InteractiveHoverButton,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '~/shared/ui'
import axios from 'axios'

const baseSchema = z.object({
    name: z.string().min(1, 'Название обязательно'),
    description: z.string().min(1, 'Описание обязательно'),
    location: z.string().min(1, 'Локация обязательна'),
    image: z.string().optional(),
    type: z.nativeEnum(ItemsType, { errorMap: () => ({ message: 'Выберите категорию' }) }),
})

const categorySchemas = {
    [ItemsType.Недвижимость]: z.object({
        propertyType: z.string().min(1, 'Тип недвижимости обязателен'),
        area: z.number().min(1, 'Укажите площадь'),
        rooms: z.number().min(1, 'Укажите количество комнат'),
        price: z.number().min(1, 'Укажите цену'),
    }),
    [ItemsType.Авто]: z.object({
        brand: z.string().min(1, 'Марка обязательна'),
        model: z.string().min(1, 'Модель обязательна'),
        year: z.number().min(1886, 'Укажите корректный год'),
        mileage: z.number().optional(),
    }),
    [ItemsType.Услуги]: z.object({
        serviceType: z.string().min(1, 'Тип услуги обязателен'),
        experience: z.number().min(1, 'Опыт обязателен'),
        cost: z.number().min(1, 'Стоимость обязательна'),
        workSchedule: z.string().optional(),
    }),
}

type TFormData = z.infer<typeof baseSchema> &
    (
        | z.infer<(typeof categorySchemas)['Недвижимость']>
        | z.infer<(typeof categorySchemas)['Авто']>
        | z.infer<(typeof categorySchemas)['Услуги']>
    )

const resolver = zodResolver(
    baseSchema.merge(
        z.union([
            categorySchemas[ItemsType.Недвижимость] || z.object({}),
            categorySchemas[ItemsType.Авто] || z.object({}),
            categorySchemas[ItemsType.Услуги] || z.object({}),
        ]) as any,
    ),
)

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const rawData = Object.fromEntries(formData)

    try {
        const baseValidated = baseSchema.safeParse(rawData)
        if (!baseValidated.success) {
            return json({ errors: baseValidated.error.flatten().fieldErrors }, { status: 400 })
        }

        const categorySchema = categorySchemas[baseValidated.data.type] || z.object({})
        const categoryValidated = categorySchema.safeParse(rawData)

        if (!categoryValidated.success) {
            return json({ errors: categoryValidated.error.flatten().fieldErrors }, { status: 400 })
        }

        const newItem = { ...baseValidated.data, ...categoryValidated.data, id: crypto.randomUUID() }

        const response = await axios.post('http://localhost:3000/items', newItem)

        if (response.status !== 200) return json({ error: 'Ошибка при отправке данных' }, { status: 400 })

        return redirect('/')
    } catch (error) {
        return json({ error: 'Некорректные данные' }, { status: 400 })
    }
}

export default function ItemForm() {
  // const schema = baseSchema.merge(category ? categorySchemas[category] : z.object({}));
  const postItemMutation = usePostItems();

    const actionData = useActionData<typeof action>()

    const [category, setCategory] = useState<ItemsType | ''>('')

    const schema = useMemo(() => {
      return baseSchema.merge(category ? categorySchemas[category] : z.object({}))
  }, [category])

    const [resolver, setResolver] = useState(() => zodResolver(schema))


    useEffect(() => {
        setResolver(() => zodResolver(baseSchema.merge(category ? categorySchemas[category] : z.object({}))));
    }, [category]);



    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TFormData>({
        mode: 'onSubmit',
        resolver,
    })

    // useEffect(() => reset(), [category])

    // @ts-ignore
    const onSubmit = (data: TFormData) => postItemMutation.mutate(data)

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
    return (
      <div className='p-4 max-w-md mx-auto'>
          <h2 className='text-xl font-bold mb-4'>Создать объявление</h2>
          {actionData?.error && <p className='text-red-500'>{actionData.error}</p>}
          <Form method='post' className='space-y-3' onSubmit={handleSubmit(onSubmit)}>
              <input {...register('name')} placeholder='Название' className='border p-2 w-full rounded' />
              {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

              <textarea {...register('description')} placeholder='Описание' className='border p-2 w-full rounded' />
              {errors.description && <p className='text-red-500'>{errors.description.message}</p>}

              <input {...register('location')} placeholder='Локация' className='border p-2 w-full rounded' />
              {errors.location && <p className='text-red-500'>{errors.location.message}</p>}

              <select {...register('type')} className='border p-2 w-full rounded' onChange={e => setCategory(e.target.value as ItemsType)}>
                  <option value=''>Выберите категорию</option>
                  {Object.values(ItemsType).map(type => (
                      <option key={type} value={type}>{type}</option>
                  ))}
              </select>
              {errors.type && <p className='text-red-500'>{errors.type.message}</p>}

              {category && Object.keys(categorySchemas[category].shape).map(field => (
                  <div key={field}>
                      <input {...register(field)} placeholder={field} className='border p-2 w-full rounded' />
                      {errors[field] && <p className='text-red-500'>{errors[field]?.message as string}</p>}
                  </div>
              ))}

              <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded' disabled={postItemMutation.isPending}>
                  {postItemMutation.isPending ? 'Отправка...' : 'Отправить'}
              </button>
          </Form>
      </div>
  );
}

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
