import { Fragment, type SetStateAction, type Dispatch, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

type Form = {
  name: string;
  gender: string;
  phoneNumber: string;
  birth: string;
  visitPath: string;
  hairThickness: string;
  hairType: string;
  hairFerm: string;
  hairDye: string;
  hairClinic: string;
  hairStyle: string;
  scalpType: string;
  dandruff: string;
  hairLoss: string;
  sensitiveScalp: string;
  tensionScalp: string;
  memo: string;
};

type FormCheckbox = {
  important: string[];
  styleConcept: string[];
  importantHair: string[];
  interestService: string[];
};

export default function EditCustomerModal({
  open,
  setOpen,
  customerID,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  customerID: string;
}) {
  const { data: session } = useSession();
  const util = api.useUtils();

  const editCustomer = api.customer.editCustomer.useMutation({
    onSuccess: async () => {
      await util.customer.getCustomerInfo.invalidate();
    },
  });
  const [form, setForm] = useState<Form>({
    name: "",
    gender: "남",
    phoneNumber: "",
    birth: "",
    visitPath: "",
    hairThickness: "",
    hairType: "",
    hairFerm: "",
    hairDye: "",
    hairClinic: "",
    hairStyle: "",
    // interestService: "",
    scalpType: "",
    dandruff: "",
    hairLoss: "",
    sensitiveScalp: "",
    tensionScalp: "",
    memo: "",
  });

  const [formCheckbox, setFormCheckbox] = useState<FormCheckbox>({
    important: [],
    styleConcept: [],
    importantHair: [],
    interestService: [],
  });

  const customerInfo = api.customer.getCustomerInfo.useQuery(
    {
      id: customerID,
    },
    {
      enabled: !!customerID,
      onSuccess: (data) => {
        if (data) {
          setForm({
            name: data.name,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            birth: data.birth,
            visitPath: data.visitPath,
            hairThickness: data.hairThickness,
            hairType: data.hairType,
            hairFerm: data.hairFerm,
            hairDye: data.hairDye,
            hairClinic: data.hairClinic,
            hairStyle: data.hairStyle,
            scalpType: data.scalpType,
            dandruff: data.dandruff,
            hairLoss: data.hairLoss,
            sensitiveScalp: data.sensitiveScalp,
            tensionScalp: data.tensionScalp,
            memo: data.memo,
          });
          setFormCheckbox({
            important: data.important,
            styleConcept: data.styleConcept,
            importantHair: data.importantHair,
            interestService: data.interestService,
          });
        }
      },
    },
  );

  const handleSubmit = async () => {
    await editCustomer.mutateAsync({
      customerID,
      name: form.name,
      phoneNumber: form.phoneNumber,
      gender: form.gender,
      birth: form.birth,
      visitPath: form.visitPath,
      hairThickness: form.hairThickness,
      hairType: form.hairType,
      hairFerm: form.hairFerm,
      hairDye: form.hairDye,
      hairClinic: form.hairClinic,
      hairStyle: form.hairStyle,
      interestService: formCheckbox.interestService,
      scalpType: form.scalpType,
      dandruff: form.dandruff,
      hairLoss: form.hairLoss,
      sensitiveScalp: form.sensitiveScalp,
      tensionScalp: form.tensionScalp,
      memo: form.memo,
      important: formCheckbox.important,
      styleConcept: formCheckbox.styleConcept,
      importantHair: formCheckbox.importantHair,
    });
    setOpen(false);
  };

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
              <Dialog.Panel className="relative h-full w-full max-w-md transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:max-w-[400px]">
                <div className="absolute right-0 top-0 mr-4 mt-4">
                  <button type="button" onClick={() => setOpen(false)}>
                    <Image
                      src="/images/i-close.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
                <div className="text-sm">
                  <div className="mb-2 py-4 text-base font-bold">고객 등록</div>

                  <div className="text-base font-semibold">이름</div>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-md bg-[#ececec] px-3 py-2 text-sm font-semibold text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 "
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                  <div className="mt-4 text-base font-semibold">성별</div>
                  <select
                    className="mt-2 rounded-md bg-[#ececec] px-2 py-1"
                    tabIndex={-1}
                    value={form.gender}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, gender: e.target.value }))
                    }
                  >
                    <option value="남">남</option>
                    <option value="여">여</option>
                  </select>
                  <div className="mt-4 text-base font-semibold">
                    전화번호(ex: 01023450987)
                  </div>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-md bg-[#ececec] px-3 py-2 text-sm font-semibold text-gray-700"
                    value={form.phoneNumber}
                    onChange={(e) => {
                      if (e.target.value.length > 11) return;
                      setForm((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }));
                    }}
                  />
                  <div className="mt-4 text-base font-semibold">
                    생년월일(ex: 19930121 혹은 20020101)
                  </div>
                  <input
                    type="text"
                    className="mt-2 w-full rounded-md bg-[#ececec] px-3 py-2 text-sm font-semibold text-gray-700"
                    value={form.birth}
                    onChange={(e) => {
                      if (e.target.value.length > 8) return;
                      setForm((prev) => ({
                        ...prev,
                        birth: e.target.value,
                      }));
                    }}
                  />
                  <RadioGroup
                    title="방문경로"
                    items={["네이버", "인스타그램", "지인추천", "기타"]}
                    section="visitPath"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="모발굵기"
                    items={["가는모발", "중간모발", "굵은모발"]}
                    section="hairThickness"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="모발종류"
                    items={["곱슬", "직모", "반곱슬", "탈모"]}
                    section="hairType"
                    form={form}
                    setForm={setForm}
                  />

                  <div className="mb-2 mt-6 text-base font-semibold">
                    최근 6개월 내 시술 경험 유무
                  </div>
                  <RadioGroup
                    title="펌"
                    items={["없음", "1회", "2회", "3회 이상"]}
                    section="hairFerm"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="염색"
                    items={["없음", "1회", "2회", "3회 이상"]}
                    section="hairDye"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="클리닉"
                    items={["없음", "1회", "2회", "3회 이상"]}
                    section="hairClinic"
                    form={form}
                    setForm={setForm}
                  />
                  <CheckGroup
                    title="관심 있는 시술"
                    items={["커트", "펌", "염색", "클리닉"]}
                    section="interestService"
                    form={formCheckbox}
                    setForm={setFormCheckbox}
                  />

                  <CheckGroup
                    section="important"
                    form={formCheckbox}
                    setForm={setFormCheckbox}
                    title="헤어스타일에서 중요하게 생각하는 부분"
                    items={[
                      "건강",
                      "길이",
                      "컬러",
                      "볼륨업(다운)",
                      "손질의 편리성",
                      "스타일",
                      "트렌드",
                    ]}
                  />
                  <CheckGroup
                    section="importantHair"
                    form={formCheckbox}
                    setForm={setFormCheckbox}
                    title="고객이 추구하는 스타일 컨셉"
                    items={[
                      "지적이게",
                      "여성스럽게",
                      "차분하게",
                      "섹시하게",
                      "발랄하게",
                      "댄디하게",
                      "산뜻하게",
                      "세련되게",
                      "어려보이게",
                      "자연스럽게",
                      "고급스럽게",
                      "부드럽게",
                      "편안하게",
                      "최근신 유행스타일",
                      "나에게 어울리는 스타일",
                    ]}
                  />
                  <CheckGroup
                    section="styleConcept"
                    form={formCheckbox}
                    setForm={setFormCheckbox}
                    title="홈케어시 불편한 사항"
                    items={[
                      "볼륨이 없다/많다",
                      "너무 상했다",
                      "손질이 어렵다",
                      "스타일이 안 맞다",
                      "기타",
                    ]}
                  />
                  <RadioGroup
                    title="두피 유형"
                    items={["정상", "건성", "지성"]}
                    section="scalpType"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="비듬"
                    items={["부분", "두피", "해당 없음"]}
                    section="dandruff"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="탈모"
                    items={[
                      "영구적",
                      "일시적",
                      "부분적",
                      "초기",
                      "진전",
                      "해당 없음",
                    ]}
                    section="hairLoss"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="민감성 두피"
                    items={["붉은 반점", "염증", "가려움증", "해당 없음"]}
                    section="sensitiveScalp"
                    form={form}
                    setForm={setForm}
                  />
                  <RadioGroup
                    title="긴장성 두피"
                    items={["따가움증", "각질", "해당 없음"]}
                    section="tensionScalp"
                    form={form}
                    setForm={setForm}
                  />
                </div>
                <div className="mt-6 text-base font-semibold">
                  <p className="mb-2">추가 메모</p>
                  <TextareaAutosize
                    minRows={4}
                    className="w-full resize-none rounded-md bg-[#ececec] px-3 py-3"
                    placeholder="메모를 작성해주세요"
                    value={form.memo}
                    onChange={(e) => {
                      setForm((prev) => ({ ...prev, memo: e.target.value }));
                    }}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full bg-[#2d2d2d] px-3 py-3 text-sm font-semibold text-white"
                    onClick={handleSubmit}
                  >
                    저장
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const RadioGroup = ({
  title,
  items,
  section,
  form,
  setForm,
}: {
  title: string;
  items: string[];
  section: string;
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
}) => {
  return (
    <>
      <div className="mt-4 text-base font-semibold">{title}</div>
      <fieldset className="mt-2">
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          <div className="flex items-center space-x-2">
            {items.slice(0, 5).map((item) => (
              <Fragment key={item}>
                <input
                  id={item + title}
                  name={item + title}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={form[section as keyof Form] === item}
                  onChange={() => {
                    const newForm = { ...form };
                    newForm[section as keyof Form] = item;
                    setForm(newForm);
                  }}
                />
                <label
                  htmlFor="thickness"
                  className="block text-xs font-medium leading-6 text-gray-900"
                >
                  {item}
                </label>
              </Fragment>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            {items.slice(5, 10).map((item) => (
              <Fragment key={item}>
                <input
                  id={item}
                  name={item}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  checked={form[section as keyof Form] === item}
                  onChange={() => {
                    const newForm = { ...form };
                    newForm[section as keyof Form] = item;
                    setForm(newForm);
                  }}
                />
                <label
                  htmlFor="thickness"
                  className="block text-xs font-medium leading-6 text-gray-900"
                >
                  {item}
                </label>
              </Fragment>
            ))}
          </div>
        </div>
      </fieldset>
    </>
  );
};

const CheckGroup = ({
  title,
  items,
  section,
  form,
  setForm,
}: {
  title: string;
  items: string[];
  section: string;
  form: FormCheckbox;
  setForm: Dispatch<SetStateAction<FormCheckbox>>;
}) => {
  return (
    <>
      <div className="mt-4 text-base font-semibold">{title}</div>
      <fieldset className="mt-2">
        <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
          <div className="flex flex-wrap items-center space-x-3">
            {items.slice(0, 3).map((item) => (
              <Fragment key={item}>
                <input
                  id={item}
                  name="notification-method"
                  type="checkbox"
                  className="h-4 w-4  border-gray-300 "
                  checked={form[section as keyof FormCheckbox].includes(item)}
                  onChange={(e) => {
                    const newForm = { ...form };
                    if (e.target.checked) {
                      newForm[section as keyof FormCheckbox].push(item);
                      setForm(newForm);
                      return;
                    }
                    newForm[section as keyof FormCheckbox].filter(
                      (v) => v !== item,
                    );
                  }}
                />
                <label
                  htmlFor={item}
                  className="block min-w-fit text-xs font-medium leading-6 text-gray-900"
                >
                  {item}
                </label>
              </Fragment>
            ))}
          </div>
          {items.length > 3 && (
            <div className="flex flex-wrap items-center  space-x-3">
              {items.slice(3, 6).map((item) => (
                <Fragment key={item}>
                  <input
                    id={item}
                    name="notification-method"
                    type="checkbox"
                    className="h-4 w-4  border-gray-300"
                    checked={form[section as keyof FormCheckbox].includes(item)}
                    onChange={(e) => {
                      const newForm = { ...form };
                      if (e.target.checked) {
                        newForm[section as keyof FormCheckbox].push(item);
                        setForm(newForm);
                        return;
                      }
                      newForm[section as keyof FormCheckbox].filter(
                        (v) => v !== item,
                      );
                    }}
                  />
                  <label
                    htmlFor={item}
                    className="block min-w-fit text-xs font-medium leading-6 text-gray-900"
                  >
                    {item}
                  </label>
                </Fragment>
              ))}
            </div>
          )}
          {items.length > 6 && (
            <div className="flex flex-wrap items-center  space-x-3">
              {items.slice(6, 9).map((item) => (
                <Fragment key={item}>
                  <input
                    id={item}
                    name="notification-method"
                    type="checkbox"
                    className="h-4 w-4  border-gray-300"
                    checked={form[section as keyof FormCheckbox].includes(item)}
                    onChange={(e) => {
                      const newForm = { ...form };
                      if (e.target.checked) {
                        newForm[section as keyof FormCheckbox].push(item);
                        setForm(newForm);
                        return;
                      }
                      newForm[section as keyof FormCheckbox].filter(
                        (v) => v !== item,
                      );
                    }}
                  />
                  <label
                    htmlFor={item}
                    className="block min-w-fit text-xs font-medium leading-6 text-gray-900"
                  >
                    {item}
                  </label>
                </Fragment>
              ))}
            </div>
          )}
          {items.length > 9 && (
            <div className="flex flex-wrap items-center  space-x-3">
              {items.slice(9, 12).map((item) => (
                <Fragment key={item}>
                  <input
                    id={title}
                    name="notification-method"
                    type="checkbox"
                    className="h-4 w-4  border-gray-300"
                    checked={form[section as keyof FormCheckbox].includes(item)}
                    onChange={(e) => {
                      const newForm = { ...form };
                      if (e.target.checked) {
                        newForm[section as keyof FormCheckbox].push(item);
                        setForm(newForm);
                        return;
                      }
                      newForm[section as keyof FormCheckbox].filter(
                        (v) => v !== item,
                      );
                    }}
                  />
                  <label
                    htmlFor={title}
                    className="block min-w-fit text-xs font-medium leading-6 text-gray-900"
                  >
                    {item}
                  </label>
                </Fragment>
              ))}
            </div>
          )}
          {items.length > 12 && (
            <div className="flex flex-wrap items-center  space-x-3">
              {items.slice(12, 15).map((item) => (
                <Fragment key={item}>
                  <input
                    id={title}
                    name="notification-method"
                    type="checkbox"
                    className="h-4 w-4  border-gray-300"
                    checked={form[section as keyof FormCheckbox].includes(item)}
                    onChange={(e) => {
                      const newForm = { ...form };
                      if (e.target.checked) {
                        newForm[section as keyof FormCheckbox].push(item);
                        setForm(newForm);
                        return;
                      }
                      newForm[section as keyof FormCheckbox].filter(
                        (v) => v !== item,
                      );
                    }}
                  />
                  <label
                    htmlFor={title}
                    className="block min-w-fit text-xs font-medium leading-6 text-gray-900"
                  >
                    {item}
                  </label>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </fieldset>
    </>
  );
};
