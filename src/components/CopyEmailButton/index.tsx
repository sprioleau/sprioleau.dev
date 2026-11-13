"use client";

import handleCopyEmailToClipboard from "@/utils/handleCopyEmailToClipboard";

type Props = {
  email: string;
  className: string;
};

export default function CopyEmailButton({ email, className }: Props) {
  return (
    <a
      className={className}
      href={`mailto:${email}`}
      onClick={(event) => handleCopyEmailToClipboard(event, email)}
    >
      {email}
    </a>
  );
}
