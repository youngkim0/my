/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "~/components/Footer";
import MainReviews from "~/components/MainReviews";
import MainServices from "~/components/MainServices";
import ConsultRequestModal from "~/components/ConsultRequestModal";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { signOut, useSession } from "next-auth/react";
import EditServiceModal from "~/components/EditServiceModal";

const Home = () => {
  const [topbar, setTopbar] = useState<boolean>(true);
  // const [showMore, setShowMore] = useState<boolean>(false);
  const [consultRequestModal, setConsultRequestModal] =
    useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();
  const [openServiceModal, setOpenServiceModal] = useState<boolean>(false);

  const userInfo = api.account.getAccountByNickname.useQuery(
    {
      nickname: router.query.id ? (router.query.id as string) : "",
    },
    {
      enabled: !!router.query.id,
    },
  );

  const customerNumber = api.customer.getCustomerNumerByNickname.useQuery(
    {
      nickname: router.query.id ? (router.query.id as string) : "",
    },
    {
      enabled: !!router.query.id,
    },
  );

  const serviceList = api.account.getAllServices.useQuery(
    {
      userID: router.query.id ? (router.query.id as string) : "",
    },
    {
      enabled: !!router.query.id,
    },
  );

  if (!userInfo.data || !serviceList.data) return <></>;

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
          <span onClick={() => void signOut()}>
            {customerNumber.data}명 등록 완료
          </span>
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
          <div className="flex flex-row items-center space-x-5">
            <div
              style={{ backgroundImage: `url(${userInfo.data.image})` }}
              className="h-[100px] w-[100px] rounded-full bg-cover bg-center"
            ></div>

            <div className="relative ">
              <p className="text-lg">{userInfo.data.name}</p>
              <p className="pt-1 text-sm text-[#A3A3A3]">
                {userInfo.data.store}
              </p>
              <div className="mt-3 flex flex-row items-center">
                {userInfo.data.instagram && (
                  <Link
                    className="relative h-9 w-9"
                    href={userInfo.data.instagram}
                    target="_blank"
                  >
                    <Image src="/images/instagram.png" fill alt="instagram" />
                  </Link>
                )}
                {userInfo.data.youtube && (
                  <Link
                    className="relative ml-4 h-5 w-7"
                    href={userInfo.data.youtube}
                    target="_blank"
                  >
                    <Image
                      src="/images/youtube2.png"
                      fill
                      alt="youtube"
                      unoptimized={true}
                    />
                  </Link>
                )}
                {userInfo.data.blog && (
                  <Link
                    className="relative ml-4 h-7 w-8"
                    href={userInfo.data.blog}
                    target="_blank"
                  >
                    <Image
                      src="/images/blog.png"
                      fill
                      alt="blog"
                      quality={100}
                      unoptimized={true}
                    />
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

          <div className="mb-2 mt-7 flex space-x-3">
            <div
              className="flex h-12 w-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-[#2D2D2D] text-sm font-bold text-[#2D2D2D]"
              onClick={() => setConsultRequestModal(true)}
            >
              상담하기
            </div>
            <button
              className={`flex h-12 w-1/2 cursor-pointer items-center justify-center rounded-full ${
                userInfo.data.naverPlace !== "" &&
                userInfo.data.naverPlace !== null
                  ? "bg-[#2D2D2D]"
                  : "bg-gray-400"
              } text-sm text-white`}
              disabled={
                userInfo.data.naverPlace === "" || !userInfo.data.naverPlace
              }
              onClick={(e) => {
                e.preventDefault();
                if (userInfo.data?.naverPlace)
                  void router.push(userInfo.data.naverPlace);
              }}
            >
              예약하기
            </button>
          </div>
        </div>

        {openServiceModal && (
          <EditServiceModal
            open={openServiceModal}
            setOpen={setOpenServiceModal}
            userNickname={router.query.id ? (router.query.id as string) : ""}
          />
        )}
        <div className="my-12">
          <div className="mb-4 text-lg font-bold">고객 리뷰</div>
          <MainReviews id={router.query.id as string} />
          <div className="mb-4 mt-12 flex flex-row items-center space-x-8 text-lg font-bold">
            <span>시그니쳐 시술</span>
            {session?.user.nickname === router.query.id && (
              <span
                className="cursor-pointer text-sm font-semibold text-blue-700"
                onClick={() => setOpenServiceModal(true)}
              >
                새로 추가
              </span>
            )}
          </div>
          <MainServices
            services={serviceList.data}
            owner={session?.user.nickname === router.query.id}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
