import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { PiSpinnerGap } from 'react-icons/pi'

type Props = {
    selected: boolean
    loading: boolean
}
export default function StarButton({ loading, selected }: Props) {
    return (
        <div className='relative hover:opacity-80 transition cursor-pointer'>
            {!loading
                ? (
                    <>
                        <AiOutlineStar size={32} className='fill-white absolute -top-[2px] -right-[2px]' />
                        <AiFillStar size={28} className={selected ? 'fill-yellow-400' : 'fill-neutral-500/50'} />
                    </>
                ) : (
                    <>
                        <PiSpinnerGap size={28} className='fill-white animate-spin' />
                    </>
                )}
        </div>
    )
}
