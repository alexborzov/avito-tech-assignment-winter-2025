import { useGetItems } from '~/shared/api'

const useList = () => {
    const { data: items, error, isLoading } = useGetItems()
    return {
        items: items?.data,
        error,
        isLoading,
    }
}

export { useList }
