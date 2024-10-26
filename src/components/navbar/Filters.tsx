'use client'

import { useFilters } from '@/hooks/useFilters';
import { Button, Select, SelectItem, Slider } from '@nextui-org/react';
import { usePathname } from 'next/navigation';
import React from 'react'

export default function Filters() {
    const pathname = usePathname();
    const { selectGender, filters, gendersList, orderByList, selectAge, selectOrder } = useFilters();

    if (pathname !== '/members')
        return null;

    return (
        <div className='container mx-auto'>
            <div className='shadow-md  py-2'>
                <div className='grid md:grid-cols-4 lg:grid-cols-4 gap-2 mx-3'>
                    <div className='flex text-secondary font-semibold items-center text-lg md:text-xl'>
                        Results: 10
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div>Gender:</div>
                        {gendersList.map(({ icon: Icon, value }) => (
                            <Button
                                key={value}
                                size='sm'
                                isIconOnly
                                color={filters.gender.includes(value) ? 'secondary' : 'default'}
                                onClick={() => selectGender(value)}
                            >
                                <Icon size={18} />
                            </Button>
                        ))}
                    </div>
                    <div className='flex'>
                        <Slider
                            label='Age range'
                            color='secondary'
                            size='sm'
                            minValue={18}
                            maxValue={100}
                            defaultValue={filters.ageRange}
                            onChangeEnd={(value) => selectAge(value as number[])}
                        />
                    </div>
                    <div className='flex md:ml-10'>
                        <Select
                            size='sm'
                            fullWidth
                            placeholder='Order by'
                            variant='bordered'
                            color='secondary'
                            aria-label='Order by selector'
                            selectedKeys={new Set([filters.orderBy])}
                            onSelectionChange={selectOrder}
                        >
                            {orderByList.map(item => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}
