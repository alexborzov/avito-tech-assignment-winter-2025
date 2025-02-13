import type { FC } from 'react'
import type { IListIdProps } from '../model'
import { useListById } from '../vm'
import { details } from './details'
import { BoxReveal, Button } from '~/shared/ui'

const ListId: FC<IListIdProps> = ({ params: { itemId } }) => {
    const { item, isLoading, error } = useListById({ params: { itemId } })

    if (isLoading) return <div>Loading...</div>
    if (error instanceof Error) return <div>Error: {error.message}</div>

    return (
        <>
            <div className='flex flex-col justify-center items-center min-w-full mb-40'>
                <div className='size-full max-w-lg items-center justify-center overflow-hidden pt-8'>
                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <p className='text-[3.5rem] font-semibold'>
                            {item?.name}
                            <span className='text-[#5046e6]'>.</span>
                        </p>
                    </BoxReveal>

                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <h2 className='mt-[.5rem] text-[1rem]'>
                            {item?.description} <span className='text-[#5046e6] font-semibold'>{item?.location}</span>
                        </h2>
                    </BoxReveal>

                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <div className='mt-6 space-y-2 text-lg'>{details(item!)}</div>
                    </BoxReveal>

                    <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                        <Button className='mt-[1.6rem] bg-[#5046e6]' variant='default'>
                            Редактировать
                        </Button>
                    </BoxReveal>
                </div>
            </div>
        </>
    )
}

export { ListId }
