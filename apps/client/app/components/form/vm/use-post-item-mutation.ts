import { useNavigate } from '@remix-run/react'
import { QueryClient } from '@tanstack/react-query'
import { getGetItemsQueryKey, usePostItems } from '~/shared/api'

const usePostItemMutation = () => {
    const queryClient = new QueryClient()
    const navigate = useNavigate()
    const queryKey = getGetItemsQueryKey()
    const { mutate, isPending, error } = usePostItems({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey })
                // use dehydratedState
                navigate('/list', { replace: true })
            },
        },
    })

    return {
        mutate,
        isPending,
        error,
    }
}
export { usePostItemMutation }
