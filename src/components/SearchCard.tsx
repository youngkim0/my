import { useState } from "react";
import CustomerModal from "./CustomerModal";
import Image from "next/image";

const SearchCard = ({
  name,
  gender,
  age,
  digit,
  id,
}: {
  name: string;
  gender: string;
  age: string;
  digit: string;
  id: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const ageToday = new Date().getFullYear() - parseInt(age.slice(0, 4));

  return (
    <>
      {open && <CustomerModal open={open} setOpen={setOpen} id={id} />}
      <div
        className={`w-full cursor-pointer rounded-lg bg-white px-4 py-3 text-xs text-black`}
      >
        <div className="flex justify-between">
          <div className="flex space-x-2" onClick={() => setOpen(true)}>
            <span>{name}</span>
            <span>|</span>
            <span>{gender}</span>
            <span>|</span>
            <span>{ageToday}세</span>
            <span>|</span>
            <span>{digit.slice(digit.length - 4)}</span>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <a href={`sms+${digit}?&body=안녕하세요`}>
              <Image src="/images/i-chat.png" alt="" width={20} height={20} />
            </a>
            <span>|</span>
            <a href={`tel:${digit}`}>
              <Image src="/images/i-phone.png" alt="" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
