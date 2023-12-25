import Image from "next/image";
import Link from "next/link";
import Footer from "~/components/Footer";
import { useState } from "react";
import NewCustomerModal from "~/components/NewCustomerModal";

const MyPage = () => {
  const [openNewCustomerModal, setOpenNewCustomerModal] =
    useState<boolean>(false);

  return (
    <div className="">
      {openNewCustomerModal && (
        <NewCustomerModal
          open={openNewCustomerModal}
          setOpen={setOpenNewCustomerModal}
        />
      )}

      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <div className="relative flex h-8 flex-row items-center justify-center bg-[#2d2d2d] text-sm text-white">
          <span>96명 등록 완료</span>
        </div>
        <div className="mt-10 px-6">
          <div className="mb-3 font-bold">마이페이지</div>
          <div className="rounded-xl bg-white px-5 py-5">
            <div className="flex flex-col items-center space-x-5">
              <Image
                src="/images/avatar_sample.jpeg"
                alt=""
                width={100}
                height={100}
                className="rounded-full"
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
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
