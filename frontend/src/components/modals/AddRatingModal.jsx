import React, { useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'
import ModalContainer from './ModalContainer'
import Submit from '../form/Submit'
const ratings = new Array(10).fill("")
export default function AddRatingModal({ }) {
    const [selectedRatings, setSelectedRatings] = useState([])
    const handleMouseEnter = (index) => {
        const ratings = new Array(index + 1).fill("")
        setSelectedRatings([...ratings])
    }
    return (
        <ModalContainer visible ignoreContainer>
            <div className='p-5 dark:bg-primary bg-white rounded space-y-3'>
                <div className='text-highlight dark:text-highlight-dark flex items-center relative'>
                    {ratings.map((_, index) => {
                        return <AiOutlineStar onMouseEnter={() => handleMouseEnter(index)} className="cursor-pointer" key={index} size={24} />
                    })}
                    <div className='flex items-center absolute top-1/2 -translate-y-1/2'>
                        {selectedRatings.map((_, index) => {
                            return <AiFillStar onMouseEnter={() => handleMouseEnter(index)} className="cursor-pointer" key={index} size={24} />
                        })}
                    </div>
                </div>
                <textarea className='w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent
                resize-none'></textarea>
                <Submit value="Rate this movie" />
            </div>
        </ModalContainer>
    )
}
