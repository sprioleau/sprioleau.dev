import { client, queries } from "@/libs/sanity";

import ContactCard from "./ContactCard";
import { ContactData } from "@/schemas/types";

export default async function Contact({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const contactContent = await client.fetch<ContactData>(queries.contact);

  return <ContactCard contact={contactContent} headingLevel={headingLevel} />;
}
