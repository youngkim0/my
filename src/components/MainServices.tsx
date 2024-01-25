import Carousel from "react-multi-carousel";
import ServiceCard from "./ServiceCard";
import type { Service } from "@prisma/client";
import { Fragment } from "react";

const MainServices = ({
  services,
  owner,
}: {
  services: Service[];
  owner: boolean;
}) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      partialVisible={services.length > 1 ? true : false}
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
      {services.map((service) => (
        <Fragment key={service.id}>
          <ServiceCard service={service} owner={owner} />
        </Fragment>
      ))}
    </Carousel>
  );
};

export default MainServices;
