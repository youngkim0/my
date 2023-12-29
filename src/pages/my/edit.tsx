import Image from "next/image";
import Footer from "~/components/Footer";
import { useState, useRef } from "react";
import NewCustomerModal from "~/components/NewCustomerModal";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

type Form = {
  nickname: string;
  name: string;
  store: string;
  image: string;
};

const MyPage = () => {
  const [openNewCustomerModal, setOpenNewCustomerModal] =
    useState<boolean>(false);
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const userInfo = api.account.getAccount.useQuery(
    {
      id: session?.user.name ? session?.user.name : "",
    },

    {
      onSuccess: (data) => {
        if (data)
          setForm({
            nickname: data.nickname ?? "",
            name: data.name ?? "",
            store: data.store ?? "",
            image: data.image ?? "",
          });
      },
      enabled: !!session?.user.name,
    },
  );

  const updateAccount = api.account.updateAccount.useMutation();
  const customerNumber = api.customer.getCustomerNumber.useQuery({
    id: session?.user.name ? session?.user.name : "",
  });

  const [form, setForm] = useState<Form>({
    nickname: userInfo.data?.nickname ?? "",
    name: userInfo.data?.name ?? "",
    store: userInfo.data?.store ?? "",
    image: userInfo.data?.image ?? "",
  });

  const confirm = () => {
    if (form.name === "") {
      alert("이름을 입력해주세요.");
      return;
    }
    if (form.store === "") {
      alert("가게명을 입력해주세요.");
      return;
    }
    if (form.nickname === "") {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (form.image === "") {
      alert("프로필 사진을 등록해주세요.");
      return;
    }
    const formData = new FormData();
    formData.append("file", form.image);
    formData.append("upload_preset", "t3yt1oxa");
    fetch("https://api.cloudinary.com/v1_1/dzxtjyhmk/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(async (res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access

        await updateAccount.mutateAsync({
          id: session?.user.name ?? "",
          name: form.name,
          store: form.store,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          image: res.secure_url,
          nickname: form.nickname,
        });

        void router.push("/my");
      })
      .catch((err) => console.log(err));
  };

  if (!userInfo.data) return <div></div>;

  return (
    <div className="">
      {openNewCustomerModal && (
        <NewCustomerModal
          open={openNewCustomerModal}
          setOpen={setOpenNewCustomerModal}
        />
      )}

      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <div className="relative flex h-8 flex-row items-center justify-center bg-[#2d2d2d] text-sm text-white">
          <span>{customerNumber.data}명 등록 완료</span>
        </div>
        <div className="mt-10 px-6">
          <div className="mb-3 font-bold">마이페이지</div>
          <div className="mb-10 rounded-xl bg-white px-5 py-5">
            <div className="flex flex-col items-center space-x-5">
              <input
                type="file"
                hidden
                ref={inputRef}
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.readAsDataURL(file!);
                    reader.onload = () => {
                      setForm({ ...form, image: reader.result as string });
                    };
                  }
                }}
              />
              <Image
                src={
                  form.image !== ""
                    ? form.image
                    : userInfo.data.image
                      ? userInfo.data.image
                      : "/images/avatar.png"
                }
                alt=""
                width={100}
                height={100}
                className="rounded-full"
                onClick={() => {
                  inputRef.current?.click();
                }}
              />
              <div className="relative mt-10 flex w-full flex-col space-y-5 pr-10">
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">아이디</p>
                  <input
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    disabled={
                      userInfo.data?.nickname !== "" || null ? true : false
                    }
                    value={form.nickname}
                    onChange={(e) => {
                      setForm({ ...form, nickname: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">이름</p>
                  <input
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">가게명</p>
                  <input
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    value={form.store}
                    onChange={(e) => {
                      setForm({ ...form, store: e.target.value });
                    }}
                  />
                </div>
                <div className="flex justify-center py-5">
                  <button
                    className="h-12 w-48 rounded-full bg-[#2d2d2d] px-3 text-sm text-white"
                    onClick={confirm}
                  >
                    저장하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
