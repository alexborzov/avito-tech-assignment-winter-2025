import { useQuery } from '@tanstack/react-query'
import { Link } from '@remix-run/react'
import { getItemsId, getGetItemsIdQueryKey, type Items, useGetItemsId } from '~/shared/api'
import { AnimatedList, TextAnimate, Button } from '~/shared/ui'
import { cn } from '~/lib/utils'
import type { FC } from 'react'

interface IListIdProps {
    params: {
      itemId: string
    }
}

const ListId: FC<IListIdProps> = ({ params: { itemId } }) => {
    const { data: item, error, isLoading } = useGetItemsId(itemId)

    if (isLoading) return <div>Loading...</div>
    if (error instanceof Error) return <div>Error: {error.message}</div>

    return (
        <div className='flex flex-col justify-center items-center min-w-full'>
            <TextAnimate className='font-bold text-3xl my-4' animation='blurIn' as='h1'>
                Страница объявления
            </TextAnimate>
            <div>
              {item?.data.id}
            </div>
        </div>
    )
}

export { ListId }
