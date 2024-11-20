"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CustomCarousel() {

  const items = [
    { image: "https://via.placeholder.com/300x200"
      
     },
    { image: "https://via.placeholder.com/300x200" },
    { image: "https://via.placeholder.com/300x200" },
    { image: "https://via.placeholder.com/300x200" },
  ];


  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? items.length - 1 : prev - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === items.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Carousel Items (Whole Carousel is Draggable) */}
      <motion.div
        className="flex"
        animate={{
          x: `-${currentIndex * 100}%`,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        drag="x" // Enable horizontal dragging
        dragConstraints={{ left: -(items.length - 1) * 100, right: 0 }} // Restrict dragging within carousel bounds
        onDragStart={() => setDragging(true)} // Set dragging state to true when dragging starts
        onDragEnd={(e, info) => {
          // When drag ends, adjust current index based on the drag distance
          if (info.offset.x < -100) {
            nextSlide();
          } else if (info.offset.x > 100) {
            prevSlide();
          }
          setDragging(false); // Reset dragging state
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="w-full flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative h-64">
              <img
                src={item.image}
                className="w-full h-full object-cover rounded-lg shadow-lg transition-transform duration-300"
              />
              <motion.div
                className="absolute bottom-0 w-full h-full "
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation Arrows (Hide on Mobile) */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 hidden md:block"
      >
        &#8249;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full hover:bg-opacity-75 hidden md:block"
      >
        &#8250;
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
