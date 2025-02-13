import { useItemForm } from '../vm/use-item-form'
import {
    Form as FormShadcn,
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

import { FormSchema, BaseFormSchema, categorySchemas } from '../model'
import type { z } from 'zod'

const typeLabels: Record<"REAL_ESTATE" | "AUTO" | "SERVICES", string> = {
  REAL_ESTATE: "Недвижимость",
  AUTO: "Авто",
  SERVICES: "Услуги",
};

const Form = () => {
    const { form, onSubmit, isLoading, categoryWatch } = useItemForm()

    const typeOptions = (BaseFormSchema.shape.type._def.innerType as z.ZodEnum<["REAL_ESTATE", "AUTO", "SERVICES"]>).options;

    return (
        <FormShadcn {...form}>
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
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value?.toString() ?? ''}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder='Выберите категорию' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {/* {Object.values(BaseFormSchema.shape.type && BaseFormSchema.shape.type._def.defaultValue).map(type => (
                                            <SelectItem key={type} value={type}>
                                                {type}
                                            </SelectItem>
                                        ))} */}
                                        {typeOptions.map(type => (
                                            <SelectItem key={type} value={type}>
                                                {typeLabels[type]}
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
                  // @ts-ignore
                    categorySchemas[categoryWatch]?.map(({ name, label, type = 'text' }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input type={type} placeholder={label} {...field} />
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
        </FormShadcn>
    )
}

export { Form }
