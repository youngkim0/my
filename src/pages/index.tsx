import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import KakaoLogin from "react-kakao-login";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState<boolean>(false);
  const register = api.account.register.useMutation();
  const checkRegistered = api.account.isRegistered.useMutation();

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      void router.push("/my");
    }
  }, [session]);

  const kakaoRegister = async (id: number) => {
    const check = await checkRegistered.mutateAsync({
      id: id.toString(),
    });
    console.log(check);

    if (check) {
      alert("이미 등록된 회원입니다.");
      return;
    }

    try {
      const response = await register.mutateAsync({
        id: id.toString(),
      });
      console.log(response);

      if (response) {
        console.log(id.toString());
        await signIn("credentials", {
          redirect: false,

          email: id.toString(),
        });

        // void router.push("/my");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(session?.user);



  return (
    <div className="mx-auto flex min-h-[100vh] max-w-md flex-col items-center">
      <Image
        src="/images/my-logo-colored.png"
        alt="logo"
        width={200}
        height={200}
        className="mt-32"
      />

      <div>
        <KakaoLogin
          token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!}
          onSuccess={async (response) => {
            if (response.profile) {
              const check = await checkRegistered.mutateAsync({
                id: response.profile?.id.toString(),
              });
              if (!check) {
                alert("등록되지 않은 회원입니다.");
                return;
              }
              await signIn("credentials", {
                redirect: true,
                callbackUrl: "/my",
                email: response.profile.id.toString(),
              });
            }
          }}
          onFail={(error) => console.log(error)}
          render={({ onClick }: { onClick: () => void }) => {
            return (
              <div
                className="mx-auto mt-20 flex w-[300px] cursor-pointer flex-row items-center  rounded-lg bg-[#ffeb3b]"
                // onClick={() => router.push("/home")}
                onClick={() => onClick()}
              >
                <Image
                  src="/images/i-kakao.svg"
                  width={42}
                  height={42}
                  alt="kakao"
                />
                <div className="px-12 text-base text-gray-800">
                  카카오로 로그인
                </div>
              </div>
            );
          }}
        />

        <div className="mt-5  flex justify-center text-xs">
          <span>아직 회원이 아니신가요?</span>

          <KakaoLogin
            token={process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID!}
            onSuccess={async (response) => {
              if (response.profile) await kakaoRegister(response.profile.id);
            }}
            onFail={(error) => console.log(error)}
            render={({ onClick }: { onClick: () => void }) => {
              return (
                <span
                  className="ml-3 cursor-pointer text-blue-500"
                  onClick={() => {
                    if (!checked) {
                      alert("이용약관에 동의해주세요.");
                      return;
                    }
                    onClick();
                  }}
                >
                  회원가입
                </span>
              );
            }}
          />
        </div>

        <div
          className="mt-5 flex w-[300px] flex-row space-x-2"
          onClick={() => setChecked(!checked)}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <div className="text-xs tracking-tighter">
            이용약관 및 개인정보 수집 및 이용안내에 동의합니다.
          </div>
        </div>
        {/* <p className="mt-4 text-center">카카오</p> */}
      </div>
    </div>
  );
}
