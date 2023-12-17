import Image from "next/image";
import { useState } from "react";
import ServiceModal from "./ServiceModal";

const ServiceCard = () => {
  const [showDetail, setShowDetail] = useState<boolean>(false);
  return (
    <>
      <ServiceModal open={showDetail} setOpen={setShowDetail} />
      <div
        className="flex h-[330px] w-[280px] cursor-pointer flex-col items-center border border-solid border-gray-100 shadow-lg"
        onClick={() => setShowDetail(true)}
      >
        <div className="relative h-2/3 w-full rounded-full">
          <Image src="/images/hair1.jpg" alt="review" fill quality={100} />
        </div>
        <div className="line-clamp-4 px-2 py-2 leading-6 text-black">
          <p className="py-2 text-center text-base font-bold">
            레이어드컷&매직셋팅
          </p>
          <div className="py-2 text-sm">
            레이어드컷은 다차원적이고 부드러운 미감을 부여해주는 스타일링
            기법으로, 풍성하면서도 세련된 룩을 연출합니다.
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
