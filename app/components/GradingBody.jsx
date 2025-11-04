import React from 'react'
import { NavLink } from 'react-router'

const GradingBody = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center py-8 px-5'>
      <h1 className='text-5xl text-[#2A2B2A] my-6 text-wrap text-center font-bold'>Grading Submissions</h1>
      <p className='lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] w-full leading-relaxed pt-10'>
        Interested in getting your cards graded and don't know where to start, who to trust or how to do it? We got you covered.
        <br/><br/>
        We can get your items graded at any of the four major grading companies:
      </p>
      <div className='mt-8'>
        <img className='lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] w-full object-contain' src='/Grading_Companies.jpg' alt='Store Vault' />
      </div>
      <p className='lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] w-full leading-relaxed pt-10'>
        <b>Fan Cave now offers a pre-screening service with an emphasis on helping you submit the right cards, at the right service level, to the right company for maximum value add. We've helped numerous clients - save thousands of dollars in grading fees for cards that simply were not worth grading. This saves you the aggravation of being disappointed and keeps you from wasting money.</b>
        <br/><br/>
        <b className='underline'>Please Note - this process does not guarantee that you will receive the grade we believe it will - we simply use this service to rule out cards that we don't fill we meet specific standards.</b> <br/> <br/>
        Prescreening Service(s):<br/>
        $3 per card for Pass / Fail Screening<br/>
        (Please Note: Joey is our best associate for this screening process. Please set up an appointment prior to coming to the store if you are interested in this service and to ensure that Joey is available to meet with you prior to submission - Call: 636-778-3848 to set that up.)<br/>
        <p className='text-center'>-------------------------------------------------------------------------------------</p><br/><br/>
        <b>Grading Card Pricing Change - Effective for any card(s) submitted after September 24, 2025:</b><br/><br/>

        <b>PSA Sports & TCG Card Grading Service - Value Bulk Pricing:</b><br/>
        <span className='block'>($499 max value per card)</span>
        <span className='block'>$29 per card (1-9 cards)</span>
        <span className='block'>$27 per card (10-19 cards)</span>
        <span className='block'>$25 per card (20+ cards)</span>
        <br/>
        <b>BGS Base Card Grading Pricing:</b><br/>
        $22 per card (Includes: subgrades)
        <br/><br/>
        <b>CGC Bulk Card Grading Service Pricing:</b>
        <span className='block'>($1000 max value per card)</span>
        <span className='block'>$18 per card</span>
        <br/>
        <b>CGC Comic / Magazine Grading Service Pricing:</b>
        <span className='block'>(Please Note: 10 book minimum; $400 max value):</span>
        <span className='block'>$35 per book: Modern (1975-Present)</span>
        <span className='block'>$50 per book - Vintage (Before 1975)</span>
        <br/>
        <b>SGC Card Grading Service Pricing:</b>
        <span className='block'>$21 per card (1-9 cards)</span>
        <span className='block'>$20 per card (10-19 cards)</span>
        <span className='block'>$19 per card (20+)</span>
        <br/>
        <b>PSA Regular Card Grading Service Pricing:</b>
        <span className='block'>($1499 max value per card):</span>
        <span className='block'>$75 per card (1-9 cards)</span>
        <span className='block'>$70 per card (10+)</span>
        <br/>
        <b>PSA Dual Service Card Grading Service Pricing:</b>
        <span className='block'>$30 per card (Includes Card Grade / Autograph Grade)</span>
        <span className='block'>$40 per card (Any other Dual Grading)</span>
        <br/>
        <b>Please note: Pricing upcharges could apply on higher valued cards. This is a double-edged sword because the card company is "upcharging" you because the value of your card has risen dramatically and exceeded the value of that card grading threshold.</b>
        <br/> <br/>
        Call us or visit our retail store: We are here to help: 636-778-3848
      </p>
    </div>
  )
}

export default GradingBody;