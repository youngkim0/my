/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Fragment,
  type SetStateAction,
  type Dispatch,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import type { Service } from "@prisma/client";
import { api } from "~/utils/api";

export default function ServiceModal({
  open,
  setOpen,
  service,
  owner,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  service: Service;
  owner: boolean;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>(service.name);
  const [content, setContent] = useState<string>(service.content);
  const [image, setImage] = useState<string>(service.image);
  const util = api.useUtils();
  const deleteService = api.account.deleteService.useMutation({
    onSuccess: async () => {
      await util.account.getAllServices.invalidate();
    },
  });
  const updateService = api.account.updateService.useMutation({
    onSuccess: async () => {
      await util.account.getAllServices.invalidate();
    },
  });

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[2000]" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 "
              enterTo="opacity-100 translate-y-0 "
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 "
              leaveTo="opacity-0 translate-y-4 "
            >
              <Dialog.Panel className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:max-w-[400px]">
                <input
                  type="file"
                  ref={fileInput}
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      const target = e.currentTarget;
                      const file = target.files![0];
                      const formData = new FormData();
                      formData.append("file", file!);
                      formData.append("upload_preset", "t3yt1oxa");
                      fetch(
                        "https://api.cloudinary.com/v1_1/dzxtjyhmk/upload",
                        {
                          method: "POST",
                          body: formData,
                        },
                      )
                        .then((res) => res.json())
                        .then(async (res) => {
                          setImage(res.secure_url);
                        })
                        .catch((err) => console.log(err));
                    }
                  }}
                />
                <div
                  className="relative h-60 w-full bg-contain bg-center bg-no-repeat"
                  onClick={() => owner && fileInput.current?.click()}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  {/* <Image src={image} fill alt="service" quality={100} /> */}
                </div>
                {owner ? (
                  <div className="h-44 break-keep px-2 py-5 text-sm">
                    <input
                      className="mb-4 h-10 w-full rounded-md border border-solid border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
                      placeholder="서비스명"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <textarea
                      className="mb-4 h-20 w-full rounded-md border border-solid border-gray-300 px-3 py-2 placeholder-gray-300 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
                      placeholder="서비스 설명"
                      value={content}
                      onChange={(e) => {
                        setContent(e.target.value);
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-44 break-keep px-2 py-5 text-sm">
                    <p className="py-2 text-center text-base font-bold">
                      {service.name}
                    </p>
                    <div className="py-2 text-sm">{service.content}</div>
                  </div>
                )}

                {owner && (
                  <div className="flex flex-row justify-between space-x-4">
                    <div
                      className="flex w-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-[#2D2D2D] py-3 text-sm font-bold text-[#2D2D2D]"
                      onClick={async () => {
                        await deleteService.mutateAsync({
                          serviceID: service.id,
                        });
                        setOpen(false);
                      }}
                    >
                      삭제
                    </div>
                    <div
                      className="flex w-1/2 cursor-pointer items-center justify-center rounded-full border border-solid border-[#2D2D2D] py-3 text-sm font-bold text-[#2D2D2D]"
                      onClick={async () => {
                        await updateService.mutateAsync({
                          serviceID: service.id,
                          image,
                          name,
                          content,
                        });
                        setOpen(false);
                      }}
                    >
                      수정
                    </div>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full bg-[#2d2d2d] px-3 py-3 text-sm font-semibold text-white   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                    onClick={() => setOpen(false)}
                  >
                    닫기
                  </button>
                </div>
                <div className="mb-6"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
