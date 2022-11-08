import React from 'react'
import { commonInputClasses } from '../../utils/theme'
import PosterSelector from '../PosterSelector'

export default function ActorForm({ title, btnTitle }) {
    return (
        <div className='dark:bg-primary bg-white p-3 w-[35rem] rounded'>
            <div className='flex justify-between items-center mb-3'>
                <h1 className='font-semibold text-xl dark:text-white text-primary'>{title}</h1>
                <button
                    type='submit'
                    className='px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded'
                >
                    {btnTitle}
                </button>
            </div>
            <form className='flex space-x-2'>
                {/* <img
                    src="https://images.unsplash.com/photo-1529629468183-b9cddd7be13b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80"
                    alt=""
                    className='w-36 h-36 aspect-square object-cover rounded'
                /> */}
                <PosterSelector className='aspect-square object-cover' />
                <div className='flex-grow flex flex-col space-y-2'>
                    <input type="text" placeholder='Enter Name' className={commonInputClasses + ' border-b-2'} />
                    <textarea className={commonInputClasses + ' border-b-2 resize-none h-full'} placeholder='About' ></textarea>
                </div>
            </form>
        </div>
    )
}
