import React from 'react'
import { NavLink } from 'react-router'

const AuthenticationBody = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center py-8 px-5'>
      <h1 className='text-5xl text-[#2A2B2A] my-6 text-wrap text-center font-bold'>Authentication Standards</h1>
      <div className='my-8'>
        <img className='w-80 object-contain' src='/JSA_Dealer.png' alt='JSA_Dealer' />
      </div>
      <p className='lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] w-full leading-relaxed pt-10'>
        Each and Every autographed item you purchase from our store is <b>ALWAYS 200% GUARANTEED AUTHENTIC</b>. What does that mean exactly? If you purchase any item from us and JSA or other authorized third party authenticators deem an item from our store or signings to not be authentic - we will give you 2X on what you paid for the item. That's our commitment to ensure that each and every item we sell is guaranteed authentic.
        <br/>
        <br/>

        We obtain our autographed items a few different ways.... <br/>
        1.  In Store / In Person signings. Players come to our store for an autograph signing, either public or private, or we attend a signing elsewhere. We have over 5+ Exclusive Players that we work with and handle all their sports memorabilia, game used and appearances.<br/>
        2.  We only purchase authentic merchandise from a select group of trusted autograph vendors that we work very closely with to ensure each and every item is authentic. <br/>
        3.  We prefer to work through agency relationships - we do not chase players on the streets and all of our autographs are obtained directly from the players during sit down signings or events.<br/>
        <br/> <br/>

        <b>Fan Cave Authentication:</b> <br/>
        If we acquired the autograph in person, it will include the official Fan Cave Sports Authentication COA + Matching Hologram.  Our COA includes: The date the item was signed, a tamper proof hologram on both the COA & the autographed item along with a matching number on both to ensure our authentication is specific to your item. We do not have a database to query your item - rest assured if you have a Fan Cave sticker on the item and a Fan Cave COA / Autograph Ticket with a matching sticker - your item can be easily inspected by any third party authenticator. <br/> <b/> <br/>

        <b>Purchased Merchandise Authentication:</b> <br/>
        If we purchased the item from one of our reputable partners, their COA and/or hologram will be included. These include MLB, St. Louis Blues, or any other reputable partner we work with. <br/> <br/>

        No matter the case, your item is always 200% guaranteed to pass any third party authentication, such as JSA.  Please ask an associate for more details on our guarantee. <br/> <br/>

        <b>Third Party Authentication:</b> <br/>
        Unfortunately we are not authorized to authenticate your personal items.  If you are looking to authenticate an item you purchased elsewhere or received, we recommend visiting <NavLink className="underline" to={'http://www.SpenceLOA.com'}>http://www.SpenceLOA.com</NavLink>. <br/> <br/>

        We also work with JSA to set up "days in our store" where both vendors will take items for inspection and authentication so make sure to follow us on our socials for dates / times those take place.
      </p>
    </div>
  )
}

export default AuthenticationBody