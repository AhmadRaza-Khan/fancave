import { Image } from "@shopify/hydrogen";

export function Hero(){
    return(
        <div className="hero bg-base-200 h-3/4">
            <Image data={{url: "/banner.png"}} />
        </div>
    );
}