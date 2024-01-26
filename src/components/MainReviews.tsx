import Carousel from "react-multi-carousel";

import { api } from "~/utils/api";
import { useState } from "react";
import ReviewModal from "./ReviewModal";


const MainReviews = ({ id }: { id: string }) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [detailID, setDetailID] = useState<string>("");

  const reviewList = api.account.getAllReviews.useQuery({
    userID: id,
  });

  if (!reviewList.data) return <></>;

  if (reviewList.data.length === 0)
    return (
      <div className="flex h-[96px] w-[298px] cursor-pointer flex-row rounded-xl border border-solid border-gray-100 bg-white">
        <div className="my-2 line-clamp-4 h-[70px] flex-1 px-2 leading-6 text-black">
          <div className="py-2 text-xs">첫 리뷰를 등록해주세요!</div>
        </div>
      </div>
    );

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
      partialVisible={reviewList.data.length > 1 ? true : false}
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
          partialVisibilityGutter: 50,
        },
        galaxyS8: {
          breakpoint: {
            max: 360,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 2,
        },
        iPhoneSE: {
          breakpoint: {
            max: 375,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 5,
        },
        iPhonePro: {
          breakpoint: {
            max: 391,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 20,
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464,
          },
          items: 1,
          partialVisibilityGutter: 80,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {reviewList.data?.map((review) => (
        <>
          {showDetail && (
            <ReviewModal
              open={showDetail}
              setOpen={setShowDetail}
              reviewID={detailID}
            />
          )}
          <div
            className="flex h-[96px] w-[298px] cursor-pointer flex-row rounded-xl border border-solid border-gray-100 bg-white"
            onClick={() => {
              setDetailID(review.id);
              setShowDetail(true);
            }}
          >
            <div
              className="h-[96px] w-[101px] rounded-l-xl"
              style={{
                backgroundImage: `url(${review.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="my-2 line-clamp-4 h-[70px] flex-1 px-2 leading-6 text-black">
              <div className="py-2 text-xs">{review.review}</div>
            </div>
          </div>
        </>
      ))}
    </Carousel>
  );
};

export default MainReviews;
