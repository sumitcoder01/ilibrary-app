import { useEffect, useState } from "react";
import CarouselSkeleton from "../components/carousel/CarouselSkeleton";
import Carousel from "../components/carousel/Carousel";
import { useFirestore } from "../context/dbContext";
import TestimonialSection from "../components/testimonials/TestimonialSection";

export default function Home() {
    const { getImages } = useFirestore();
    const [loading, setLoading] = useState<boolean>(true);
    const [images, setImages] = useState<string[]>([]);

    const fetchImages = async () => {
        if (!getImages) return;
        const imageList = await getImages() as string[];
        setImages(imageList);
        setLoading(false);
    }

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="min-h-screen">
            {loading || images.length === 0 ? <CarouselSkeleton /> : <Carousel images={images} />}
            <TestimonialSection/>
        </section>
    )
}
