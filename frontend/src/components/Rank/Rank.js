import React from 'react'

const Rank = ({name, entries}) => {
  return (
    <div className='center col'>
        <span className='white f3'>
            {`${name}, your current entry count is...`}
        </span>
        <span className='white f1'>
            {entries}
        </span>
    </div>
  )
}

export default Rank