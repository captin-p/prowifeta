import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Homeslider.css";

const SLIDES = Array.from({ length: 63 }, (_, index) => ({
  image: `/img/slides/d${index + 1}.jpg`,
}));

function Homeslider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((previousSlide) => (previousSlide + 1) % SLIDES.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((previousSlide) =>
      previousSlide === 0 ? SLIDES.length - 1 : previousSlide - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((previousSlide) => (previousSlide + 1) % SLIDES.length);
  };

  return (
    <div className="slider-container">
      <div className="slide">
        {Array.from({ length: 5 }, (_, index) => {
          const slideIndex = (currentSlide + index) % SLIDES.length;
          const slide = SLIDES[slideIndex];

          return (
            <div
              key={slide.image}
              className="item"
              style={{
                backgroundImage: `url(${encodeURI(slide.image)})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="content"></div>
            </div>
          );
        })}

        <div className="button">
          <button type="button" onClick={goToPrev} aria-label="Previous slide">
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button type="button" onClick={goToNext} aria-label="Next slide">
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Homeslider;
