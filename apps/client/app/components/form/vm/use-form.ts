import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@remix-run/react'
import { useEffect } from 'react'
import { type SubmitHandler, useForm as useReactHookForm } from 'react-hook-form'
import { FormSchema, type TFormSchema, getDefaultValues, setFormValues } from '../model'
import { useGetItemById } from './use-get-item-by-id'
import { usePostItemMutation } from './use-post-item-mutation'
import { usePutItemMutation } from './use-put-item-mutation'

interface IUseFormProps {
    itemId?: string | undefined
}

const useForm = ({ itemId }: IUseFormProps = {}) => {
    const navigate = useNavigate()
    const { item, isLoading: itemIsLoading, error: itemError } = useGetItemById({ itemId })
    const { mutate: postItemMutation, isPending: postItemMutationIsPending } = usePostItemMutation()
    const { updateItem, isPending: putItemMutationIsPending, error: putItemMutationError } = usePutItemMutation()

    const form = useReactHookForm<TFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: getDefaultValues('REAL_ESTATE', itemId),
        mode: 'onChange',
    })

    const watchType = form.watch('type') || 'REAL_ESTATE'

    useEffect(() => {
        const currentType = form.getValues('type') as TFormSchema['type']
        form.reset({
            ...getDefaultValues(watchType, itemId),
            // @ts-ignore react-hook-form
            type: currentType,
        })
    }, [watchType, itemId, form])

    useEffect(() => {
        if (itemId && item) setFormValues(form, { id: itemId, ...item })
    }, [item, form, itemId])

    const onSubmit: SubmitHandler<TFormSchema> = data =>
        itemId ? updateItem({ id: itemId, data }) : postItemMutation({ data })

    const handleCancel = () => navigate(itemId ? `/item/${itemId}` : '/list')

    const isLoading = postItemMutationIsPending || putItemMutationIsPending || itemIsLoading

    const error = itemError || putItemMutationError

    return {
        form,
        error,
        onSubmit,
        watchType,
        isLoading,
        handleCancel,
    }
}

export { useForm }
