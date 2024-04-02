import Image from "next/image";
import MemberServiceModal from "./MemberServiceModal";
import MemberPrivacyModal from "./MemberPrivacyModal";
import { useState } from "react";

const Footer = () => {
  const [openServiceModal, setOpenServiceModal] = useState<boolean>(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState<boolean>(false);

  return (
    <footer className="relative flex flex-row  space-x-5 bg-[#2d2d2d] px-6 py-6 text-sm text-white">
      {openServiceModal && (
        <MemberServiceModal
          open={openServiceModal}
          setOpen={setOpenServiceModal}
        />
      )}
      {openPrivacyModal && (
        <MemberPrivacyModal
          open={openPrivacyModal}
          setOpen={setOpenPrivacyModal}
        />
      )}
      <div>
        <Image
          src="/images/my_mem_logo.png"
          alt="logo"
          width={42}
          height={33}
        />
      </div>
      <div className="flex flex-col space-y-1 text-xs">
        <div>
          <span onClick={() => setOpenServiceModal(true)}>이용약관</span>
          <span className="px-2">|</span>
          <span onClick={() => setOpenPrivacyModal(true)}>
            개인정보처리방침
          </span>
        </div>
        <div>문의: korhyek@naver.com </div>
        <div className="text-gray-200">copyright 2024 my-membership</div>
      </div>
    </footer>
  );
};

export default Footer;
