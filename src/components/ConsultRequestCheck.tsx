import type { Dispatch, SetStateAction } from "react";

const ConsultRequestCheck = ({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <>
      <div className="text-base">
        <div className="mb-2 font-bold">
          * 바쁠 경우 답변이 늦을 수 있습니다.
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col items-center justify-center bg-blue-800 py-3 text-white">
            <div className="text-lg">2023-12-07 대기</div>
            <div className="text-sm">리뷰 작성 대기</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-600 py-3 text-white">
            <div className="text-lg">2023-11-29 완료</div>
            <div className="text-sm">리뷰 작성 완료</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-600 py-3 text-white">
            <div className="text-lg">2023-11-11 완료</div>
            <div className="text-sm">리뷰 작성 완료</div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-600 py-3 text-white">
            <div className="text-lg">2023-11-07 완료</div>
            <div className="text-sm">리뷰 작성 완료</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-row space-x-3">
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setPage("main")}
        >
          뒤로가기
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

export default ConsultRequestCheck;
