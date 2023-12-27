import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "~/components/Footer";
import MainReviews from "~/components/MainReviews";
import MainServices from "~/components/MainServices";
import ConsultRequestModal from "~/components/ConsultRequestModal";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const Home = () => {
  const [topbar, setTopbar] = useState<boolean>(true);
  // const [showMore, setShowMore] = useState<boolean>(false);
  const [consultRequestModal, setConsultRequestModal] =
    useState<boolean>(false);
  const router = useRouter();

  const userInfo = api.account.getAccountByNickname.useQuery(
    {
      nickname: router.query.id ? (router.query.id as string) : "",
    },
    {
      enabled: !!router.query.id,
    },
  );

  if (!userInfo.data) return <></>;

  return (
    <div className="mx-auto max-w-md">
      {consultRequestModal && (
        <ConsultRequestModal
          open={consultRequestModal}
          setOpen={setConsultRequestModal}
        />
      )}
      {topbar && (
        <div className="relative flex h-8 flex-row items-center justify-center bg-[#2D2D2D] text-sm text-white">
          <span>96명 등록 완료</span>
          <span
            className="absolute right-5 top-1 cursor-pointer"
            onClick={() => setTopbar(false)}
          >
            x
          </span>
        </div>
      )}

      <div className="mb-5 mt-12 px-6 font-bold">프로필</div>
      <div className="px-6">
        {/* <div className="mt-16 cursor-pointer text-end text-sm text-blue-700">
          <Link href="/my">마이페이지</Link>
        </div> */}
        <div className="relative rounded-xl bg-white px-5 py-5">
          <Link href="/my/edit">
            <span className="absolute right-4 top-3 cursor-pointer text-sm text-blue-800">
              수정하기
            </span>
          </Link>
          <div className="flex flex-row items-center space-x-5">
            <Image
              src={userInfo.data.image!}
              alt=""
              width={100}
              height={100}
              className="rounded-full"
            />
            <div className="relative w-full">
              <p className="text-lg">{userInfo.data.name}</p>
              <p className="pt-1 text-sm text-[#A3A3A3]">
                {userInfo.data.store}
              </p>
              <div className="mt-3 flex flex-row">
                {userInfo.data.instagram && (
                  <Link
                    className="relative h-7 w-9"
                    href={userInfo.data.instagram}
                    target="_blank"
                  >
                    <Image src="/images/instagram.png" fill alt="instagram" />
                  </Link>
                )}
                {userInfo.data.blog && (
                  <Link
                    className="relative ml-3 h-7 w-7"
                    href={userInfo.data.blog}
                    target="_blank"
                  >
                    <Image src="/images/blog.png" fill alt="blog" />
                  </Link>
                )}
                {userInfo.data.youtube && (
                  <Link
                    className="relative ml-4 h-7 w-7"
                    href={userInfo.data.youtube}
                    target="_blank"
                  >
                    <Image src="/images/youtube2.png" fill alt="youtube" />
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div
            className={`mt-5 
              cursor-pointer break-keep text-sm leading-6`}
          >
            {userInfo.data.description}
          </div>
          {/* {!showMore && (
            <div
              className="mt-2 cursor-pointer text-center text-sm text-blue-500"
              onClick={() => setShowMore(true)}
            >
              더보기
            </div>
          )} */}
          <div className="mt-7 flex space-x-3">
            <div
              className="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-[#2D2D2D] text-sm font-bold text-[#2D2D2D]"
              onClick={() => setConsultRequestModal(true)}
            >
              상담하기
            </div>
            <div className="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-full bg-[#2D2D2D] text-sm text-white">
              예약하기
            </div>
          </div>
        </div>
        <div className="my-12">
          <div className="mb-4 text-lg font-bold">고객 리뷰</div>
          <MainReviews />
          <div className="mb-4 mt-12 text-lg font-bold">시그니쳐 시술</div>
          <MainServices />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;