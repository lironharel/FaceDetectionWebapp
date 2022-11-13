import React from 'react'

const Navigation = ({setRoute, isSignedIn}) => {
  let NavItems = <></>

  if(isSignedIn) {
    NavItems =
    <>
      <p onClick={() => setRoute('signin')} className='f4 link dim black underline pa3 pointer'>Sign Out</p>
    </> 
  } 
  else {
    NavItems =  
    <>
      <p onClick={() => setRoute('signin')} className='f4 link dim black underline pa3 pointer'>Sign In</p>
      <p onClick={() => setRoute('register')} className='f4 link dim black underline pa3 pointer'>Register</p>
    </>
  }
  
  return (
    <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        {NavItems}
    </nav>
  )
}

export default Navigation