import Image from "next/image";
import { useState } from "react";
import ServiceModal from "./ServiceModal";
import type { Service } from "@prisma/client";

const ServiceCard = ({
  service,
  owner,
}: {
  service: Service;
  owner: boolean;
}) => {
  const [showDetail, setShowDetail] = useState<boolean>(false);

  return (
    <>
      <ServiceModal
        open={showDetail}
        setOpen={setShowDetail}
        service={service}
        owner={owner}
      />
      <div
        className="flex h-[231px] w-[208px] cursor-pointer flex-col items-center rounded-xl border border-solid border-gray-100 bg-white"
        onClick={() => setShowDetail(true)}
      >
        <div
          className="h-[123px] w-full rounded-t-lg"
          style={{
            backgroundImage: `url(${service.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="line-clamp-4 px-2 py-2 leading-6 text-black">
          <p className="px-2 py-1 text-left text-base font-bold">
            {service.name}
          </p>
          <div className="line-clamp-3 px-2 text-xs leading-5">
            {service.content}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
