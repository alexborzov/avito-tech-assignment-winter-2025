import { useGetItemsId } from '~/shared/api'

interface IUseGetItemById {
    itemId?: string | undefined
}

const useGetItemById = ({ itemId }: IUseGetItemById) => {
    const {
        data: item,
        isLoading,
        error,
    } = useGetItemsId(itemId ?? '', {
        query: {
            enabled: !!itemId,
        },
    })

    return {
        item: item?.data,
        isLoading,
        error,
    }
}
export { useGetItemById }
