import React from 'react'

const Logo = ({width}) => {
  return (
    <div className={`w-[${width}px]`} style={{
      width: `${width}px`
    }}>
      <img src="https://cdn.jsdelivr.net/gh/azota889/storage_public/azota_assets/landres/img/azota_logo.svg" alt="" className='w-full h-full object-cover' />
    </div>
  )
}

export default Logo
