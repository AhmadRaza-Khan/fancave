import React from 'react'
import { NavLink } from 'react-router'

const FAQsBdoy = () => {
  return (
    <div className='w-full h-auto flex flex-col items-center py-8 px-5'>
      <h1 className='text-5xl text-[#2A2B2A] my-6 text-wrap text-center font-bold'>FAQs</h1>
      <p className='lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] w-full leading-relaxed pt-10'>
        <b>Do you buy cards?</b> <br/>
        <b>Yes</b>. We do buy sports and pokemon singles and sealed boxes (modern and vintage). If you have singles, graded cards, boxes or an entire collection to sell - we are interested in purchasing it. The best way to do this is to come to the store or make an appointment by calling: 636-778-3848. <br/><br/>

        Due to time constraints, staffing, etc - we do recommend you check our social media or call us at 636-778-3848 to ensure we are not at an event, doing inventory or other variables which may cause us to not be available. Just want to save you a trip so always call prior to coming in if you are able. <br/><br/>

        <b>Do you grade cards?</b> <br/>
        Yes. We do accept PSA and JSA submissions through our store. We only offer this service in-store. You can bring your cards to the store and we will submit them in our weekly submissions. <NavLink className='underline' to={'/grading'}>For further details - check out our grading submission page</NavLink>.
        <br/><br/>
        <b>Do you buy sports memorabilia?</b><br/>
        Maybe. We will definitely look at your memorabilia collection but we require authenticity on all items. We can get your items authenticated to expedite the purchase process (for a fee) but memorabilia purchases are best handled through our email. Simply send an email to help@fancave.com with the items you have and photos and we can discuss via email to avoid you from having to bring everything into the store. If it's easier - please text or call us at: 636-778-3848
        <br/><br/>
        <b>Do you offer jersey customization?</b><br/>
        Yes. We use a jersey customization company outside of Fan Cave Sports. They are fully embroidered letters/numbers and not heat applied. Jersey customization is a flat fee of $90. Depending on the influx of jerseys, customization can take up to 6 weeks.
        <br/><br/>
        <b>How do our autograph signings work?</b><br/>
        Fan Cave Sports is lucky to offer different player autograph signings/events throughout the year. We have exclusive contracts with players which allows us to have multiple appearances so that all fans can have the opportunity to meet their favorites. We announce signings / schedules on our website regularly and primarily use our Facebook account (FanCaveSTL). Once a signing is announced and scheduled we will upload tickets to our website under the “Autograph Tickets” tab on our home screen. From here you can purchase tickets for each event. Each autograph ticket is good for one autograph.
        <br/><br/>
        <b>How much do autograph signings cost?</b><br/>
        Our signings and events will range in price depending on the player. Pricing is decided based upon the item you are having signed. The prices are usually broken down in the following order: pucks/flats (pictures), oversized prints/items, and game used items. Inscriptions are sold separately. 
        <br/><br/>
        <b>I purchased a ticket to a signing online, do I have to bring anything to the signing?</b> <br/>
        You do not need to bring any ticket information to the signing. Just show up and come to the front counter and provide us with the first and last name the tickets were purchased under. We will check you in and give you your ticket. The only item you need to bring is the item you wish to have signed (if you have one). If you do not have an item already, we will have items available for purchase.
        <br/><br/>
        <b>What is an inscription vs a personalization on a signed item?</b><br/>
        A personalization would be if a player addressed the autograph “To Ryan” on a signed item. These personalizations are included with the purchase of a ticket on most players. An inscription is an addition to an autograph like a stat/accomplishment such as “2019 SC Champs”. Prices on inscriptions vary at each signing.  
        <br/><br/>
        <b>What if we can't make it to the signing but still want an item signed?</b><br/>
        We offer drop off and mail in options at each of our signings. If you can't make the signing simply bring in your item no later than the provided deadline of the event and we will have it signed by the player. You can usually pick up your drop off items 2 days after the signing to give us time to authenticate each item. You can also mail in an item if you are out of town. If you are mailing in an item, purchase your ticket online and send in the item including a filled out drop off form letting us know how you would like your item autographed. Please also include your contact information and return shipping fees if applicable. 
        <br/><br/>
        <b>What time should we arrive at signings/events?</b><br/>
        People usually show up 30 minutes to an hour early at our events. This gives everyone time to pick up tickets, purchase an item to have signed if they didn't bring one, and get a spot in line and settled in. 
        <br/><br/>
        <b>Do you offer authentication at your signings?</b><br/>
        Yes. Most of our signings come with Fan Cave Sports Authentication at no additional cost. We do offer third party authentication such as JSA at some of our events for an additional cost. We are only able to authenticate items signed by the player at our specific event. No previously signed items can be authenticated. 
        <br/><br/>
        If you have additional questions please email help@fancave.com and we will do our best to provide assistance.
      </p>
    </div>
  )
}

export default FAQsBdoy;