// import type { ActionFunctionArgs } from '@remix-run/node'
// import { json } from '@remix-run/node'
// import { FormSchema } from '~/components/form/model'
// import { Form } from '~/components/form/ui'

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const formData = Object.fromEntries(await request.formData())

//     const parsedData = {
//         ...formData,
//         image: Object(formData.image),
//         area: Number(formData.area),
//         rooms: Number(formData.rooms),
//         price: Number(formData.price),
//         year: Number(formData.year),
//         mileage: formData.mileage ? Number(formData.mileage) : undefined,
//         experience: Number(formData.experience),
//         cost: Number(formData.cost),
//     }

//     const result = FormSchema.safeParse(parsedData)

//     if (!result.success) return json({ errors: result.error.flatten().fieldErrors }, { status: 400 })

//     return json({ success: true, data: result.data })
// }

// export default function FormRoute() {
//     return <Form />
// }

import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Form } from '~/components/form/ui'
import { getGetItemsIdQueryKey, getItemsId } from '~/shared/api'

interface ILoader extends LoaderFunctionArgs {
    params: {
        itemId: string
    }
}

export const loader = async ({ params: { itemId } }: ILoader) => {
    const queryClient = new QueryClient()

    const queryKey = getGetItemsIdQueryKey(itemId)

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => getItemsId(itemId),
    })

    return { dehydratedState: dehydrate(queryClient), itemId }
}

export default function FormRoute() {
    const { dehydratedState, itemId } = useLoaderData<typeof loader>()
    return (
        <HydrationBoundary state={dehydratedState}>
            <Form itemId={itemId} />
        </HydrationBoundary>
    )
}
