import React, { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import Img1 from "../../../assets/hero-carousel/img1.jpg";
import Img2 from "../../../assets/hero-carousel/img2.jpg";
import Img3 from "../../../assets/hero-carousel/img3.jpg";
import Img4 from "../../../assets/hero-carousel/img4.jpg";

const BlogsHero = () => {
  const swiperRef = useRef(null);

  const handleThumbnailClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:gap-14 gap-8 p-6 md:p-10 bg-[#FDF3D6]">
      {/* Text Section */}
      <div className="md:w-1/4 w-full text-center md:text-left bg-white p-6 shadow-lg rounded-lg h-auto">
        <h1 className="md:text-6xl text-4xl font-extrabold leading-tight text-[#0E1F3B]">
          Discover the Latest Trends in Fashion
        </h1>
        <p className="py-6 text-lg text-[#4D7CbF]">
          Stay up to date with our fashion blog, featuring the best looks from
          runway shows, celebrity fashion, and more! Dive into style
          inspiration, fashion tips, and trends shaping the fashion world today.
        </p>
        <button className="mt-4 bg-[#F5B195] text-[#0E1F3B] py-3 px-6 rounded-lg text-lg font-medium hover:bg-[#CFE1F4] hover:text-[#F5B195] hover:scale-105 transition-transform duration-300">
          Explore Now
        </button>
      </div>

      {/* Refined Image Carousel Section */}
      <div className="md:w-2/3 w-full mx-auto shadow-lg rounded-lg overflow-hidden bg-[#CFE1F4]">
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            type: "fraction",
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="rounded-lg"
          effect="fade" // Smooth fade transition
        >
          {[Img1, Img2, Img3, Img4].map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={image}
                  alt={`Fashion Image ${index + 1}`}
                  className="w-full object-cover lg:h-[420px] sm:h-96 h-80 transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1F3B] to-transparent opacity-30"></div>
              </div>
            </SwiperSlide>
          ))}

          {/* Custom Navigation Arrows */}
          <div
            className="swiper-button-prev text-[#0E1F3B] bg-[#F5B195] rounded-full p-3 absolute top-1/2 left-0 transform -translate-y-1/2 z-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            &lt;
          </div>
          <div
            className="swiper-button-next text-[#0E1F3B] bg-[#F5B195] rounded-full p-3 absolute top-1/2 right-0 transform -translate-y-1/2 z-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            &gt;
          </div>
        </Swiper>

        {/* Carousel Thumbnails */}
        <div className="flex justify-center mt-4">
          {[Img1, Img2, Img3, Img4].map((image, index) => (
            <div
              key={index}
              className="w-16 h-16 mx-2 rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleThumbnailClick(index)} // Trigger slide change when thumbnail is clicked
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogsHero;
