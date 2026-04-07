import React from 'react'

const Spinner = ({mode}) => {
  const textPrimary = mode=='dark' ? 'text-white' : 'text-[#00B2A9]'
  const bgPrimary = mode=='dark' ? 'bg-backGray' : 'bg-white'
  return (
    <div className={`flex justify-center flex-col min-h-screen ${textPrimary} ${bgPrimary} items-center w-full`}>
        <span className={`animate-spin w-8 h-8 rounded-full border-primary border-t-transparent border-2`}></span>
        <span >Loading...</span>
    </div>
  )
}

export default Spinner
