import Image from "next/image";
import ReviewModal from "./ReviewModal";
import { useState } from "react";

const ReviewCard = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  return (
    <>
      {showDetail && <ReviewModal open={showDetail} setOpen={setShowDetail} />}
      <div
        className="flex h-[100px] w-full cursor-pointer  flex-row border border-solid border-gray-100 shadow-xl"
        onClick={() => setShowDetail(true)}
      >
        <div className="relative h-[100px] w-[100px] rounded-full">
          <Image
            src="/images/sample_hair.png"
            alt="review"
            fill
            quality={100}
          />
        </div>
        <div className="line-clamp-4 h-[90px] flex-1 px-2 leading-6 text-black">
          <div className="py-2 text-sm">
            이 미용실은 정말로 최고예요! 전문적이고 친절한 스태프들이 항상
            웃음으로 맞이해줍니다. 최신 트렌드에 맞춘 스타일링에 정말 만족했고,
            특히 손님을 위한 세심한 배려가 눈에 띕니다. 깨끗하고 아늑한 분위기도
            좋아 자주 방문하게 되었어요. 다양한 서비스와 훌륭한 경험을
            제공해주셔서 감사합니다!
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
