import React from 'react'

function Phoneright() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='box-border h-5/6 w-10 p-4 border-8 rounded-md border-black flex flex-col justify-center items-center bg-slate-600'>
        <button className='absolute top-44 border-2 border-black w-6 h-10'>+</button>
        <button className='absolute top-56 border-2 border-black w-6 h-10'>-</button>
        <button className='absolute top-96 border-4 border-black w-7 h-16'>on</button>
      </div>
    </div>
  )
}

export default Phoneright
