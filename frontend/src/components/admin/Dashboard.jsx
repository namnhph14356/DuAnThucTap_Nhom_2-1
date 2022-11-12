import React from 'react'
import MovieUpload from './MovieUpload'

let timoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if(timoutId) clearTimeout(timoutId);
    timoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay);
  };
};

export default function Dashboard() {
  const search = (value) => {
    console.log(value);
  }
  const debounceSearch = debounce(search, 500);
  const handleChange = ({target}) => {
    debounceSearch(target.value)
  }

  return (
    <div className='p-14'>
      <input onChange={handleChange} type="text" className='border border-gray-500 '/>
    </div>
  )
}
