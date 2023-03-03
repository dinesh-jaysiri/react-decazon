import React from 'react'
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate()
  return (
    <label onClick={()=>navigate("/")} className='logo'>Deca<span className='logo-accent' >z</span>on</label>
  )
}

export default Logo