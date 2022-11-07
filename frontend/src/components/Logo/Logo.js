import React, {useState} from 'react'
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import brain from './brain.png'


const Logo = () => {
  return (
    <Tilt scale={1.10} transitionSpeed={2500} style={{width: 'fit-content'}}>
    <div style={{height: '150px', width:'150px'}} className='Tilt ma4 mt0 br2 shadow-2 tilt-scale'>
      <div className="header">
        <div>
          <img className='logo-img' src={brain} alt='logo'/>
        </div>
      </div>
    </div>
  </Tilt>
  )
}

export default Logo