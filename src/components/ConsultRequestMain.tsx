import type { Dispatch, SetStateAction } from "react";

const ConsultRequestMain = ({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <div className="text-base">
        <div className="mb-2 font-bold">* 등록된 고객만 상담 가능합니다.</div>
        <div>고객님 이름</div>
        <input
          type="text"
          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
        />

        <div className="mt-3">전화번호 마지막 4자리</div>
        <input
          type="text"
          className="mt-2 w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>

      <div className="mt-4 flex flex-row space-x-3">
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setPage("check")}
        >
          답변확인
        </button>
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setPage("request")}
        >
          상담신청
        </button>
      </div>
    </>
  );
};

export default ConsultRequestMain;
