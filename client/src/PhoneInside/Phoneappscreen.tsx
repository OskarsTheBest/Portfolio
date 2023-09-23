import React from 'react'
import star from '../img/star.svg'
import search from '../img/search.svg'
import LocalTime from '../components/LocalTime'
function Phoneappscreen() {
  return (
    <div className='noselect'>
      <a href='https://github.com/OskarsTheBest/Portfolio'>
        <div className="p-2 max-w-sm mx-auto bg-slate-200 rounded-xl shadow-lg flex items-center space-x-4 hover:shadow-black hover:shadow-md hover:bg-slate-300">
          <div className="shrink-0">
            <img className="h-8 w-8" alt='Star icon' src={star} ></img>
          </div>
        <div>
        <div className="text-xl font-medium text-black">Github</div>
          <p className="text-slate-500">Star me on Github!</p>
        </div>
        </div>
      </a>
      <div className='my-6'>
        <LocalTime />
      </div>
      <div className='max-w-sm mx-auto rounded-xl p-2 bg-gray-400'>
        Search This Phone
        <img className='ml-56 h-6 w-6 ' src={search} alt='Search'></img>
      </div>
    </div>
  )
}

export default Phoneappscreen
