import { useLoaderData } from '@remix-run/react'
import { HydrationBoundary } from '@tanstack/react-query'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { getGetItemsQueryKey, getItems } from '~/shared/api'
import { List } from '~/components/list/ui'

export async function loader() {
    const queryKey = getGetItemsQueryKey()

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey,
        queryFn: getItems,
    })

    return { dehydratedState: dehydrate(queryClient) }
}

const ListRoute = () => {
    const { dehydratedState } = useLoaderData<typeof loader>()

    return (
        <HydrationBoundary state={dehydratedState}>
            <List />
        </HydrationBoundary>
    )
}

export default ListRoute
