import React from 'react'

const Progress = ({precentage}) => {
  return (
    <div className='progress'>
        <div className='progress-bar progress-bar-striped bg-success' role='progressbar'
        style={{width: `${precentage}%`}}></div>
      
    </div>
  )
}

export default Progress
