import React from 'react'

const commonPosterUI = "flex justify-center items-center border border-dashed rounded aspect-video dark:border-dark-subtle border-light-subtle";


export default function PosterSelector  ({name, selectedPoster}) {
    return (
        <div>
            <input id={name} type="file" hidden />
            <label htmlFor='name'>
                {selectedPoster ? <img className={commonPosterUI + 'object-cover'} src={selectedPoster} alt='' /> : <PosterUI />}
            </label>
        </div>
    )
}

const PosterUI = () => {
    return <div className={commonPosterUI}>
    <span className="dark:text-dark-subtle text-light-subtle">Select Poster</span>
    </div>
}