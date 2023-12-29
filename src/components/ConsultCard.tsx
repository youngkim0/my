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
          type === "done" ? "bg-[#2d2d2d] text-white" : "bg-white text-black"
        } relative flex flex-col space-y-1 px-4 py-3 text-sm`}
        onClick={() => setOpen(true)}
      >
        <div
          className={`absolute right-3 top-4 text-right ${
            type === "done" ? "text-[#808DD0]" : "text-[#a2a2a2]"
          }`}
        >
          <p className="mb-1">{type === "done" ? "답변완료" : "답변 대기중"}</p>
          {type === "done" && "메모남기기"}
        </div>
        <div className="flex space-x-2">
          <span>강영식</span>
          <span>|</span>
          <span>남</span>
          <span>|</span>
          <span>32세</span>
          <span>|</span>
        </div>
        <div className="flex space-x-2">
          <span>상담시술: 컷</span>
          <span>|</span>
          <span>최근시술: 펌</span>
        </div>
        <div className="flex space-x-2">
          <div>최근방문일: 20일전</div>
        </div>
      </div>
    </>
  );
};

export default ConsultCard;
