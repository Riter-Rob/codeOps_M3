import React from 'react'

function Skeleton() {
  return (
    <div className='skeleton_container'>
      <div className='skeleton_bar skeleton_title'></div>
      <div className='skeleton_bar skeleton_line'></div>
      <div className='skeleton_bar skeleton_line'></div>
      <div className='skeleton_bar skeleton_btn'></div>
    </div>
  )
}

export default Skeleton
