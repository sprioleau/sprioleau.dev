"use client";

import { type ContactData } from "@/schemas/types";
import handleCopyEmailToClipboard from "@/utils/handleCopyEmailToClipboard";
import icons from "../Icons";

export default function ContactCard({
  contact: { email, overline },
  headingLevel,
}: { contact: ContactData; headingLevel: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const [userName, serverDomain] = email.split("@");

  return (
    <a
      className="contact__card"
      href={`mailto:${email}`}
      onClick={(event) => handleCopyEmailToClipboard(event, email)}
    >
      <span className="icon mail-icon" aria-hidden>{icons.email}</span>
      <Heading className="contact__card-heading">{overline}</Heading>
      <p className="a contact__card-email">
        <span>{userName}</span>
        <span>@{serverDomain}</span>
      </p>
    </a>
  );
}
