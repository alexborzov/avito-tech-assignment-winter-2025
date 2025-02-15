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
