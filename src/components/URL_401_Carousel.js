import React, { useState, useEffect } from 'react';

const URL_401_Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ['4N Stands for Fourth DimensioN', 
  'for InnovatioN', 
  'for TransformatioN', 
  'Building products for the Next GeneratioN!'];
 
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  useEffect(() => {
    // Set an interval to switch slides automatically
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3500);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  return (
    <div className="carousel">
      <div className="carousel-content">
        <div className="slide">{slides[currentSlide]}</div>
      </div>
    </div>
  );
};

export default URL_401_Carousel;
