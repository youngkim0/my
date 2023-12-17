import { useState } from "react";
import ConsultModal from "./ConsultModal";
import MemoModal from "./MemoModal";

const ConsultCard = ({ type }: { type: string }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {type === "done" ? (
        <MemoModal open={open} setOpen={setOpen} />
      ) : (
        <ConsultModal open={open} setOpen={setOpen} />
      )}
      <div
        className={`w-full cursor-pointer rounded-lg ${
          type === "done" ? "bg-gray-500" : "bg-blue-900"
        } px-4 py-3 text-sm text-white`}
        onClick={() => setOpen(true)}
      >
        <div className="flex space-x-2">
          <span>강영식 남</span>
          <span>|</span>
          <span>32세</span>
          <span>|</span>
          <span>상담시술: 컷</span>
        </div>
        <div className="flex space-x-2">
          <span>최근방문일: 20일전</span>
          <span>|</span>
          <span>최근시술: 펌</span>
        </div>
        <div>{type === "done" ? "답변완료 / 메모 남기기" : "답변 대기중"}</div>
      </div>
    </>
  );
};

export default ConsultCard;
