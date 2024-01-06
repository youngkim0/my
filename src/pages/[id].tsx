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

      <div className="mb-3 mt-12 px-6 font-bold">프로필</div>
      <div className="px-[26px]">
        {/* <div className="mt-16 cursor-pointer text-end text-sm text-blue-700">
          <Link href="/my">마이페이지</Link>
        </div> */}
        <div className="relative rounded-xl bg-white px-[21px] py-[24px]">
          <div className="flex flex-row  space-x-5">
            <div
              style={{ backgroundImage: `url(${userInfo.data.image})` }}
              className="h-[80px] w-[80px] rounded-full bg-cover bg-center"
            ></div>

            <div className="relative ">
              <p className="text-base font-semibold">{userInfo.data.name}</p>
              <p className="pt-[5px] text-sm text-[#A3A3A3]">
                {userInfo.data.store}
              </p>
              <div className="mt-[10px] flex flex-row items-center">
                {userInfo.data.instagram && (
                  <div
                    className="relative ml-1 h-[18.8px] w-[18.8px] cursor-pointer bg-[url('/images/instagram.svg')] bg-cover bg-center"
                    onClick={() => {
                      window.open(userInfo.data!.instagram!, "_blank");
                    }}
                  ></div>
                )}
                {userInfo.data.youtube && (
                  <div
                    className="relative ml-4 h-[12.5px] w-[17.7px] cursor-pointer bg-[url('/images/youtube.svg')] bg-cover bg-center"
                    onClick={() => {
                      window.open(userInfo.data!.youtube!, "_blank");
                    }}
                  ></div>
                )}
                {userInfo.data.blog && (
                  <div
                    className="relative ml-3 h-[29px] w-[29px] cursor-pointer bg-[url('/images/blog.svg')] bg-cover bg-center"
                    onClick={() => {
                      window.open(userInfo.data!.blog!, "_blank");
                    }}
                  ></div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`cursor-pointer 
              break-keep pt-[18px] text-sm leading-6`}
          >
            {userInfo.data.description}
          </div>

          <div className="mb-2 mt-[23px] flex space-x-3">
            <div
              className="flex h-[47px] w-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-[#2D2D2D] text-sm font-bold text-[#2D2D2D]"
              onClick={() => setConsultRequestModal(true)}
            >
              상담하기
            </div>
            <button
              className={`flex h-[47px] w-1/2 cursor-pointer items-center justify-center rounded-full font-bold ${
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
          <div className="mb-1 text-base font-bold">고객 리뷰</div>
          <MainReviews id={router.query.id as string} />
          <div className="mb-1 mt-12 flex flex-row items-center space-x-8 text-base font-bold">
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
