import React, { useState } from 'react'
import { commonInputClasses } from '../../utils/theme'
import PosterSelector from '../PosterSelector'

const defaultActorInfo = {
    name: '',
    about: '',
    avatar: null
}

export default function ActorForm({ title, btnTitle }) {
    const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo })
    const [selectedAvatarForUI, setSelectedAvatarForUI] = useState('')

    const updatePosterForUI = (file) => {
        const url = URL.createObjectURL(file);
        setSelectedAvatarForUI(url);
    };

    const handleChange = ({ target }) => {
        const { value, files, name } = target
        if (name === 'avatar') {
            const file = files[0]
            updatePosterForUI(file)
            return setActorInfo({ ...actorInfo, avatar: file })
        }
        setActorInfo({ ...actorInfo, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(actorInfo);
    }

    const { name, about } = actorInfo

    return (
        <div >
            <form
                className='dark:bg-primary bg-white p-3 w-[35rem] rounded'
                onSubmit={handleSubmit}
            >
                <div className='flex justify-between items-center mb-3'>
                    <h1 className='font-semibold text-xl dark:text-white text-primary'>{title}</h1>
                    <button
                        type='submit'
                        className='px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded'
                    >
                        {btnTitle}
                    </button>
                </div>
                <div className='flex space-x-2'>

                    <PosterSelector
                        selectedPoster={selectedAvatarForUI}
                        className='w-36 h-36 aspect-square object-cover'
                        name='avatar'
                        onChange={handleChange}
                        accept="image/jpg, image/jpeg, image/png"
                        label='Select avatar'
                    />
                    <div className='flex-grow flex flex-col space-y-2'>
                        <input
                            type="text"
                            placeholder='Enter Name'
                            className={commonInputClasses + ' border-b-2'}
                            name='name'
                            onChange={handleChange}
                            value={name}
                        />
                        <textarea
                            className={commonInputClasses + ' border-b-2 resize-none h-full'}
                            placeholder='About'
                            name='about'
                            onChange={handleChange}
                            value={about}
                        >

                        </textarea>
                    </div>
                </div>
            </form>
        </div>
    )
}
