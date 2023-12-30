import Carousel from "react-multi-carousel";
import ServiceCard from "./ServiceCard";
import Image from "next/image";

const MainServices = () => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      partialVisbile={true}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024,
          },
          items: 1,
          partialVisibilityGutter: 100,
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 120,
        },
        galaxyS8: {
          breakpoint: {
            max: 360,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 50,
        },
        iPhoneSE: {
          breakpoint: {
            max: 375,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 70,
        },
        iPhonePro: {
          breakpoint: {
            max: 391,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 120,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
          partialVisibilityGutter: 170,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      <>
        <div className="flex h-[231px] w-[208px] cursor-pointer flex-col items-center justify-center rounded-xl border border-solid border-gray-100 bg-white">
          <div className="relative h-[50px] w-[50px] ">
            <Image
              src="/images/i-add.png"
              alt="review"
              fill
              quality={100}
              className="rounded-t-xl"
            />
          </div>
          <div className="line-clamp-4 px-2 py-2 leading-6 text-black">
            <p className="px-2 py-1 text-left text-base font-bold">새로 추가</p>
          </div>
        </div>
      </>
      <ServiceCard />
      <ServiceCard />
      <ServiceCard />
    </Carousel>
  );
};

export default MainServices;
