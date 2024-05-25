import { CardHeader, Divider, CardBody } from '@nextui-org/react'
import React from 'react'

export default function PhotosPage() {
    return (
        <>
            <CardHeader className='text-2xl font-semibold text-secondary'>
                Photos
            </CardHeader>
            <Divider />
            <CardBody>
                Photos goes here
            </CardBody>
        </>
    )
}
