import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-row items-center space-x-3 bg-[#2d2d2d] px-6 py-6 text-sm text-white">
      <div>
        <Image src="/images/my-logo.png" alt="logo" width={42} height={33} />
      </div>
      <div className="flex flex-col space-y-1 text-xs">
        <div>문의: contact@miyongin.com / 010-1234-9999</div>
        <div className="text-gray-200">copyright 024 my-membership</div>
      </div>
    </footer>
  );
};

export default Footer;
