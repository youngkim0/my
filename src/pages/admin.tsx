/* eslint-disable @next/next/no-img-element */
import { api } from "~/utils/api";
import { useState } from "react";
import { format } from "date-fns";
import Footer from "~/components/Footer";
import type { Clients } from "@prisma/client";
import Image from "next/image";
import EditCustomerModal from "~/components/EditCustomerModal";
import Calendar from "react-calendar";

const Admin = () => {
  const [clickedID, setClickedID] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [searchedCustomer, setSearchedCustomer] = useState<Clients[]>([]);
  const [searched, setSearched] = useState<boolean>(false);
  const [clickedCustomer, setClickedCustomer] = useState<string>("");
  const [openEditCustomer, setOpenEditCustomer] = useState<boolean>(false);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const util = api.useUtils();

  const deleteDesigner = api.account.deleteAccount.useMutation({
    onSuccess: async () => {
      alert("디자이너를 삭제했습니다.");
      await util.account.getAllDesigners.invalidate();
    },
  });
  const deleteReview = api.customer.deleteReview.useMutation({
    onSuccess: async () => {
      alert("리뷰를 삭제했습니다.");
      await util.customer.getReviewsByID.invalidate();
    },
  });
  const designerList = api.account.getAllDesigners.useQuery({});
  const customerList = api.customer.getCustomerListByID.useQuery(
    {
      id: clickedID,
    },
    {
      enabled: clickedID !== "",
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data) setSearchedCustomer(data);
      },
    },
  );
  const consultList = api.customer.getCustomerConsultListByID.useQuery(
    {
      userID: clickedID,
    },
    {
      enabled: clickedID !== "",
    },
  );
  const serviceList = api.account.getAllServicesByID.useQuery(
    {
      userID: clickedID,
    },
    {
      enabled: clickedID !== "",
    },
  );
  const reviewList = api.customer.getReviewsByID.useQuery(
    {
      userID: clickedID,
    },
    {
      enabled: clickedID !== "",
    },
  );
  const updateDate = api.account.extendService.useMutation({
    onSuccess: async () => {
      alert("기간을 연장했습니다.");
      await util.account.getAllDesigners.invalidate();
    },
  });

  if (!designerList.data) return <></>;
  return (
    <div className="flex min-h-screen flex-col">
      {openEditCustomer && (
        <EditCustomerModal
          open={openEditCustomer}
          setOpen={setOpenEditCustomer}
          customerID={clickedCustomer}
        />
      )}

      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          디자이너 관리
        </h3>
      </div>
      <ul role="list" className="mb-10 divide-y divide-gray-200 px-5">
        {designerList.data.map((person) => (
          <li key={person.id}>
            <div
              className="flex justify-between gap-x-6 py-2"
              onClick={() => {
                if (clickedID === person.id) {
                  setClickedID("");
                  setEndDate(null);
                } else {
                  setClickedID(person.id);
                  setEndDate(null);
                }
              }}
            >
              <div className="flex min-w-0 gap-x-4">
                <img
                  className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  src={person.image ? person.image : "/images/avatar.png"}
                  alt=""
                />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {person.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {person.nickname}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  {person.store}
                </p>

                <div className="mt-1 flex items-center gap-x-1.5">
                  <div
                    className={`flex-none rounded-full p-1 
                 ${
                   person.expiresAt !== null &&
                   // compare with current time
                   new Date(person.expiresAt) > new Date()
                     ? "bg-emerald-300/20"
                     : "bg-red-300/20"
                 } `}
                  >
                    <div
                      className={`h-1.5 w-1.5 rounded-full  ${
                        person.expiresAt !== null &&
                        // compare with current time
                        new Date(person.expiresAt) > new Date()
                          ? "bg-emerald-500/20"
                          : "bg-red-500/20"
                      }`}
                    />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">
                    {person.expiresAt !== null &&
                    // compare with current time
                    new Date(person.expiresAt) > new Date()
                      ? "이용 중"
                      : "이용 만료"}
                  </p>
                </div>
              </div>
            </div>
            {clickedID === person.id && customerList.data && (
              <div className="mt-3">
                <div className="px-1 sm:px-0">
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    디자이너 세부정보
                  </h3>
                </div>
                <div className="mt-1 border-t border-gray-300">
                  <dl className="divide-y divide-gray-300">
                    <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        이름
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {person.name}
                      </dd>
                    </div>
                    <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        가게명
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {person.store}
                      </dd>
                    </div>
                    <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        가입일시
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {format(new Date(person.joinedAt), "yyyy-MM-dd")}
                      </dd>
                    </div>
                    <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        기간 연장
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <Calendar
                          onChange={(date) => {
                            setEndDate(date as Date);
                          }}
                        />
                        <button
                          className="mt-2 rounded-full bg-blue-500 px-3 py-1 text-white "
                          onClick={async (e) => {
                            e.preventDefault();
                            if (endDate === null) {
                              alert("기간을 선택해주세요.");
                              return;
                            }
                            await updateDate.mutateAsync({
                              id: person.kakaoID,
                              extendDate: endDate.toLocaleDateString(),
                            });
                          }}
                        >
                          기간 연장
                        </button>
                      </dd>
                    </div>
                    <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        결제내역
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {/* {person.store} */}
                      </dd>
                    </div>
                    <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        시그니처 서비스
                      </dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {serviceList.data?.map((service) => (
                          <div className="mt-4 rounded-md bg-white px-3 py-3">
                            <div className="items-center text-blue-800">
                              <img
                                src={service.image}
                                alt=""
                                className="mb-3 h-20 w-20 rounded-md"
                              />
                              <p>{service.name}</p>
                              <p className="mt-3 text-gray-800">
                                {service.content}
                              </p>
                            </div>
                          </div>
                        ))}
                      </dd>
                    </div>
                    <div className="px-1 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">
                        고객목록
                      </dt>
                      <div className="relative mt-8 flex space-x-2">
                        <input
                          type="text"
                          className="focus:shadow-outline h-9 w-full rounded-lg border px-3 text-base text-gray-700 placeholder-gray-300
              placeholder:text-xs"
                          placeholder="고객명을 입력해주세요"
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Image
                          src={
                            !searched
                              ? "/images/i-search.png"
                              : "/images/i-close.png"
                          }
                          alt="search"
                          width={20}
                          height={20}
                          className="absolute right-3 top-2"
                          onClick={() => {
                            if (searched) {
                              setSearched(false);
                              setSearchText("");
                              if (customerList.data)
                                setSearchedCustomer(customerList.data);
                              return;
                            }
                            setSearched(true);
                            if (customerList.data)
                              setSearchedCustomer(
                                customerList.data.filter(
                                  (customer) =>
                                    customer.name.includes(searchText) ||
                                    customer.phoneNumber.includes(searchText),
                                ),
                              );
                          }}
                        />
                      </div>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {searchedCustomer.map((customer) => (
                          <div className="mt-4">
                            <div
                              className="flex cursor-pointer items-center gap-x-2 text-blue-800"
                              onClick={() => {
                                setOpenEditCustomer(true);
                                setClickedCustomer(customer.id);
                              }}
                            >
                              <p>{customer.name}</p>
                              <p>{customer.phoneNumber}</p>
                              <p>{customer.gender}</p>
                            </div>
                            {consultList.data &&
                              consultList.data.filter(
                                (a) => a.clientID === customer.id,
                              ).length !== 0 && (
                                <>
                                  <p className="mt-3 text-gray-500">상담내역</p>
                                  <div className="flex flex-col gap-y-1">
                                    {consultList.data
                                      .filter((a) => a.clientID === customer.id)
                                      .map((consult) => (
                                        <div className="rounded-md bg-white px-3 py-3">
                                          <p>상담내용</p>
                                          <p>{consult.memo}</p>
                                          <p>답변내용</p>
                                          <p>{consult.reply}</p>
                                        </div>
                                      ))}
                                  </div>
                                </>
                              )}
                            {reviewList.data &&
                              reviewList.data.filter(
                                (a) => a.clientID === customer.id,
                              ).length !== 0 && (
                                <>
                                  <p className="mt-3 text-gray-500">리뷰내역</p>
                                  <div className="flex flex-col gap-y-1">
                                    {reviewList.data

                                      .filter((a) => a.clientID === customer.id)
                                      .map((review) => (
                                        <div
                                          className="relative rounded-md bg-white px-3 py-3"
                                          id={review.id}
                                        >
                                          <img
                                            src={review.image}
                                            alt=""
                                            className="mb-3 h-20 w-20 rounded-md"
                                          />
                                          <p>리뷰내용</p>
                                          <p>{review.review}</p>
                                          <p>작성일</p>
                                          <p>
                                            {format(
                                              new Date(review.createdAt),
                                              "yyyy-MM-dd",
                                            )}
                                          </p>
                                          <div
                                            className="absolute right-3 top-3 cursor-pointer text-red-800"
                                            onClick={async () => {
                                              await deleteReview.mutateAsync({
                                                reviewID: review.id,
                                              });
                                            }}
                                          >
                                            리뷰삭제
                                          </div>
                                        </div>
                                      ))}
                                  </div>
                                </>
                              )}
                          </div>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="border-t-solid mb-8 flex w-full space-x-3 border-t border-t-gray-400 pt-7">
                  <button
                    type="button"
                    className="w-1/2 rounded-full border border-transparent bg-gray-500 px-4 py-2 text-center text-sm font-medium leading-5 text-white"
                  >
                    중지
                  </button>
                  <button
                    type="button"
                    className="w-1/2 items-center rounded-full border border-transparent bg-red-500 px-4 py-2 text-sm font-medium leading-5 text-white"
                    onClick={async () => {
                      await deleteDesigner.mutateAsync({
                        id: person.id,
                      });
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto"></div>
      <Footer />
    </div>
  );
};

export default Admin;
