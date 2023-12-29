import Image from "next/image";
import { useState } from "react";
import ServiceModal from "./ServiceModal";

const ServiceCard = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  return (
    <>
      <ServiceModal open={showDetail} setOpen={setShowDetail} />
      <div
        className="flex h-[231px] w-[208px] cursor-pointer flex-col items-center rounded-xl border border-solid border-gray-100 bg-white"
        onClick={() => setShowDetail(true)}
      >
        <div className="relative h-[123px] w-full ">
          <Image
            src="/images/hair1.jpg"
            alt="review"
            fill
            quality={100}
            className="rounded-t-xl"
          />
        </div>
        <div className="line-clamp-4 px-2 py-2 leading-6 text-black">
          <p className="px-2 py-1 text-left text-base font-bold">
            레이어드컷&매직셋팅
          </p>
          <div className="line-clamp-3 px-2 text-xs">
            레이어드컷은 다차원적이고 부드러운 미감을 부여해주는 스타일링
            기법으로, 풍성하면서도 세련된 룩을 연출합니다.
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
