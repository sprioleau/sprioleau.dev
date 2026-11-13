import { client, queries } from "@/libs/sanity";
import { contactParagraphs } from "@/portfolio/contact";
import { portfolioOwner } from "@/portfolio/routes";

import ContactCard from "./ContactCard";
import { ContactData } from "@/schemas/types";

export default async function Contact({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const contactContent = await client.fetch<ContactData>(queries.contact);

  return (
    <>
      {headingLevel === 2 && (
        <div className="contact__details">
          {contactParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <ul className="contact__profiles">
            <li><a href={portfolioOwner.gitHubUrl}>GitHub profile</a></li>
            <li><a href={portfolioOwner.linkedInUrl}>LinkedIn profile</a></li>
          </ul>
        </div>
      )}
      <ContactCard contact={contactContent} headingLevel={headingLevel} />
    </>
  );
}
