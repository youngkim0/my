import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [checked, setChecked] = useState<boolean>(false);
  const onClick = () => {
    return;
  };

  return (
    <div className="mx-auto flex min-h-[100vh] max-w-md flex-col items-center">
      <Image
        src="/images/logo.png"
        alt="logo"
        width={300}
        height={300}
        className="mt-32"
      />

      <div
        className=""
        onClick={() => {
          onClick();
        }}
      >
        <div className="mx-auto mt-20 flex w-[300px] cursor-pointer flex-row items-center  rounded-lg bg-[#ffeb3b]">
          <Image src="/images/i-kakao.svg" width={42} height={42} alt="kakao" />
          <div className="px-12 text-base text-gray-800">카카오로 로그인</div>
        </div>
        <div className="mt-3 flex justify-center text-xs">
          <span>아직 회원이 아니신가요?</span>
          <span className="ml-3 cursor-pointer text-blue-500">회원가입</span>
        </div>

        <div
          className="mt-5 flex w-[300px] flex-row space-x-2"
          onClick={() => setChecked(!checked)}
        >
          <input type="checkbox" checked={checked} />
          <div className="text-xs tracking-tighter">
            이용약관 및 개인정보 수집 및 이용안내에 동의합니다.
          </div>
        </div>
        {/* <p className="mt-4 text-center">카카오</p> */}
      </div>
    </div>
  );
}
