import { getItemsId, getGetItemsIdQueryKey } from '~/shared/api'
import { useLoaderData } from '@remix-run/react'
import { HydrationBoundary } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ListId } from '~/components/ListId'
import type { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ params }: LoaderFunctionArgs['params'] & { params: { itemId: string } }) {
    const queryKey = getGetItemsIdQueryKey(params.itemId!)
    const queryClient = new QueryClient()
    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => getItemsId(params.itemId!),
    })
    return { dehydratedState: dehydrate(queryClient), params }
}

const ItemId = () => {
    const { dehydratedState, params } = useLoaderData<typeof loader>()
    return (
        <HydrationBoundary state={dehydratedState}>
            <ListId params={params}/>
        </HydrationBoundary>
    )
}

export default ItemId
