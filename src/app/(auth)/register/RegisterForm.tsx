'use client'

import { registerUser } from '@/app/actions/authActions';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { handleFormServerErros } from '@/lib/util';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem } from '@nextui-org/react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FaArrowRight } from 'react-icons/fa';
import { GiEyeTarget, GiEyelashes, GiKeyLock } from 'react-icons/gi'

export default function RegisterForm() {
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, setError, reset, formState: { errors, isValid, isSubmitting } }
        = useForm<RegisterSchema>({
            resolver: zodResolver(registerSchema),
            mode: 'onTouched'
        });

    const onsubmit = async (data: RegisterSchema) => {

        console.log(data);

        const result = await registerUser(data);

        if (result.status === 'success') {
            reset();
            router.push('/login');
        }
        else
            handleFormServerErros(result, setError);
    }

    return (
        <Card className='w-75% md:w-2/5 mx-auto'>
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className='flex flex-col gap-2 items-center text-secondary'>
                    <div className='flex flex-row items-center gap-3'>
                        <GiKeyLock size={30} />
                        <h1 className='text-xl font-semibold'>Register</h1>
                    </div>
                    <p className='text-neutral-500'>
                        Welcome to LoveTrail
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
                        <div className='flex flex-col md:flex-row gap-2'>
                            <Input
                                defaultValue=''
                                label='City'
                                variant='bordered'
                                autoComplete='off'
                                {...register('city')}
                                isInvalid={!!errors.city}
                                errorMessage={errors.city?.message}
                            />
                            <Input
                                defaultValue=''
                                label='Country'
                                variant='bordered'
                                autoComplete='off'
                                {...register('country')}
                                isInvalid={!!errors.country}
                                errorMessage={errors.country?.message}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row gap-2'>
                            <Input
                                defaultValue=''
                                label='Birth Date'
                                variant='bordered'
                                autoComplete='off'
                                type='date'
                                {...register('dateOfBirth')}
                                isInvalid={!!errors.dateOfBirth}
                                errorMessage={errors.dateOfBirth?.message}
                            />
                            <Select
                                label="Select a gender"
                                variant='bordered'
                                {...register('gender')}
                                isInvalid={!!errors.gender}
                                errorMessage={errors.gender?.message}
                            >
                                <SelectItem key='female' value='female'>
                                    Female
                                </SelectItem>
                                <SelectItem key='male' value='male'>
                                    Male
                                </SelectItem>
                            </Select>
                        </div>
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
                        {errors.root?.serverError
                            && (<p className='text-danger text-sm'>{errors.root.serverError.message}</p>)}
                        <Button
                            isLoading={isSubmitting}
                            isDisabled={!isValid}
                            fullWidth
                            type='submit'
                            color='secondary'>
                            Register
                        </Button>
                        <div className='flex justify-center items-center'>
                            <Link
                                className='text-purple-500'
                                href={'/login'}>
                                Already registered?
                            </Link>
                            <FaArrowRight className='mx-2 text-purple-500' />
                        </div>
                    </div>
                </form>
            </CardBody>
        </Card>
    )
}
