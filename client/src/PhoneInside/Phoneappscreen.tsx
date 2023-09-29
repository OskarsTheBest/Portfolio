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
      <div className='max-w-sm mx-auto rounded-xl p-2 text-white bg-gray-400 brightness-75 hover:brightness-100'>
      <img className='h-6 w-6 float-right' src={search} alt='Search'></img>
        Search This Phone
      </div>
      <div className="grid grid-cols-2 gap-6 box-content auto-cols-max border-black py-12">
        <div className="bg-blue-500 p-4 rounded-lg text-white text-center hover:bg-blue-600 transform hover:scale-105 transition-transform h-28">
          <p>App 1</p>
        </div>
        <div className="bg-green-500 p-4 rounded-lg text-white text-center hover:bg-green-600 transform hover:scale-105 transition-transform h-28">
          <p>App 2</p>
        </div>
        <div className="bg-yellow-500 p-4 rounded-lg text-white text-center hover:bg-yellow-600 transform hover:scale-105 transition-transform h-28">
          <p>App 3</p>
        </div>
        <div className="bg-red-500 p-4 rounded-lg text-white text-center hover:bg-red-600 transform hover:scale-105 transition-transform h-28">
          <p>App 4</p>
        </div>
        <div className="bg-purple-500 p-4 rounded-lg text-white text-center hover:bg-purple-600 transform hover:scale-105 transition-transform h-28">
          <p>App 5</p>
        </div>
        <div className="bg-pink-500 p-4 rounded-lg text-white text-center hover:bg-pink-600 transform hover:scale-105 transition-transform h-28">
          <p>App 6</p>
        </div>
      </div>
    </div>
  )
}

export default Phoneappscreen