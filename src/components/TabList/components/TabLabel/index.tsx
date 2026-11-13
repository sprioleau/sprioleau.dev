import { type Experience } from "@/schemas/types";
import { urlFor } from "@/libs/sanity";
import formatJobDates from "@/utils/formatJobDates";
import Image from "next/image";

export default function TabLabel({ experience }: { experience: Experience }) {
  const { label, fromDate, toDate, currentlyInRole, employer } = experience;

  return (
    <>
      {employer?.logo && (
        <Image
          src={urlFor(employer.logo).width(24).height(24).fit("scale").auto("format").url()}
          alt=""
          width={24}
          height={24}
          className="tab-list__employer-logo"
        />
      )}
      <span className="tab-list__label-text">
        <span className="tab-list__label-title">{label}</span>
        <span className="tab-list__sublabel">{formatJobDates(fromDate, toDate, currentlyInRole)}</span>
      </span>
    </>
  );
}
