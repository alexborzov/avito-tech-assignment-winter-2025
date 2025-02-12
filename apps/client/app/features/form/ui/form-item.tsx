import type { FC } from 'react'
import { useItemForm } from '../vm/use-item-form'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    Input,
    FormLabel,
    FormMessage,
    InteractiveHoverButton,
    Textarea,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/shared/ui'
import { ItemsType } from '~/shared/api'
import { categorySchemas } from '../model/schema'

const FormItem2 = () => {
    const { form, onSubmit, isLoading, categoryWatch, handleCategoryChange } = useItemForm()

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Название</FormLabel>
                            <FormControl>
                                <Input placeholder='name' {...field} />
                            </FormControl>
                            <FormDescription>Введите название объявление</FormDescription>
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
                    name='image'
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
                                <Select
                                    onValueChange={value => {
                                        field.onChange(value), handleCategoryChange(value as ItemsType)
                                    }}
                                    value={field.value ?? ''}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Выберите категорию' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(ItemsType).map(type => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {categoryWatch &&
                    categorySchemas[categoryWatch]?.map(({ name, label, type }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input type={type ? type : 'text'} placeholder={label} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                <InteractiveHoverButton className='w-full' type='submit' disabled={isLoading}>
                    {isLoading ? 'Отправка...' : 'Разместить'}
                </InteractiveHoverButton>
            </form>
        </Form>
    )
}

export { FormItem2 }
