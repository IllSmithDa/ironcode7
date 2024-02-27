import React from 'react'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom'

export default function NoMatch() {
  return (
    <div className={`
      darl:bg-[#1C1C1C] min-h-[100vh] w-[100%] flex flex-col justify-center text-center items-center
    `}>
      <h1
        className={`
          xl:text-[3rem]
          sm:text-[2.3rem] font-[500]
          text-[1.5rem]
        `}
      >404: Page does not exist!</h1>
      <Link 
        to="/"
        className={`
          block p-[1rem] my-[2rem] bg-[#DADADA] hover:bg-[#EEE] w-[125px] text-[1rem]
          sm:p[1.5rem] sm:w-[165px] sm:text-[1.4rem]
          rounded-full 
          dark:hover:bg-[#555] dark:bg-[#444]
         `}
      >
        Go Home 🡆
      </Link> 
      <Footer />
    </div>
  )
}
