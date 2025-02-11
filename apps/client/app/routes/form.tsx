import type { ActionFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()
    const name = formData.get('name')
    const description = formData.get('description')
    const location = formData.get('location')
    const image = formData.get('image')
    const type = formData.get('type')

    if (!name || !location || !type || !description) {
        return { error: 'Все поля (название, локация, тип, описание) обязательны' }
    }

    const newItem = {
        name,
        description,
        location,
        image,
        type,
    }

    const response = await fetch('http://localhost:3000/items', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
        return { error: 'Ошибка при отправке данных' }
    }

    return { success: 'Данные успешно отправлены!' }
}

export default function ItemForm() {
    const actionData = useActionData<typeof action>()
    const mutation = useMutation({
        mutationFn: async (data: { title: string; description: string }) => {
            return fetch('http://localhost:3000/items', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }).then(res => res.json())
        },
    })

    return (
        <div className='p-4 max-w-md mx-auto'>
            <h2 className='text-xl font-bold mb-4'>Создать элемент</h2>

            {actionData?.error && <p className='text-red-500'>{actionData.error}</p>}
            {actionData?.success && <p className='text-green-500'>{actionData.success}</p>}

            <Form method='post' className='space-y-3'>
                <label className='block'>
                    <span>Название:</span>
                    <input type='text' name='name' className='border p-2 w-full rounded' required />
                </label>

                <label className='block'>
                    <span>Локация:</span>
                    <input type='text' name='location' className='border p-2 w-full rounded' required />
                </label>

                <label className='block'>
                    <span>Тип:</span>
                    <select name='type' className='border p-2 w-full rounded' required>
                        <option value=''>Выберите категорию</option>
                        <option value='Недвижимость'>Недвижимость</option>
                        <option value='Авто'>Авто</option>
                        <option value='Услуги'>Услуги</option>
                    </select>
                </label>

                <label className='block'>
                    <span>Описание:</span>
                    <textarea name='description' className='border p-2 w-full rounded' required />
                </label>

                <label className='block'>
                    <span>Изображение (необязательно):</span>
                    <input type='text' name='image' className='border p-2 w-full rounded' />
                </label>

                <button
                    type='submit'
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? 'Отправка...' : 'Отправить'}
                </button>
            </Form>
        </div>
        // <div className="max-w-4xl mx-auto p-6">
        //   <h2 className="text-2xl font-bold">Create Item</h2>

        //   {actionData?.error && <div className="text-red-500">{actionData.error}</div>}

        //   <Form method="post">
        //     <div>
        //       <label htmlFor="name" className="block">Name</label>
        //       <input id="name" name="name" type="text" required className="block w-full p-2 mt-1" />
        //     </div>

        //     <div>
        //       <label htmlFor="description" className="block">Description</label>
        //       <textarea id="description" name="description" required className="block w-full p-2 mt-1" />
        //     </div>

        //     <div>
        //       <label htmlFor="location" className="block">Location</label>
        //       <input id="location" name="location" type="text" required className="block w-full p-2 mt-1" />
        //     </div>

        //     <div>
        //       <label htmlFor="photo" className="block">Photo</label>
        //       <input id="photo" name="photo" type="file" className="block w-full p-2 mt-1" />
        //     </div>

        //     <div>
        //       <label htmlFor="category" className="block">Category</label>
        //       <select
        //         id="category"
        //         name="category"
        //         onChange={(e) => setCategory(e.target.value)}
        //         required
        //         className="block w-full p-2 mt-1"
        //       >
        //         <option value="REAL_ESTATE">Real Estate</option>
        //         <option value="AUTO">Auto</option>
        //         <option value="SERVICES">Services</option>
        //       </select>
        //     </div>

        //     {category === 'REAL_ESTATE' && (
        //       <div>
        //         <label htmlFor="propertyType" className="block">Property Type</label>
        //         <input id="propertyType" name="propertyType" type="text" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'REAL_ESTATE' && (
        //       <div>
        //         <label htmlFor="area" className="block">Area (m²)</label>
        //         <input id="area" name="area" type="number" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'REAL_ESTATE' && (
        //       <div>
        //         <label htmlFor="rooms" className="block">Rooms</label>
        //         <input id="rooms" name="rooms" type="number" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'REAL_ESTATE' && (
        //       <div>
        //         <label htmlFor="price" className="block">Price</label>
        //         <input id="price" name="price" type="number" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'AUTO' && (
        //       <div>
        //         <label htmlFor="brand" className="block">Brand</label>
        //         <input id="brand" name="brand" type="text" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'AUTO' && (
        //       <div>
        //         <label htmlFor="model" className="block">Model</label>
        //         <input id="model" name="model" type="text" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'AUTO' && (
        //       <div>
        //         <label htmlFor="year" className="block">Year</label>
        //         <input id="year" name="year" type="number" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'AUTO' && (
        //       <div>
        //         <label htmlFor="mileage" className="block">Mileage (km)</label>
        //         <input id="mileage" name="mileage" type="number" className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'SERVICES' && (
        //       <div>
        //         <label htmlFor="serviceType" className="block">Service Type</label>
        //         <input id="serviceType" name="serviceType" type="text" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'SERVICES' && (
        //       <div>
        //         <label htmlFor="experience" className="block">Experience (years)</label>
        //         <input id="experience" name="experience" type="number" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'SERVICES' && (
        //       <div>
        //         <label htmlFor="cost" className="block">Cost</label>
        //         <input id="cost" name="cost" type="number" required className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     {category === 'SERVICES' && (
        //       <div>
        //         <label htmlFor="workSchedule" className="block">Work Schedule</label>
        //         <input id="workSchedule" name="workSchedule" type="text" className="block w-full p-2 mt-1" />
        //       </div>
        //     )}

        //     <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4">Submit</button>
        //   </Form>
        // </div>
    )
}
