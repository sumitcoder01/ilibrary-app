import Testimonial from './Testimonial';
import {testimonials} from './lib/data';

export default function TestimonialSection() {
  return (
    <div className="bg-gray-100 py-12 mt-1">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">What our users say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </div>
  )
}
