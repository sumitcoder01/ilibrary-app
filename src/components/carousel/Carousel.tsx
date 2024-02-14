import { useState, useEffect } from "react";
import ButtonGroup from "./buttonGroup/ButtonGroup";
import { NextButton } from "./nextButton/NextButton";
import { PreviousButton } from "./previouButton/PreviousButton";

export default function Carousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="relative w-full">
            <div className="relative h-56 overflow-hidden opacity-75 rounded-lg md:h-96">
                {images.map((imageUrl, index) => (
                    <div
                        key={index}
                        className={`absolute w-full h-full duration-700 ease-in-out opacity-0 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                        data-carousel-item
                    >
                        <img src={imageUrl} className="absolute inset-0 w-full h-full object-cover" alt={`Book ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
                {images.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
                        aria-current={index === currentIndex ? 'true' : 'false'}
                        aria-label={`Slide ${index + 1}`}
                        data-carousel-slide-to={index}
                        onClick={() => setCurrentIndex(index)}
                    ></button>
                ))}
            </div>
            <PreviousButton prevSlide={prevSlide} />
            <NextButton nextSlide={nextSlide}/>
            <ButtonGroup/>
        </div>
    );
}
