'use client'

import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { GiEyeTarget, GiEyelashes, GiPadlock } from 'react-icons/gi'

export default function RegisterForm() {
    const [isVisible, setIsVisible] = useState(false);
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    });

    const onsubmit = (data: any) => {
        console.log(data);
    }

    return (
        <Card className='w-75% md:w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-pink-400'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiPadlock size={30} />
                        <h1 className='text-xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>
                        Welcome to NextMatch
                    </p>
                </div>
            </CardHeader>
            <CardBody>
                <form autoComplete='off' onSubmit={handleSubmit(onsubmit)}>
                    <div className='space-y-4'>
                        <Input
                            defaultValue=''
                            label='Name'
                            autoComplete='off'
                            variant='bordered'
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message}
                        />
                        <Input
                            defaultValue=''
                            label='Email'
                            variant='bordered'
                            autoComplete='off'
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message}
                        />
                        <Input
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message}
                            defaultValue=''
                            label='Password'
                            variant='bordered'
                            autoComplete='off'
                            endContent={
                                <button
                                    type="button"
                                    onClick={() => setIsVisible(!isVisible)}>
                                    {isVisible ? (
                                        <GiEyeTarget
                                            className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <GiEyelashes
                                            className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            type={isVisible ? "text" : "password"}
                        />
                        <Button
                            isDisabled={!isValid}
                            fullWidth
                            type='submit'
                            className='bg-pink-400 text-white'>
                            Submit
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
