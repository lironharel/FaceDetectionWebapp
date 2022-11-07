import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onBtnSubmitClick, onInputChange}) => {
  return (
    <div>
        <p className='f3'>
            {'This Face Recognition app will detect faces in your pictures. Try it out.'}
        </p>
        <div className='center'>
            <div className='form center row pa4 br3 shadow-5'>
                <input onChange={onInputChange} className='f4 pa2 w-70 center' type='text' />
                <button onClick={onBtnSubmitClick} className='f4 grow link ph3 pv2 dib bg-light-purple w-30 white'>Detect</button>
            </div>
        </div>
    </div>
  )
}

export default ImageLinkForm