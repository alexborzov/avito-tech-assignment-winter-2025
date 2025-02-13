import { useState, useMemo, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormSchema, getDefaultValues } from '../model'
import { usePostItems, type FormSchema as TFormSchema } from '~/shared/api'

const useItemForm = () => {
    // const [category, setCategory] = useState<TFormSchema['type']>('REAL_ESTATE')
    const postItemMutation = usePostItems()

    const form = useForm<TFormSchema>({
        resolver: zodResolver(FormSchema),
        defaultValues: getDefaultValues('REAL_ESTATE'),
    })

    // const watchType = form.watch('type')

    const onSubmit: SubmitHandler<TFormSchema> = data => {
        console.log('@data', data)
        // postItemMutation.mutate({ data })
        // postItemMutation.mutate({ data: { id: Math.floor(Math.random() * 10), ...data } })
    }

        useEffect(() => {
            console.log('watch')
        }, [form.watch])
    

    // useEffect(() => {
    //     form.reset()
    // }, [form.reset])

    return {
        form,
        onSubmit,
        isLoading: postItemMutation.isPending,
        categoryWatch: form.watch('type'),
        // handleCategoryChange: (value: TFormSchema['type']) => setCategory(value),
    }
}

export { useItemForm }
