import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";

const ConsultRequestRequest = ({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="px-3">
      <div className="text-sm">
        <div className="mt-7 text-lg font-bold tracking-wide">
          강연식님을 위해 최선을 다 하겠습니다.
        </div>
        <div className="mb-1 mt-4 font-bold">마지막 상담일</div>
        <div>2023년 12월 3일</div>
        <div className="mb-1 mt-6 font-bold">마지막 시술 상담 </div>
        <div>컷트 & 클리닉</div>
        <div className="mb-1 mt-2 mt-6 font-bold">상담 시술</div>
        <div>컷트</div>
      </div>
      <div className="mt-6">
        <p className="mb-3 text-base font-bold">현재 스타일</p>
        <div className="flex flex-row space-x-3">
          <div className="flex h-52 w-52 flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-20 w-20 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-center">정면</span>
          </div>
          <div className="flex h-52 w-52 flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-20 w-20 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-center">측면</span>
          </div>
        </div>
      </div>
      <div>
        <p className="my-3 text-base">원하는 스타일</p>
        <div className="flex flex-row items-center space-x-3">
          <div className="flex h-52 w-52 flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-20 w-20 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-center">정면</span>
          </div>
          <div className="flex h-52 w-52 flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-20 w-20 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-center">측면</span>
          </div>
        </div>
      </div>
      <TextareaAutosize
        minRows={4}
        className="mt-3 w-full resize-none border border-solid border-gray-300 px-2 py-2"
        placeholder="내용을 입력해주세요."
      />
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => setPage("main")}
        >
          저장
        </button>
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
          onClick={() => setPage("check")}
        >
          상담확인
        </button>
      </div>
    </div>
  );
};

export default ConsultRequestRequest;
