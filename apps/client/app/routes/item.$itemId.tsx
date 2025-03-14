import type { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { HydrationBoundary } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ListId } from '~/components/list/ui'
import { getGetItemsIdQueryKey, getItemsId } from '~/shared/api'

interface ILoader extends LoaderFunctionArgs {
    params: {
        itemId: string
    }
}

export async function loader({ params: { itemId } }: ILoader) {
    const queryClient = new QueryClient()

    const queryKey = getGetItemsIdQueryKey(itemId)

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: () => getItemsId(itemId),
    })

    return { dehydratedState: dehydrate(queryClient), params: { itemId } }
}

const ItemId = () => {
    const {
        dehydratedState,
        params: { itemId },
    } = useLoaderData<typeof loader>()
    return (
        <HydrationBoundary state={dehydratedState}>
            <ListId itemId={itemId} />
        </HydrationBoundary>
    )
}

export default ItemId
