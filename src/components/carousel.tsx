"use client"
import { useState } from "react";


const Carousel:React.FC = () => {


// THERE SHOULD BE A CODE CLEANED AND STATIC TYPED IN

      const images = [
            {
              src: "https://images.unsplash.com/photo-1537211261771-e525b9e4049b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=450&q=80",
              alt: "Squirrel zombie",
            },
            {
              src: "https://images.unsplash.com/photo-1503925802536-c9451dcd87b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=450&q=80",
              alt: "Zombie hands",
            },
            {
              src: "https://images.unsplash.com/photo-1509558567730-6c838437b06b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=450&q=80",
              alt: "Zombie pumpkin",
            },
          ];

      const [current, setCurrent] = useState(0);

      const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      };
    
      const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      };




      // return(
      //       <>
            
      //       <div className="flex w-full flex-col items-center justify-center">
      //       </div>
      //       </>
      // )

      return (
            <div className="relative max-w-xl mx-auto">
              <div className="overflow-hidden">
                {images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`${
                      idx === current ? "block" : "hidden"
                    } transition-opacity duration-500`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                ))}
              </div>
        
              {/* Navigation Buttons */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg"
                >
                  &lt;
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-lg"
                >
                  &gt;
                </button>
              </div>
        
              {/* Dots */}
              <div className="flex justify-center mt-4 space-x-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full ${
                      idx === current ? "bg-black" : "bg-gray-400"
                    }`}
                  ></button>
                ))}
              </div>
            </div>
          );
}

export default Carousel;