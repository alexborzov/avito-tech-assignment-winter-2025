import { getItemsId, getGetItemsIdQueryKey } from '~/shared/api'
import { useLoaderData } from '@remix-run/react'
import { HydrationBoundary } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { ListId } from '~/components/list/ui'
import type { LoaderFunctionArgs } from '@remix-run/node'

interface ILoader extends LoaderFunctionArgs {
    params: {
        itemId: string
    }
}

export async function loader({ params }: ILoader) {
    const queryClient = new QueryClient()

    const queryKey = getGetItemsIdQueryKey(params.itemId!)

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
            <ListId params={params} />
        </HydrationBoundary>
    )
}

export default ItemId
