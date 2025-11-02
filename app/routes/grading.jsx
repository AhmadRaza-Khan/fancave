import GradingBody from "~/components/GradingBody";
import PagesCarousel from "~/components/PagesCarousel";

export function loader(){}


export default function Grading() {
  
  return (
   <div>
    <PagesCarousel />
    <GradingBody />
    <button
       onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
       className='w-full text-center border border-gray-300 py-2 mb-10 border-l-0 border-r-0 mt-10'
    > Back to top </button>
   </div>
  );
}
