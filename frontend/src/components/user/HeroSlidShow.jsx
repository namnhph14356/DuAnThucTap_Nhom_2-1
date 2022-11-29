import React, { useState, useEffect, useRef } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { getLatestUploads } from "../../api/movie";
import { useNotification } from "../../hooks";

let count = 0;
let intervalId;
export default function HeroSlidShow() {
  const [currentSlide, setCurrentSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const slideRef = useRef();
  const clonedSlideRef = useRef();

  const { updateNotification } = useNotification();

  const fetchLatesUPloads = async () => {
    const { error, movies } = await getLatestUploads();
    if (error) return updateNotification("error", error);

    setSlides([...movies]);
    setCurrentSlide(movies[0]);
  };

  const startSlideShow = () => {
    intervalId = setInterval(handleOnNextClick, 3500);
  };

  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };

  const handleOnNextClick = () => {
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");
  };

  const handleOnPrevClick = () => {
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    console.log(count);
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
  };

  const handleAnimationEnd = () => {
    const classes = [
      "slide-out-to-left",
      "slide-in-from-right",
      "slide-out-to-right",
      "slide-in-from-left",
    ];
    slideRef.current.classList.remove(...classes);
    clonedSlideRef.current.classList.remove(...classes);
    setClonedSlide({});
  };

  useEffect(() => {
    fetchLatesUPloads();

    return () => {
      pauseSlideShow();
    };
  }, []);

  useEffect(() => {
    if (slides.length) startSlideShow();
  }, [slides.length]);
  return (
    <div className="w-full flex">
      <div className="w-4/5 aspect-video relative overflow-hidden">
        <img
          onAnimationEnd={handleAnimationEnd}
          ref={slideRef}
          className="aspect-video object-cover"
          src={currentSlide.poster}
          alt=""
        />
        <img
          onAnimationEnd={handleAnimationEnd}
          ref={clonedSlideRef}
          className="aspect-video object-cover absolute inset-0"
          src={clonedSlide.poster}
          alt=""
        />
        <SlideShowController
          onNextClick={handleOnNextClick}
          onPrevClick={handleOnPrevClick}
        />
      </div>
      <div className="w-1/5 aspect-video bg-red-300"></div>
    </div>
  );
}

const SlideShowController = ({ onNextClick, onPrevClick }) => {
  const btnClass =
    "bg-primary border-white rounded border-2 text-white text-xl p-2 outline-none";
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
      <button onClick={onPrevClick} className={btnClass} type="button">
        <AiOutlineDoubleLeft />
      </button>
      <button onClick={onNextClick} className={btnClass} type="button">
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};
