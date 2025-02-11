import { useQuery } from '@tanstack/react-query'
import { Link } from '@remix-run/react'
import { type Items, useGetItems } from '~/shared/api'
import { AnimatedList, TextAnimate, Button } from '~/shared/ui'
import { cn } from '~/lib/utils'

const Notification = ({ name, description, image, color, workSchedule, to }: Items & { color: string; to: string }) => {
    return (
        <figure
            className={cn(
                'relative mx-auto min-h-fit w-full max-w-[800px] cursor-pointer overflow-hidden rounded-2xl p-4',
                // animation styles
                'transition-all duration-200 ease-in-out hover:scale-[103%]',
                // light styles
                'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
                // dark styles
                'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
            )}
        >
            <div className='flex flex-row items-center gap-4'>
                <div
                    className='flex size-10 items-center justify-center rounded-2xl'
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className='text-lg'>{image}</span>
                </div>
                <div className='flex flex-col overflow-hidden'>
                    <figcaption className='flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white '>
                        <span className='text-sm sm:text-lg'>{name}</span>
                        <span className='mx-1'>·</span>
                        <span className='text-xs text-gray-500'>{workSchedule}</span>
                    </figcaption>
                    <p className='text-sm font-normal dark:text-white/60'>{description}</p>
                </div>
                <Button className='ml-auto' variant='default'>
                    <Link to={to}>Открыть</Link>
                </Button>
            </div>
        </figure>
    )
}

const List = () => {
    const { data: items, error, isLoading } = useGetItems()

    if (isLoading) return <div>Loading...</div>
    if (error instanceof Error) return <div>Error: {error.message}</div>

    return (
        <div className='flex flex-col justify-center items-center min-w-full'>
            <TextAnimate className='font-bold text-3xl my-4' animation='blurIn' as='h1'>
                Список Объявлений
            </TextAnimate>
            <div className='relative flex h-[500px] w-full flex-col justify-start overflow-hidden p-2'>
                <AnimatedList delay={500}>
                    {items?.data?.map((item, idx) => (
                        <Notification to={`/item/${item.id}`} color='#00C9A7' {...item} key={idx} />
                    ))}
                </AnimatedList>
                <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background'></div>
            </div>
        </div>
    )
}

export { List }
