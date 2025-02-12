'use client'

import type { FC } from 'react'
import { TextAnimate } from '~/shared/ui'

interface IFormItemErrorMessageProps {
    errorMessage?: string
}

const FormItemErrorMessage: FC<IFormItemErrorMessageProps> = ({ errorMessage }) => {
    return (
        errorMessage && (
            <TextAnimate className='text-sm text-muted-foreground'>
                {typeof errorMessage === 'string' ? errorMessage : String(errorMessage)}
            </TextAnimate>
        )
    )
}

export { FormItemErrorMessage }
