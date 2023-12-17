import Image from "next/image";
import Link from "next/link";

const MyPage = () => {
  return (
    <div className="mx-auto max-w-md">
      <div className="relative flex h-8 flex-row items-center justify-center bg-purple-500 text-sm text-white">
        <span>96명 등록 완료</span>
      </div>
      <div className="mt-10 px-6">
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
          </div>
        </div>
        <div className="mt-6 flex flex-row">
          <span>만료일: </span>
          <span className="ml-2 text-red-800">2023. 12. 30</span>
          <span className="ml-8 cursor-pointer text-blue-800">
            <Link href="/payment">연장하기</Link>
          </span>
        </div>
        <div className="mt-6 flex flex-col space-y-2 text-sm text-gray-600">
          <div className="flex flex-row space-x-1">
            <span className="w-1/2">이달 생일인 고객: 20명</span>
            <span className="w-1/2">오늘 생일인 고객: 1명</span>
          </div>
          <div className="flex flex-row space-x-1">
            <span className="w-1/2">이달 등록된 고객: 11명</span>
            <span className="w-1/2">오늘 등록된 고객: 3명</span>
          </div>
        </div>
        <div className="mt-8 flex space-x-2">
          <input
            type="text"
            className="focus:shadow-outline h-10 w-full rounded-lg border px-3 text-base text-gray-700 placeholder-gray-300"
            placeholder="고객 검색"
          />
          <button className="h-10 w-20 rounded-lg bg-blue-500 px-3 text-base text-white">
            검색
          </button>
        </div>
        <div className="mt-8">
          <button className="h-10 w-full rounded-full bg-purple-500 px-3 text-base text-white">
            고객 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
