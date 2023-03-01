import React from 'react'
import loading from './loading.gif'
const Spinner = () => {
  return (
    <div style={{height:'20px',width:'20px',margin:'0 auto'}}>
        <img src={loading} alt="loading" />
      </div>
  )
}

export default Spinner
