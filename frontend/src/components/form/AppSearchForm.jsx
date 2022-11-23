import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai'

function AppSearchForm({ showResetIcon, placeholder, onSubmit }) {
    const [value, setValue] = useState('')
    const handleOnSubmit = (e) => {
        e.preventDefault()
        onSubmit(value)
    }
    return (
        <form className='retative' onSubmit={handleOnSubmit}>
            <input
                type="text"
                className="border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary
                dark:text-white transition bg-transparent rounded text-lg p-1 outline-none"
                placeholder={placeholder}
                value={value}
                onChange={({ target }) => setValue(target.value)}
            />
            {showResetIcon ? (
                <button className='absolute top-1/4 -translate-y-2/10 py-1 right-24 text-secondary dark:text-white'>
                    <AiOutlineClose />
                </button>
            ) : null}
        </form>
    );
}

export default AppSearchForm;