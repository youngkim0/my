import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Footer from "~/components/Footer";
import MainReviews from "~/components/MainReviews";
import MainServices from "~/components/MainServices";
import ConsultRequestModal from "~/components/ConsultRequestModal";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

const Home = () => {
  const [topbar, setTopbar] = useState<boolean>(true);
  // const [showMore, setShowMore] = useState<boolean>(false);
  const [consultRequestModal, setConsultRequestModal] =
    useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const userInfo = api.account.getAccountByNickname.useQuery(
    {
      nickname: router.query.id ? (router.query.id as string) : "",
    },
    {
      enabled: !!router.query.id,
    },
  );

  const customerNumber = api.customer.getCustomerNumber.useQuery(
    {
      id: session?.user?.name ?? "",
    },
    {
      enabled: !!session?.user?.name,
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
          <span>{customerNumber.data}명 등록 완료</span>
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

          <div className="mt-7 flex space-x-3">
            <div
              className="flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-[#2D2D2D] text-sm font-bold text-[#2D2D2D]"
              onClick={() => setConsultRequestModal(true)}
            >
              상담하기
            </div>
            <button
              className={`flex h-10 w-1/2 cursor-pointer items-center justify-center rounded-full ${
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
