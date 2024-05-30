'use client'
import { createMessage } from '@/app/actions/messageActions';
import { MessageSchema, messageSchema } from '@/lib/schemas/messageSchema';
import { handleFormServerErros } from '@/lib/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@nextui-org/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HiPaperAirplane } from 'react-icons/hi2';

export default function ChatForm() {
    const router = useRouter();
    const params = useParams<{ userId: string }>();

    const { register, handleSubmit, reset, setError, setFocus, formState: { isSubmitting, isValid, errors } }
        = useForm<MessageSchema>({
            resolver: zodResolver(messageSchema)
        });

    useEffect(() => {
        setFocus('text');
    }, [setFocus]);

    const onSubmit = async (data: MessageSchema) => {
        const result = await createMessage(params.userId, data);

        if (result.status === 'error')
            handleFormServerErros(result, setError);
        else {
            reset();
            router.refresh();
            setTimeout(() => setFocus('text'), 50);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full'
        >
            <div className='flex items-center gap-3 p-3'>
                <Input
                    fullWidth
                    placeholder='Type a message'
                    variant='faded'
                    {...register('text')}
                    isInvalid={!!errors.text}
                    errorMessage={errors.text?.message}
                />
                <Button
                    type='submit'
                    isIconOnly
                    radius='full'
                    isLoading={isSubmitting}
                    isDisabled={!isValid || isSubmitting}
                    className='bg-purple-600 text-white'
                >
                    <HiPaperAirplane size={18} />
                </Button>
            </div>
            <div className='flex flex-col mx-10 mb-5'>
                {errors.root?.serverError
                    && (<p className='text-danger text-sm'>{errors.root.serverError.message}</p>)}
            </div>
        </form>

    )
}
