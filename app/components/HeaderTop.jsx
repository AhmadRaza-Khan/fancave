import { CircleUserRound } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router';

const HeaderTop = () => {

  const data = [
    {
      bg: "bg-[#2277c7]",
      textColor: "text-white",
      left: <>Free shipping over $500</>,
      rightColor: "text-white",
      iconColor: "white"
    },
    {
      bg: "bg-white",
      textColor: "text-black",
      left: <>We're always buying! <NavLink className="underline text-[#2277c7] text-nowrap" to="/contact">Contact Us</NavLink></>,
      rightColor: "text-[#005CF5]",
      iconColor: "#000"
    }
  ]

  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false)
      setTimeout(() => {
        setIndex(prev => prev === 0 ? 1 : 0)
        setAnimate(true)
      }, 300)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const current = data[index]

  return (
    <div className={`w-full h-fit ${current.bg} ${current.textColor}
        component-wrapper ${animate ? "slide-in" : "slide-out"} `}>
      <div className={`max-w- mx-auto max-w-7xl h-fit py-3 flex text-sm items-center justify-between 
        
    `}>
        <p className='text-nowrap mx-auto lg:mx-0 xl:mx-0 2xl:mx-0'>{current.left}</p>

      <NavLink to='/account' className='gap-2 h-fit w-fit cursor-pointer justify-between items-center hidden lg:flex xl:flex 2xl:flex'>
        <CircleUserRound className='h-5 w-5' color={current.iconColor}/>
        <p className={`${current.rightColor}`}>My Account</p>
      </NavLink>

      </div>
    </div>
  )
}

export default HeaderTop
