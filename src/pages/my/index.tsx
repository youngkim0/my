import Image from "next/image";
import Link from "next/link";
import ConsultCard from "~/components/ConsultCard";
import Footer from "~/components/Footer";
import { useState, useEffect } from "react";
import NewCustomerModal from "~/components/NewCustomerModal";
import SearchCard from "~/components/SearchCard";
import { useSession, signOut } from "next-auth/react";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import type { Clients } from "@prisma/client";

const MyPage = () => {
  const [openNewCustomerModal, setOpenNewCustomerModal] =
    useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  const [searchedCustomer, setSearchedCustomer] = useState<Clients[]>([]);

  const [customerFact, setCustomerFact] = useState<{
    monthBirthday: number;
    todayBirthday: number;
    todayJoined: number;
    monthJoined: number;
  }>({
    monthBirthday: 0,
    todayBirthday: 0,
    todayJoined: 0,
    monthJoined: 0,
  });

  const userInfo = api.account.getAccount.useQuery(
    {
      id: session?.user.name ? session?.user.name : "",
    },

    {
      enabled: !!session?.user.name,
    },
  );
  const customerNumber = api.customer.getCustomerNumber.useQuery(
    {
      id: session?.user.name ? session?.user.name : "",
    },
    {
      enabled: !!session?.user.name,
    },
  );
  const customerList = api.customer.getCustomerList.useQuery(
    {
      id: session?.user.name ? session?.user.name : "",
    },
    {
      enabled: !!session?.user.name,
      onSuccess: (data) => {
        setSearchedCustomer(data);
        if (data) {
          setCustomerFact({
            monthBirthday: data.filter((a) => {
              const today = new Date();
              return today.getMonth() + 1 === parseInt(a.birth.slice(4, 6));
            }).length,
            todayBirthday: data.filter((a) => {
              const today = new Date();
              return (
                today.getMonth() + 1 === parseInt(a.birth.slice(4, 6)) &&
                today.getDate() === parseInt(a.birth.slice(6))
              );
            }).length,
            todayJoined: data.filter((a) => {
              const today = new Date();
              const date = new Date(a.createdAt);
              return (
                today.getFullYear() === date.getFullYear() &&
                today.getMonth() === date.getMonth() &&
                today.getDate() === date.getDate()
              );
            }).length,
            monthJoined: data.filter((a) => {
              const today = new Date();
              const date = new Date(a.createdAt);
              return (
                today.getFullYear() === date.getFullYear() &&
                today.getMonth() === date.getMonth()
              );
            }).length,
          });
        }
      },
    },
  );
  const consultList = api.customer.getCustomerConsultList.useQuery(
    {
      userID: session?.user.name ? session?.user.name : "",
    },
    {
      enabled: !!session?.user.name,
    },
  );

  useEffect(() => {
    if (userInfo.data) {
      if (
        userInfo.data.store === null ||
        userInfo.data.store === "" ||
        userInfo.data.name === null ||
        userInfo.data.name === ""
      ) {
        void router.push("/my/edit");
      }
    }
  }, [userInfo.data]);


  if (!userInfo.data) return <></>;

  return (
    <>
      {openNewCustomerModal && (
        <NewCustomerModal
          open={openNewCustomerModal}
          setOpen={setOpenNewCustomerModal}
        />
      )}

      <div className="mx-auto flex min-h-screen max-w-md flex-col">
        <div className="relative flex h-12 flex-row items-center justify-center bg-[#2d2d2d] text-sm text-white">
          <span>{customerNumber.data}명 등록 완료</span>
        </div>
        <div className="mt-10 px-6">
          <div className="mb-3 flex flex-row justify-between font-bold">
            <div>
              <span>마이페이지</span>
              <Link
                className="ml-4 cursor-pointer text-sm text-blue-800"
                href="https://open.kakao.com/o/g1vySR5f"
                target="_blank"
              >
                오픈채팅방 입장
              </Link>
            </div>
            <span
              className="text-xs text-red-700"
              onClick={async () => {
                await signOut();
                void router.push("/");
              }}
            >
              로그아웃
            </span>
          </div>

          <div className="relative rounded-xl bg-white px-5 py-5">
            <div
              className="absolute right-4 top-3 cursor-pointer text-sm text-blue-800"
              onClick={() => void router.push("/my/edit")}
            >
              수정하기
            </div>
            <div
              className="absolute right-4 top-10 cursor-pointer text-sm text-blue-800"
              onClick={() => void router.push(`/${session?.user.nickname}`)}
            >
              프로필 페이지
            </div>

            <div className="flex flex-row items-center space-x-5">
              <div
                style={{
                  backgroundImage: userInfo.data.image
                    ? `url(${userInfo.data.image})`
                    : `url("/images/avatar.png")`,
                }}
                className="h-[80px] w-[80px] rounded-full bg-cover bg-center"
              ></div>
              {/* <Image
                src={userInfo.data.image ? userInfo.data.image : ""}
                alt=""
                width={100}
                height={100}
                className="rounded-full"
              /> */}
              <div className="relative">
                <p className="text-base">{userInfo.data.name}</p>
                <p className="pt-1 text-xs text-[#A3A3A3]">
                  {userInfo.data.store}
                </p>
                <div className="mt-5 flex flex-row text-xs">
                  <span>만료일 : </span>
                  <span className="ml-1">2023. 12. 30</span>
                  <span className="ml-3 cursor-pointer font-bold">
                    <Link href="/payment">연장하기</Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-row space-x-3 text-xs text-[#a3a3a3]">
              <div className="flex w-1/2 flex-col space-y-2">
                <p className="text-xs font-semibold text-black">고객관리</p>
                <p
                  style={{ fontWeight: 400 }}
                  onClick={() => {
                    setSearched(true);
                    setSearchedCustomer(
                      customerList.data!.filter((customer) => {
                        const today = new Date();
                        return (
                          today.getMonth() + 1 ===
                          parseInt(customer.birth.slice(4, 6))
                        );
                      }),
                    );
                  }}
                >
                  <span>🎂 이달 생일인 고객 </span>
                  <span className="font-bold text-black">
                    {customerFact.monthBirthday}명
                  </span>
                </p>
                <p
                  onClick={() => {
                    setSearched(true);
                    setSearchedCustomer(
                      customerList.data!.filter((customer) => {
                        const today = new Date();
                        const date = new Date(customer.createdAt);
                        return (
                          today.getFullYear() === date.getFullYear() &&
                          today.getMonth() === date.getMonth()
                        );
                      }),
                    );
                  }}
                >
                  ✍🏻 이달 등록된 고객{" "}
                  <span className="font-bold text-black">
                    {customerFact.monthJoined}명
                  </span>
                </p>
                <p
                  onClick={() => {
                    setSearched(true);
                    setSearchedCustomer(
                      customerList.data!.filter((customer) => {
                        const today = new Date();
                        return (
                          today.getMonth() + 1 ===
                            parseInt(customer.birth.slice(4, 6)) &&
                          today.getDate() === parseInt(customer.birth.slice(6))
                        );
                      }),
                    );
                  }}
                >
                  🎉 오늘 생일인 고객{" "}
                  <span className="font-bold text-black">
                    {customerFact.todayBirthday}명
                  </span>
                </p>
                <p
                  onClick={() => {
                    setSearched(true);
                    setSearchedCustomer(
                      customerList.data!.filter((customer) => {
                        const today = new Date();
                        const date = new Date(customer.createdAt);
                        return (
                          today.getFullYear() === date.getFullYear() &&
                          today.getMonth() === date.getMonth() &&
                          today.getDate() === date.getDate()
                        );
                      }),
                    );
                  }}
                >
                  📝 오늘 등록된 고객{" "}
                  <span className="font-bold text-black">
                    {customerFact.todayJoined}명
                  </span>
                </p>
              </div>
              <div className="flex w-1/2 flex-col space-y-2">
                <p className="text-xs font-semibold text-black">방문경로</p>
                <p className="flex flex-row items-center space-x-2">
                  <span className="relative h-[14px] w-[14px]">
                    <Image src="/images/i-naver2.png" alt="naver" fill />
                  </span>
                  <span className="text-[#a3a3a3]">네이버</span>
                  <span className="font-bold text-black">0명</span>
                </p>
                <p className="flex flex-row items-center space-x-2">
                  <span className="relative h-[14px] w-[14px]">
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png"
                      alt="naver"
                      fill
                    />
                  </span>
                  <span className="text-[#a3a3a3]">인스타그램</span>
                  <span className="font-bold text-black">0명</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3 mt-[44px] font-bold">고객 검색</div>

          <div className="relative flex space-x-2">
            <input
              type="text"
              className="focus:shadow-outline h-[46px] w-full rounded-lg px-3 text-base placeholder-[#a3a3a3] placeholder:text-xs placeholder:font-extralight"
              placeholder="고객명을 입력해주세요"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Image
              src={!searched ? "/images/i-search.png" : "/images/i-close.png"}
              alt="search"
              width={20}
              height={20}
              className="absolute right-3 top-3"
              onClick={() => {
                if (searched) {
                  setSearched(false);
                  setSearchText("");
                  return;
                }
                setSearched(true);
                setSearchedCustomer(
                  customerList.data!.filter(
                    (customer) =>
                      customer.name.includes(searchText) ||
                      customer.phoneNumber.includes(searchText),
                  ),
                );
              }}
            />
          </div>
          <div className="my-[22px] flex justify-center">
            <button
              className="h-12 w-48 rounded-full bg-[#2d2d2d] px-3 text-sm text-white"
              onClick={() => setOpenNewCustomerModal(true)}
            >
              고객 등록하기
            </button>
          </div>
          {!searched ? (
            <>
              <div className="flex justify-center space-x-2 text-xs text-[#a2a2a2]">
                <span>
                  오늘 상담 신청:{" "}
                  <span className="font-bold text-black">
                    {
                      consultList.data?.filter((a) => {
                        const today = new Date();
                        const date = new Date(a.createdAt);
                        return (
                          today.getFullYear() === date.getFullYear() &&
                          today.getMonth() === date.getMonth() &&
                          today.getDate() === date.getDate()
                        );
                      }).length
                    }
                    건
                  </span>
                </span>
                <span>|</span>
                <span>
                  답변 완료:{" "}
                  <span className="font-bold text-black">
                    {consultList.data?.filter((a) => a.replied).length}/
                    {consultList.data?.length}건
                  </span>
                </span>
              </div>

              <div className="mb-12 mt-3 flex flex-col space-y-2">
                {consultList.data?.map((consult) => (
                  <ConsultCard consult={consult} />
                ))}
              </div>
            </>
          ) : (
            <div className="mb-16 flex flex-col space-y-3">
              {searchedCustomer?.map((customer) => (
                <SearchCard
                  id={customer.id}
                  name={customer.name}
                  gender={customer.gender}
                  age={customer.birth}
                  digit={customer.phoneNumber}
                />
              ))}
            </div>
          )}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MyPage;
