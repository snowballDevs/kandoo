// home page or dashboard page depending on authentication status


import React, {useState} from 'react'

const LandingPage = () => {

  return (
    <main className='text-center font-serif mt-48'>
      <h1 className="home--h1 text-6xl">Projects. Together.</h1>
      <h2>Organize your team goals and deploy faster</h2>
      <div>
        <button className="border-2 border-solid border-red-600">Join Now!</button>
      </div>
    </main>
    
  )
}
export default LandingPage