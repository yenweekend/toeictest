import React from 'react'
import icons from '../../utils/icons'
const Empty = ({text, icon}) => {
  return (
    <div className="empty h-[216px] w-full empty flex items-center justify-center bg-white rounded-xl">
            <div className="flex flex-col items-center">
                {icon}
                <span className='primary-color font-medium'>{text}</span>
            </div>
      </div>
  )
}

export default Empty
