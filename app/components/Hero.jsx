import { Image } from "@shopify/hydrogen";

export function Hero(){
    return(
        <div className="hero bg-base-200 h-3/4 w-full">
            <Image className="w-full h-full object-cover" data={{url: "/abc.webp"}} />
        </div>
    );
}