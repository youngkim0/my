import Image from "next/image";
import MemberServiceModal from "./MemberServiceModal";
import MemberPrivacyModal from "./MemberPrivacyModal";
import { useState } from "react";

const Footer = () => {
  const [openServiceModal, setOpenServiceModal] = useState<boolean>(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState<boolean>(false);

  return (
    <footer className="flex flex-row items-center space-x-5 bg-[#2d2d2d] px-6 py-6 text-sm text-white">
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
        <Image src="/images/my-logo.png" alt="logo" width={70} height={60} />
      </div>
      <div className="flex flex-col space-y-1 text-xs">
        <div>문의: korhyek@naver.com </div>
        <div>
          <span onClick={() => setOpenServiceModal(true)}>이용약관</span>
          <span className="px-2">|</span>
          <span onClick={() => setOpenPrivacyModal(true)}>
            개인정보처리방침
          </span>
        </div>
        <div className="text-gray-200">copyright 2024 my-membership</div>
      </div>
    </footer>
  );
};

export default Footer;
