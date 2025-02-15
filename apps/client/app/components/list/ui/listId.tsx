import { useNavigate } from '@remix-run/react'
import type { FC } from 'react'
import { BoxReveal, Button, Loading } from '~/shared/ui'
import type { IListIdProps } from '../model'
import { useDeleteItemByIdMutation, useListById } from '../vm'
import { details } from './details'

const ListId: FC<IListIdProps> = ({ itemId }) => {
    const {
        deleteItem,
        isPending: deleteItemMutationIsPending,
        error: deleteItemMutationError,
    } = useDeleteItemByIdMutation()

    const navigate = useNavigate()

    const { item, isLoading: itemIsLoading, error: itemError } = useListById({ itemId })

    const handleDelete = () => deleteItem({ id: itemId })

    const handleEdit = () => itemId && navigate(`/form/${itemId}`)

    const isLoading = deleteItemMutationIsPending || itemIsLoading

    const error = deleteItemMutationError || itemError

    if (isLoading) return <Loading />

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
                        <div className='mt-6 space-y-2 text-lg'>{item ? details(item) : <p>Нет данных</p>}</div>
                    </BoxReveal>

                    <div className='flex items-center gap-4'>
                        <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                            <Button
                                className='mt-[1.6rem]'
                                variant='destructive'
                                onClick={handleDelete}
                                disabled={deleteItemMutationIsPending}
                            >
                                Удалить
                            </Button>
                        </BoxReveal>

                        <BoxReveal boxColor={'#5046e6'} duration={0.5}>
                            <Button className='mt-[1.6rem]' variant='default' onClick={handleEdit}>
                                Редактировать
                            </Button>
                        </BoxReveal>
                    </div>
                </div>
            </div>
        </>
    )
}

export { ListId }
