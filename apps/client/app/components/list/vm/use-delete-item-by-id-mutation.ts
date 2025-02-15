import { useNavigate } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { getGetItemsQueryKey, useDeleteItemsId } from '~/shared/api'

const useDeleteItemByIdMutation = () => {
    const queryClient = useQueryClient()
    const queryKey = getGetItemsQueryKey()
    const navigate = useNavigate()

    const { mutate, isPending, error } = useDeleteItemsId({
        mutation: {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey })
                navigate('/list')
            },
        },
    })

    const deleteItem = ({ id }: { id: string }) => {
        mutate({
            id,
        })
    }

    return {
        deleteItem,
        isPending,
        error,
    }
}

export { useDeleteItemByIdMutation }
