import { useGetItemsId } from '~/shared/api'
import type { IListIdProps } from '../model'

const useListById = ({ itemId }: IListIdProps) => {
    const { data: item, error, isLoading } = useGetItemsId(itemId)
    return {
        item: item?.data,
        error,
        isLoading,
    }
}

export { useListById }
