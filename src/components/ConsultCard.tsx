import { useState } from "react";
import ConsultModal from "./ConsultModal";
import MemoModal from "./MemoModal";
import type { ClientConsult } from "@prisma/client";
import { api } from "~/utils/api";

const ConsultCard = ({ consult }: { consult: ClientConsult }) => {
  const [open, setOpen] = useState<boolean>(false);
  const customerInfo = api.customer.getCustomerInfo.useQuery(
    {
      id: consult.clientID,
    },
    {
      enabled: !!consult.clientID,
    },
  );

  if (!customerInfo.data) return <></>;

  return (
    <>
      {consult.replied ? (
        <MemoModal
          open={open}
          setOpen={setOpen}
          customerInfo={customerInfo.data}
        />
      ) : (
        <ConsultModal
          open={open}
          setOpen={setOpen}
          customerName={customerInfo.data.name}
          consult={consult}
        />
      )}
      <div
        className={`w-full cursor-pointer rounded-lg ${
          consult.replied ? "bg-[#2d2d2d] text-white" : "bg-white text-black"
        } relative flex flex-col space-y-1 px-4 py-3 text-sm`}
        onClick={() => setOpen(true)}
      >
        <div
          className={`absolute right-3 top-4 text-right ${
            consult.replied ? "text-[#808DD0]" : "text-[#a2a2a2]"
          }`}
        >
          <p className="mb-1">{consult.replied ? "답변완료" : "답변 대기중"}</p>
          {consult.replied && "메모남기기"}
        </div>
        <div className="flex space-x-2">
          <span>{customerInfo.data.name}</span>
          <span>|</span>
          <span>{customerInfo.data.gender}</span>
          <span>|</span>
          <span>
            {new Date().getFullYear() -
              parseInt(customerInfo.data.birth.slice(0, 4))}
            세
          </span>
          <span>|</span>
        </div>
        <div className="flex space-x-2">
          <span>
            상담시술:{" "}
            {customerInfo.data.recentConsult
              ? customerInfo.data.recentConsult
              : ""}
          </span>
          <span>|</span>
          <span>최근시술: ?</span>
        </div>
        <div className="flex space-x-2">
          <div>최근방문일: ?</div>
        </div>
      </div>
    </>
  );
};

export default ConsultCard;
