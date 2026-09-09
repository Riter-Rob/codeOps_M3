import React from 'react'

function Skeleton({ type = 'form' }) {
  if (type === 'receipt') {
    return (
      <div className='skeleton_container'>
        <div className='skeleton_bar skeleton_title'></div>
        <div className='skeleton_bar skeleton_line'></div>
        <div className='skeleton_bar skeleton_btn'></div>
      </div>
    )
  }

  return (
    <div className='skeleton_container'>
      <div className='skeleton_bar skeleton_title'></div>
      <div className='skeleton_bar skeleton_input'></div>
      <div className='skeleton_bar skeleton_input'></div>
      <div className='skeleton_bar skeleton_input'></div>
      <div className='skeleton_bar skeleton_textarea'></div>
      <div className='skeleton_bar skeleton_btn'></div>
    </div>
  )
}

export default Skeleton
