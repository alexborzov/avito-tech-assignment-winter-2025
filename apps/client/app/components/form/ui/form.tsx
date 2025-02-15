import type { FC } from 'react'
import {
    Button,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form as FormShadcn,
    Input,
    Label,
    Loading,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Textarea,
} from '~/shared/ui'
import { type TFormSchema, categorySchemasMap } from '../model'
import { useForm } from '../vm/use-form'

export interface IListIdProps {
    itemId?: string
}

const categoryOptions: Record<TFormSchema['type'], string> = {
    REAL_ESTATE: 'Недвижимость',
    AUTO: 'Авто',
    SERVICES: 'Услуги',
}

const Form: FC<IListIdProps> = ({ itemId }) => {
    console.log('@FormItemId', itemId)
    const { form, onSubmit, isLoading, watchType, handleCancel, error } = useForm({ itemId })

    if (isLoading) return <Loading />

    if (error instanceof Error) return <div>Error: {error.message}</div>

    return (
        <section className='flex flex-col justify-center items-center min-h-full max-w-[800px] mx-auto'>
            {itemId && <Label className='p-4 border border-red-400'>Форма находится в режиме редактирования</Label>}
            <FormShadcn {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Название</FormLabel>
                                <FormControl>
                                    <Input placeholder='name' {...field} />
                                </FormControl>
                                <FormDescription className='text-sm'>Введите название объявление</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описание</FormLabel>
                                <FormControl>
                                    <Textarea placeholder='descriptions' {...field} />
                                </FormControl>
                                <FormDescription>Введите описание объявление</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='location'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Локация</FormLabel>
                                <FormControl>
                                    <Input placeholder='location' {...field} />
                                </FormControl>
                                <FormDescription>Введите локацию</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='photo'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Фото</FormLabel>
                                <FormControl>
                                    <Input type='file' placeholder='image' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Прикрепите фотографию <strong>(необязательное)</strong>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='type'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Категория объявления</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Выберите категорию' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(categoryOptions).map(([value, label]) => (
                                                <SelectItem key={value} value={value}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {categorySchemasMap[watchType].map(field => (
                        <FormField
                            key={field.name}
                            control={form.control}
                            // @ts-ignore
                            name={field.name}
                            render={({ field: formField }) => (
                                <FormItem>
                                    <FormLabel>{field.label}</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...formField}
                                            type={field.type || 'text'}
                                            placeholder={field.label}
                                            onChange={e => {
                                                formField.onChange(
                                                    field.type === 'number' ? Number(e.target.value) : e.target.value,
                                                )
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <div className='flex gap-4'>
                        <Button type='submit' disabled={isLoading}>
                            {itemId ? 'Сохранить' : 'Создать'}
                        </Button>
                        <Button type='button' variant='secondary' onClick={handleCancel}>
                            Отмена
                        </Button>
                    </div>
                </form>
            </FormShadcn>
        </section>
    )
}

export { Form }
