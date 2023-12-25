import Image from "next/image";
import Link from "next/link";
import ConsultCard from "~/components/ConsultCard";
import Footer from "~/components/Footer";
import { useState } from "react";
import NewCustomerModal from "~/components/NewCustomerModal";
import SearchCard from "~/components/SearchCard";
import { signOut, useSession } from "next-auth/react";

const MyPage = () => {
  const [openNewCustomerModal, setOpenNewCustomerModal] =
    useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const { data: session } = useSession();
  console.log(session);
  console.log(session?.user.kakaoID);
  return (
    <>
      {openNewCustomerModal && (
        <NewCustomerModal
          open={openNewCustomerModal}
          setOpen={setOpenNewCustomerModal}
        />
      )}

      <div className="mx-auto max-w-md">
        <div className="relative flex h-8 flex-row items-center justify-center bg-[#2d2d2d] text-sm text-white">
          <span>96명 등록 완료</span>
        </div>
        <div className="mt-10 px-6">
          <div className="mb-3 font-bold">마이페이지</div>
          <div className="rounded-xl bg-white px-5 py-5">
            <div className="flex flex-row items-center space-x-5">
              <Image
                src="/images/avatar_sample.jpeg"
                alt=""
                width={100}
                height={100}
                className="rounded-full"
                onClick={() => signOut()}
              />
              <div className="relative w-full">
                <p className="text-base">김재원 대표원장</p>
                <p className="pt-1 text-xs text-[#A3A3A3]">압구정 헤어센터</p>
                <div className="mt-5 flex flex-row text-xs">
                  <span>만료일 : </span>
                  <span className="ml-1">2023. 12. 30</span>
                  <span className="ml-3 cursor-pointer font-bold">
                    <Link href="/payment">연장하기</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-row space-x-3 text-xs text-[#a3a3a3]">
              <div className="flex w-1/2 flex-col space-y-2">
                <p className="text-xs font-semibold text-black">고객관리</p>
                <p>
                  🎂 이달 생일인 고객{" "}
                  <span className="font-bold text-black">11명</span>
                </p>
                <p>
                  ✍🏻 이달 등록된 고객{" "}
                  <span className="font-bold text-black">11명</span>
                </p>
                <p>
                  🎉 오늘 생일인 고객{" "}
                  <span className="font-bold text-black">11명</span>
                </p>
                <p>
                  📝 오늘 등록된 고객{" "}
                  <span className="font-bold text-black">11명</span>
                </p>
              </div>
              <div className="flex w-1/2 flex-col space-y-2">
                <p className="text-xs font-semibold text-black">방문경로</p>
                <p className="flex flex-row items-center space-x-2">
                  <span className="relative h-[14px] w-[14px]">
                    <Image src="/images/i-naver2.png" alt="naver" fill />
                  </span>
                  <span className="text-[#a3a3a3]">네이버</span>
                  <span className="font-bold text-black">11명</span>
                </p>
                <p className="flex flex-row items-center space-x-2">
                  <span className="relative h-[14px] w-[14px]">
                    <Image src="/images/i-instagram2.png" alt="naver" fill />
                  </span>
                  <span className="text-[#a3a3a3]">인스타그램</span>
                  <span className="font-bold text-black">11명</span>
                </p>
              </div>
            </div>
          </div>
          <div className="relative mt-8 flex space-x-2">
            <input
              type="text"
              className="focus:shadow-outline h-9 w-full rounded-lg border px-3 text-base text-gray-700 placeholder-gray-300
              placeholder:text-xs"
              placeholder="고객명을 입력해주세요"
            />
            <Image
              src="/images/i-search.png"
              alt="search"
              width={20}
              height={20}
              className="absolute right-3 top-2"
              onClick={() => setSearched(true)}
            />
          </div>
          <div className="my-5 flex justify-center">
            <button
              className="h-12 w-48 rounded-full bg-[#2d2d2d] px-3 text-sm text-white"
              onClick={() => setOpenNewCustomerModal(true)}
            >
              고객 등록하기
            </button>
          </div>
          {!searched ? (
            <>
              <div className="flex justify-center space-x-2 text-xs text-[#a2a2a2]">
                <span>
                  오늘 상담 신청:{" "}
                  <span className="font-bold text-black">8명</span>
                </span>
                <span>|</span>
                <span>
                  답변 완료: <span className="font-bold text-black">3/8명</span>
                </span>
                <span>|</span>
                <span>
                  미답변: <span className="font-bold text-black">5/8명</span>
                </span>
              </div>

              <div className="mb-12 mt-3 flex flex-col space-y-2">
                <ConsultCard type="" />
                <ConsultCard type="" />

                <ConsultCard type="done" />
                <ConsultCard type="done" />
              </div>
            </>
          ) : (
            <div className="mb-16 flex flex-col space-y-3">
              <SearchCard />
              <SearchCard />
              <SearchCard />
              <SearchCard />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MyPage;
