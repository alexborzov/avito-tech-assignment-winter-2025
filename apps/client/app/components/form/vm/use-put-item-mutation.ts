import { useNavigate } from '@remix-run/react'
import { useQueryClient } from '@tanstack/react-query'
import { usePutItemsId } from '~/shared/api'
import { type PutItemsIdBody, getGetItemsQueryKey } from '~/shared/api'

const usePutItemMutation = () => {
    const queryClient = useQueryClient()
    const queryKey = getGetItemsQueryKey()
    const navigate = useNavigate()

    const { mutate, isPending, error } = usePutItemsId({
        mutation: {
            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({ queryKey })
                queryClient.refetchQueries({ queryKey, type: 'active' })
                navigate(`/item/${variables.id}`)
            },
        },
    })

    const updateItem = ({ id, data }: { id: string; data: PutItemsIdBody }) => {
        mutate({
            id,
            data,
        })
    }

    return {
        updateItem,
        isPending,
        error,
    }
}

export { usePutItemMutation }
