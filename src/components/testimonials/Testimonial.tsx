import { Testimonial } from "../../interfaces/testimonial";

export default function TestimonialItem({ testimonial }:{testimonial:Testimonial}) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-700">{testimonial.text}</p>
            <div className="mt-4 flex items-center">
                <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-4"
                />
                <div className="text-sm">
                    <p className="text-gray-900 font-bold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.position}</p>
                </div>
            </div>
        </div>
    )
}
