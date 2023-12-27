import Image from "next/image";
import Footer from "~/components/Footer";
import { useState, useRef } from "react";
import NewCustomerModal from "~/components/NewCustomerModal";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import TextareaAutosize from "react-textarea-autosize";

type Form = {
  nickname: string;
  name: string;
  store: string;
  naverPlace: string;
  description: string;
  image: string;
  instagram: string;
  blog: string;
  youtube: string;
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
            naverPlace: data.naverPlace ?? "",
            description: data.description ?? "",
            image: data.image ?? "",
            instagram: data.instagram ?? "",
            blog: data.blog ?? "",
            youtube: data.youtube ?? "",
          });
      },
      enabled: !!session?.user.name,
    },
  );

  const updateAccount = api.account.updateAccount.useMutation();
  const customerNumber = api.customer.getCustomerNumber.useQuery({
    id: session?.user.name ? session?.user.name : "",
  });
  const checkNickname = api.account.checkExistingNickname.useMutation();

  const [form, setForm] = useState<Form>({
    nickname: userInfo.data?.nickname ?? "",
    name: userInfo.data?.name ?? "",
    store: userInfo.data?.store ?? "",
    naverPlace: userInfo.data?.naverPlace ?? "",
    description: userInfo.data?.description ?? "",
    image: userInfo.data?.image ?? "",
    instagram: userInfo.data?.instagram ?? "",
    blog: userInfo.data?.blog ?? "",
    youtube: userInfo.data?.youtube ?? "",
  });

  const confirm = async () => {
    const check = await checkNickname.mutateAsync({
      nickname: form.nickname,
    });
    const test = /^[a-zA-Z0-9_]*$/;
    if (!test.test(form.nickname)) {
      alert("아이디는 영문, 숫자, _ 만 가능합니다.");
      return;
    }

    if (check === "true") {
      alert("이미 존재하는 아이디입니다.");
      return;
    }

    if (form.name === "") {
      alert("이름을 입력해주세요.");
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
          naverPlace: form.naverPlace,
          description: form.description,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          image: res.secure_url,
          nickname: form.nickname,
          instagram: form.instagram,
          blog: form.blog,
          youtube: form.youtube,
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
                    const target = e.currentTarget;
                    const file = target.files![0];
                    const formData = new FormData();
                    formData.append("file", file!);
                    formData.append("upload_preset", "t3yt1oxa");
                    fetch("https://api.cloudinary.com/v1_1/dzxtjyhmk/upload", {
                      method: "POST",
                      body: formData,
                    })
                      .then((res) => res.json())
                      .then(async (res) => {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
                        setForm({ ...form, image: res.secure_url });
                      })
                      .catch((err) => console.log(err));
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
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">설명</p>
                  <TextareaAutosize
                    minRows={3}
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    value={form.description}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">
                    예약하기 주소(네이버 플레이스)
                  </p>
                  <input
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    value={form.naverPlace}
                    onChange={(e) => {
                      setForm({ ...form, naverPlace: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">
                    인스타그램 주소
                  </p>
                  <input
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    value={form.instagram}
                    onChange={(e) => {
                      setForm({ ...form, instagram: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">
                    블로그 주소
                  </p>
                  <input
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    value={form.blog}
                    onChange={(e) => {
                      setForm({ ...form, blog: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-xs font-semibold text-black">
                    유튜브 주소
                  </p>
                  <input
                    className="w-full rounded-md border border-[#A3A3A3] px-2 py-1 text-xs"
                    value={form.youtube}
                    onChange={(e) => {
                      setForm({ ...form, youtube: e.target.value });
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
