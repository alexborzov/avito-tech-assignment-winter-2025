import { useState, useMemo, useEffect } from 'react'
import { usePostItems, ItemsType } from '~/shared/api'
import { baseSchemaValidate, categorySchemasValidate, getDefaultValues, type TFormItemData } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { nanoid } from 'nanoid'


const useItemForm = () => {
    const [category, setCategory] = useState<ItemsType>(ItemsType.Недвижимость)

    const postItemMutation = usePostItems()

    const formSchema = useMemo(
        () => baseSchemaValidate.and(category ? categorySchemasValidate[category] : z.object({})),
        [category],
    )

    const resolver = useMemo(() => zodResolver(formSchema), [formSchema])

    const onSubmit: SubmitHandler<TFormItemData> = data => {
      console.log('@data', data);
      // postItemMutation.mutate({ data: { id: Math.floor(Math.random() * 10), ...data } })
    }

    const form = useForm<TFormItemData>({
        resolver,
        defaultValues: getDefaultValues(category),
    })

    useEffect(() => {
      form.reset(getDefaultValues(category))
  }, [category, form])

    const categoryWatch = form.watch('type')

    const handleCategoryChange = (value: ItemsType) => setCategory(value)

    return {
        form,
        onSubmit,
        isLoading: postItemMutation.isPending,
        categoryWatch,
        handleCategoryChange,
    }
}

export { useItemForm }
