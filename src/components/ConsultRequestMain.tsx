import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { api } from "~/utils/api";

const ConsultRequestMain = ({
  setPage,
  setUserInfo,
}: {
  setPage: Dispatch<SetStateAction<string>>;
  setUserInfo: Dispatch<
    SetStateAction<{
      name: string;
      phone: string;
      clientID: string;
      userID: string;
    }>
  >;
}) => {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const checkCustomer = api.customer.checkCustomer.useMutation();
  return (
    <>
      <div className="text-base">
        <div className="mb-6 font-bold">* 등록된 고객만 상담 가능합니다.</div>
        <div>고객님 이름</div>
        <input
          type="text"
          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <div className="mt-3">전화번호 마지막 4자리</div>
        <input
          type="text"
          className="mb-6 mt-2 w-1/2 rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </div>

      <div className="mb-4 mt-4 flex flex-row space-x-3">
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-full bg-[#2d2d2d] px-3 py-3 text-sm  text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={async () => {
            const check = await checkCustomer.mutateAsync({
              name,
              phoneNumber: phone,
            });
            if (!check) {
              alert("고객님의 정보가 없습니다.");
              return;
            }
            setUserInfo({
              name,
              phone,
              clientID: check.clientID,
              userID: check.userID,
            });
            setPage("check");
          }}
        >
          답변확인
        </button>
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-full border border-solid border-[#2d2d2d] px-3 py-3 text-sm font-semibold text-[#2d2d2d]"
          onClick={async () => {
            const check = await checkCustomer.mutateAsync({
              name,
              phoneNumber: phone,
            });
            if (!check) {
              alert("고객님의 정보가 없습니다.");
              return;
            }
            setUserInfo({
              name,
              phone,
              clientID: check.clientID,
              userID: check.userID,
            });
            setPage("request");
          }}
        >
          상담신청
        </button>
      </div>
    </>
  );
};

export default ConsultRequestMain;
