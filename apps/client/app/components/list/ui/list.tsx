import { Link } from '@remix-run/react'
import { AnimatedList, Button, Loading, TextAnimate } from '~/shared/ui'
import { useList } from '../vm/useList'
import { Notification } from './notification'

const List = () => {
    const { items, isLoading, error } = useList()

    if (isLoading) return <Loading />

    if (error instanceof Error) return <div>Error: {error.message}</div>

    return (
        <div className='flex flex-col justify-center items-center min-w-full'>
            <TextAnimate className='font-bold text-3xl my-4' animation='blurIn' as='h1'>
                Список Объявлений
            </TextAnimate>
            <div className='space-y-4 flex flex-col justify-center items-center w-full max-w-[800px]'>
                <div className='flex justify-end w-full'>
                    <Button className='p-6 w-fit'>
                        <Link to='/form'>Разместить объявление</Link>
                    </Button>
                </div>
            </div>
            <div className='relative flex h-[500px] w-full flex-col justify-start overflow-hidden p-2'>
                {items?.length ? (
                    <AnimatedList delay={500}>
                        {items.map((item, idx) => (
                            <Notification to={`/item/${item.id}`} color='#00C9A7' {...item} key={item.id} />
                        ))}
                    </AnimatedList>
                ) : (
                    <div className='text-center text-gray-500 text-lg'>Объявлений нет</div>
                )}
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background' />
            </div>
        </div>
    )
}

export { List }
