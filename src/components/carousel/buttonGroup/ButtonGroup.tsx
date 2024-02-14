import { AboutButton } from "../aboutButton/AboutButton";
import { BuyButton } from "../buyButton/BuyButton";

export default function ButtonGroup() {
    return (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-5">
            <BuyButton/>
            <AboutButton/>
        </div>
    )
}
