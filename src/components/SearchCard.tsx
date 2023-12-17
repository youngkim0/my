import { useState } from "react";
import {
  ChatBubbleBottomCenterIcon,
  PhoneArrowUpRightIcon,
} from "@heroicons/react/24/solid";
import CustomerModal from "./CustomerModal";

const SearchCard = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open && <CustomerModal open={open} setOpen={setOpen} />}
      <div
        className={`w-full cursor-pointer rounded-lg bg-blue-900         px-4 py-3 text-sm text-white`}
        onClick={() => setOpen(true)}
      >
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <span>강영식 남</span>
            <span>|</span>
            <span>32세</span>
            <span>|</span>
            <span>2928</span>
          </div>
          <div className="flex flex-row items-center space-x-3">
            <a href="sms+01000000000?&body=안녕하세요">
              <ChatBubbleBottomCenterIcon className="h-4 w-4" />
            </a>
            <span>|</span>
            <a href="tel:01033333333">
              <PhoneArrowUpRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
