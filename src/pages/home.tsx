import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "~/components/Footer";
import MainReviews from "~/components/MainReviews";
import MainServices from "~/components/MainServices";
import ConsultRequestModal from "~/components/ConsultRequestModal";

const Home = () => {
  const [topbar, setTopbar] = useState<boolean>(true);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [consultRequestModal, setConsultRequestModal] =
    useState<boolean>(false);

  return (
    <div className="mx-auto max-w-md">
      {consultRequestModal && (
        <ConsultRequestModal
          open={consultRequestModal}
          setOpen={setConsultRequestModal}
        />
      )}
      {topbar && (
        <div className="relative flex h-8 flex-row items-center justify-center bg-purple-500 text-sm text-white">
          <span>96명 등록 완료</span>
          <span
            className="absolute right-5 top-1 cursor-pointer"
            onClick={() => setTopbar(false)}
          >
            x
          </span>
        </div>
      )}

      <div className="px-6">
        <div className="mt-16 cursor-pointer text-end text-sm text-blue-700">
          <Link href="/my">마이페이지</Link>
        </div>
        <div className="flex flex-row items-center space-x-5">
          <Image
            src="/images/avatar_sample.jpeg"
            alt=""
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="relative w-full">
            <p className="text-lg">김재원 대표원장</p>
            <p className="pt-1 text-sm text-gray-500">압구정 헤어센터</p>
            <div className="mt-3 flex flex-row">
              <Link
                className="relative h-7 w-9"
                href="https://instagram.com"
                target="_blank"
              >
                <Image src="/images/instagram.png" fill alt="instagram" />
              </Link>
              <Link
                className="relative ml-3 h-7 w-7"
                href="https://blog.naver.com"
                target="_blank"
              >
                <Image src="/images/blog.png" fill alt="blog" />
              </Link>
              <Link
                className="relative ml-4 h-7 w-7"
                href="https://youtube.com"
                target="_blank"
              >
                <Image src="/images/youtube2.png" fill alt="youtube" />
              </Link>
            </div>
          </div>
        </div>
        <div
          className={`mt-5 ${
            showMore ? "" : "line-clamp-2"
          }  cursor-pointer break-keep text-sm leading-6`}
          onClick={() => setShowMore(!showMore)}
        >
          안녕하세요! 저는 열정적인 미용사로, 고객들에게 아름다움과 자신감을
          선사하는 것을 사명으로 삼고 있습니다. 새로운 트렌드와 기술에 끊임없이
          열정을 쏟아, 최상의 서비스를 제공하고자 노력하고 있어요. 당신의
          아름다움을 더 빛나게 해드릴 기회를 기대하고 있어요!
        </div>
        {!showMore && (
          <div
            className="mt-2 cursor-pointer text-center text-sm text-blue-500"
            onClick={() => setShowMore(true)}
          >
            더보기
          </div>
        )}
        <div className="mt-7 flex space-x-3">
          <div
            className="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-2xl border border-solid border-purple-700 text-sm text-purple-700"
            onClick={() => setConsultRequestModal(true)}
          >
            상담하기
          </div>
          <div className="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-2xl bg-purple-700 text-sm text-white">
            예약하기
          </div>
        </div>
        <div className="my-16">
          <div className="mb-4 text-lg font-bold">리뷰</div>
          <MainReviews />
          <div className="mb-4 mt-8 text-lg font-bold">시그니쳐 시술</div>
          <MainServices />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
