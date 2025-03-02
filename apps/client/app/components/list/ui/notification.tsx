import { Link } from '@remix-run/react'
import type { FormSchema as TFormSchema } from '~/shared/api'
import { cn } from '~/shared/lib/utils'
import { Button } from '~/shared/ui'

const Notification = (props: TFormSchema & { color: string; to: string }) => {
    return (
        <figure
            className={cn(
                'relative mx-auto min-h-fit w-full max-w-[800px] cursor-pointer overflow-hidden rounded-2xl p-4',
                'transition-all duration-200 ease-in-out hover:scale-[103%]',
                'bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
                'transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
            )}
        >
            <div className='flex flex-row items-center gap-4'>
                <div
                    className='flex size-10 items-center justify-center rounded-2xl'
                    style={{
                        backgroundColor: props.color,
                    }}
                >
                    <span className='text-lg'>{props.name[0]}</span>
                </div>
                <div className='flex flex-col overflow-hidden'>
                    <figcaption className='flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white '>
                        <span className='text-sm sm:text-lg'>{props.name}</span>
                        <span className='mx-1'>·</span>
                        {props.type === 'SERVICES' && (
                            <span className='text-xs text-gray-500'>{props.workSchedule ?? ''}</span>
                        )}
                    </figcaption>
                    <p className='text-sm font-normal dark:text-white/60'>{props.description}</p>
                </div>
                <Button className='ml-auto' variant='default'>
                    <Link to={props.to}>Открыть</Link>
                </Button>
            </div>
        </figure>
    )
}

export { Notification }
