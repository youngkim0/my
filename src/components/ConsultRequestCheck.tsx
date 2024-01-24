import { format } from "date-fns";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { api } from "~/utils/api";
import NewReviewModal from "./NewReviewModal";

const ConsultRequestCheck = ({
  setPage,
  userInfo,
}: {
  setPage: Dispatch<SetStateAction<string>>;
  userInfo: { name: string; phone: string; clientID: string; userID: string };
}) => {
  const consultList = api.customer.getCustomerConsultListForCustomer.useQuery({
    userID: userInfo.userID,
    clientID: userInfo.clientID,
  });

  const [review, setReview] = useState(false);
  const [consultID, setConsultID] = useState<string>("");
  console.log(consultList.data);
  console.log(userInfo.userID);

  if (!consultList.data) return <></>;
  if (review) {
    return (
      <NewReviewModal
        open={review}
        setOpen={setReview}
        customerName={userInfo.name}
        consult={consultList.data.find((a) => a.id === consultID)!}
      />
    );
  }

  return (
    <>
      <div className="text-base">
        <div className="mb-2 font-bold">
          * 바쁠 경우 답변이 늦을 수 있습니다.
        </div>
        <div className="flex flex-col space-y-3">
          {consultList.data?.map((consult) => (
            <div
              className={`flex flex-col items-center justify-center py-3 text-white ${
                consult.replied ? "bg-gray-500" : "bg-blue-700"
              }`}
              key={consult.id}
              onClick={() => {
                if (consult.replied && !consult.reviewed) {
                  setReview(true);
                  setConsultID(consult.id);
                }
              }}
            >
              <div className="text-lg">
                {format(new Date(consult.createdAt), "yyyy-MM-dd")}{" "}
                {consult.replied ? "완료" : "대기"}
              </div>
              <div className="text-sm">
                리뷰 작성 {consult.reviewed ? "완료" : "대기"}
              </div>
            </div>
          ))}

          {/* <div className="flex flex-col items-center justify-center bg-gray-600 py-3 text-white">
            <div className="text-lg">2023-11-07 완료</div>
            <div className="text-sm">리뷰 작성 완료</div>
          </div> */}
        </div>
      </div>

      <div className="mt-4 flex flex-row space-x-3">
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-full bg-gray-800 px-3 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => setPage("main")}
        >
          뒤로가기
        </button>
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-full border border-solid border-[#2d2d2d] px-3 py-3 text-sm font-semibold text-[#2d2d2d]"
          onClick={() => setPage("request")}
        >
          상담신청
        </button>
      </div>
    </>
  );
};

export default ConsultRequestCheck;
