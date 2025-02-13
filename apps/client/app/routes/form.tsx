import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form } from '~/components/form/ui'
import { FormSchema } from '~/components/form/model'

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

    const result = FormSchema.safeParse(parsedData)

    if (!result.success) return json({ errors: result.error.flatten().fieldErrors }, { status: 400 })

    return json({ success: true, data: result.data })
}

export default function FormRoute() {
    return (
        <section className='flex flex-col justify-center items-center min-h-full max-w-[800px] mx-auto'>
            <Form />
        </section>
    )
}
