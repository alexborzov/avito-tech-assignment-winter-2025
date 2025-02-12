import type { FC, ReactNode } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '~/shared/ui'
import { FormItemErrorMessage } from './form-item-error-message'

interface IFormSelectProps {
    onValueChange: (value: string) => void
    label: string
    category: any
}

const FormItemSelect: FC<IFormSelectProps> = ({ onValueChange, label }) => {
    // <Select onValueChange={e => setCategory(e as ItemsType)}>
    //                    <SelectTrigger >
    //                        <SelectValue placeholder='Выберите категорию' />
    //                    </SelectTrigger>
    //                    <SelectContent>
    //                        {Object.values(ItemsType).map(type => (
    //                            <SelectItem key={type} value={type}>
    //                                {type}
    //                            </SelectItem>
    //                        ))}
    //                    </SelectContent>
    //                </Select>
    //                <FormItemErrorMessage errorMessage={errors.type?.message} />
    return (
        <Select onValueChange={onValueChange}>
            <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    <SelectItem value='apple'>Apple</SelectItem>
                    <SelectItem value='banana'>Banana</SelectItem>
                    <SelectItem value='blueberry'>Blueberry</SelectItem>
                    <SelectItem value='grapes'>Grapes</SelectItem>
                    <SelectItem value='pineapple'>Pineapple</SelectItem>
                </SelectGroup>
                <FormItemErrorMessage />
            </SelectContent>
        </Select>
    )
}

export { FormItemSelect }
