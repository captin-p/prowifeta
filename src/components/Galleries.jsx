import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import "./Galleries.css";

const ARCHIVE_PHOTOS = Array.from({ length: 314 }, (_, index) => ({
  src: `/img/slides/d${index + 1}.jpg`,
  alt: `ProWIFETA gallery image ${index + 1}`,
}));
const EDWENASE_PHOTOS = Array.from({ length: 23 }, (_, index) => ({
  src: `/img/events/edwenase-edit/edwenase-edit-${String(index + 1).padStart(2, "0")}.jpg`,
  alt: `Edwenase event photo ${index + 1}`,
}));
const ALL_PHOTOS = [...EDWENASE_PHOTOS, ...ARCHIVE_PHOTOS];
const STORYBOARD_INDICES = [0, 3, 7, 11, 17, 22];
const AUTO_SLIDE_INTERVAL = 4000;
const AUTO_RESUME_DELAY = 3000;
const THUMBNAIL_WINDOW = 7;

const getVisibleThumbnailIndexes = (currentIndex, totalImages, windowSize) => {
  const itemCount = Math.min(windowSize, totalImages);
  const radius = Math.floor(itemCount / 2);

  return Array.from({ length: itemCount }, (_, offset) =>
    (currentIndex - radius + offset + totalImages) % totalImages
  );
};

export default function Galleries() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const resumeTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isAutoSliding) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setCurrentImageIndex((previousIndex) => (previousIndex + 1) % ALL_PHOTOS.length);
    }, AUTO_SLIDE_INTERVAL);

    return () => window.clearInterval(interval);
  }, [isAutoSliding]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  const pauseAndResume = () => {
    setIsAutoSliding(false);

    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(() => {
      setIsAutoSliding(true);
      resumeTimeoutRef.current = null;
    }, AUTO_RESUME_DELAY);
  };

  const goToNext = () => {
    setCurrentImageIndex((previousIndex) => (previousIndex + 1) % ALL_PHOTOS.length);
    pauseAndResume();
  };

  const goToPrev = () => {
    setCurrentImageIndex((previousIndex) =>
      previousIndex === 0 ? ALL_PHOTOS.length - 1 : previousIndex - 1
    );
    pauseAndResume();
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
    pauseAndResume();
  };

  const toggleAutoSlide = () => {
    if (resumeTimeoutRef.current) {
      window.clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    setIsAutoSliding((previousValue) => !previousValue);
  };

  const visibleThumbnails = getVisibleThumbnailIndexes(
    currentImageIndex,
    ALL_PHOTOS.length,
    THUMBNAIL_WINDOW
  );
  const progress = `${(((currentImageIndex + 1) / ALL_PHOTOS.length) * 100).toFixed(2)}%`;

  return (
    <div className="gallery-showcase">
      <div className="gallery-overview">
        <div className="gallery-overview-copy">
          <p className="gallery-eyebrow">Visual archive</p>
          <h3 className="gallery-overview-title">
            See the energy behind every workshop, gathering, and leadership moment.
          </h3>
          <p className="gallery-overview-text">
            The gallery captures the atmosphere of ProWIFETA in practice, from shared
            learning sessions to moments of community, visibility, and celebration,
            including the latest Edwenase event photo update.
          </p>
        </div>

        <div className="gallery-overview-stats">
          <div className="gallery-overview-stat">
            <strong>{ALL_PHOTOS.length}+</strong>
            <span>images in the archive</span>
          </div>
          <div className="gallery-overview-stat">
            <strong>Live</strong>
            <span>auto-rotating visual showcase</span>
          </div>
          <div className="gallery-overview-stat">
            <strong>Real</strong>
            <span>community and event moments</span>
          </div>
        </div>

        <div className="gallery-storyboard" aria-hidden="true">
          {STORYBOARD_INDICES.map((index) => (
            <div key={index} className="gallery-storyboard-tile">
              <img
                src={ALL_PHOTOS[index].src}
                alt=""
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="gallery-stage-card">
        <div className="gallery-stage-head">
          <div>
            <p className="gallery-stage-kicker">Featured moment</p>
            <h3 className="gallery-stage-title">
              Leadership, learning, and community captured in motion.
            </h3>
          </div>
          <div className="gallery-stage-counter">
            {currentImageIndex + 1} / {ALL_PHOTOS.length}
          </div>
        </div>

        <div className="gallery-frame">
          <img
            key={currentImageIndex}
            src={ALL_PHOTOS[currentImageIndex].src}
            alt={ALL_PHOTOS[currentImageIndex].alt}
            className="gallery-image"
          />

          <div className="gallery-frame-overlay">
            <span className={`gallery-mode-chip ${isAutoSliding ? "is-live" : ""}`}>
              {isAutoSliding ? "Autoplay on" : "Manual browse"}
            </span>

            <div className="gallery-nav" aria-label="Gallery navigation">
              <button
                type="button"
                className="gallery-nav-button"
                onClick={goToPrev}
                aria-label="Previous gallery image"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="gallery-nav-button"
                onClick={goToNext}
                aria-label="Next gallery image"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="gallery-stage-footer">
          <div className="gallery-progress-block">
            <div className="gallery-progress-copy">
              <span>Archive progress</span>
              <span>{progress}</span>
            </div>
            <div className="gallery-progress-track" aria-hidden="true">
              <span className="gallery-progress-fill" style={{ width: progress }} />
            </div>
          </div>

          <button
            type="button"
            className="gallery-auto-button"
            onClick={toggleAutoSlide}
            aria-label={isAutoSliding ? "Pause gallery slideshow" : "Play gallery slideshow"}
          >
            {isAutoSliding ? (
              <Pause size={20} aria-hidden="true" />
            ) : (
              <Play size={20} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="gallery-thumb-row">
          {visibleThumbnails.map((index) => (
            <button
              type="button"
              key={index}
              className={`gallery-thumbnail ${index === currentImageIndex ? "active" : ""}`}
              onClick={() => goToImage(index)}
              aria-label={`Go to gallery image ${index + 1}`}
            >
              <img src={ALL_PHOTOS[index].src} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
