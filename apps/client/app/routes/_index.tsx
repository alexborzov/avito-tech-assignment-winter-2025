import type { MetaFunction } from '@remix-run/node'
import { Meteors, InteractiveHoverButton } from '~/shared/ui'
import { Link } from '@remix-run/react'

export const meta: MetaFunction = () => {
    return [{ title: 'Avito Tech' }]
}

export default function Index() {
    return (
        <div className='relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border'>
            <Meteors number={30} />
            <span className='pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10'>
                Avito Tech
            </span>
            <div className='flex items-center mt-6 gap-8'>
                <InteractiveHoverButton>
                    <Link to='/form'>Создать объявление</Link>
                </InteractiveHoverButton>
                <InteractiveHoverButton>
                    <Link to='/list'>Список объявления</Link>
                </InteractiveHoverButton>
            </div>
        </div>
    )
}
