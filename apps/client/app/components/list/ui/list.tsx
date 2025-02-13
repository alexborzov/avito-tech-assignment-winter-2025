import { Notification } from './notification'
import { useList } from '../vm/useList'
import { AnimatedList, TextAnimate } from '~/shared/ui'

const List = () => {
    const { items, isLoading, error } = useList()

    if (isLoading) return <div>Loading...</div>

    if (error instanceof Error) return <div>Error: {error.message}</div>

    return (
        <div className='flex flex-col justify-center items-center min-w-full'>
            <TextAnimate className='font-bold text-3xl my-4' animation='blurIn' as='h1'>
                Список Объявлений
            </TextAnimate>
            <div className='relative flex h-[500px] w-full flex-col justify-start overflow-hidden p-2'>
                <AnimatedList delay={500}>
                    {items?.map((item, idx) => (
                        <Notification to={`/item/${item.id}`} color='#00C9A7' {...item} key={idx} />
                    ))}
                </AnimatedList>
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background'></div>
            </div>
        </div>
    )
}

export { List }
