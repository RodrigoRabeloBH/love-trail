import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react'
import { FaQuoteLeft } from 'react-icons/fa'

type Props = {
    name: string
    message: string
    children: React.ReactNode;
}

export default function Testimonial({ children, message, name }: Props) {
    return (
        <Card className='p-5'>
            <CardHeader className=''>
                <div className='flex gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h4 className='font-semibold  text-default-600'>{name}</h4>
                        <h5 className="text-small tracking-tight text-default-400">{message}</h5>
                    </div>
                </div>
            </CardHeader>
            <Divider />
            <CardBody className='px-3 py-5 text-small text-default-400'>
                <div className='flex justify-start mb-2'>
                    <FaQuoteLeft />
                </div>
                <div>
                    {children}
                </div>
            </CardBody>
        </Card>
    )
}
