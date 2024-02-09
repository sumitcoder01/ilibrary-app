export default function About() {
  return (
    <section className='min-h-full py-10 text-center'>
      <div className="max-w-full py-4 mx-auto lg:py-6 md:px-6">
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-md p-8 rounded-md shadow-md">
              <div className="px-4 pl-4 mb-6 border-l-4 border-indigo-500">
                <span className="text-sm text-gray-600 uppercase dark:text-gray-400">What We Offer</span>
                <h1 className="mt-2 text-xl font-black text-gray-700 md:text-5xl dark:text-gray-300">
                  About Us
                </h1>
              </div>
              <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                {"iLibrary isn't just a brand; it's a declaration. We provide a carefully selected range of coding-inspired wearables, books, and accessories. Our goal is to enable programmers to showcase their love for coding with fashionable and comfortable attirel."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

