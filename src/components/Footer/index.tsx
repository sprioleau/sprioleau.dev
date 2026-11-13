import { fetchContributions } from "@/libs/github";
import { client, queries } from "@/libs/sanity";
import { type FooterData } from "@/schemas/types";
import getClaps from "@/utils/getClaps";
import Link from "next/link";
import FooterContent from "../FooterContent";
import PortableTextBlock from "../PortableTextBlock";

export default async function Footer() {
  const [footerContent, { contributions }, { data: claps }] = await Promise.all([
    client.fetch<FooterData>(queries.footer),
    fetchContributions(),
    getClaps(),
  ]);

  return (
    <footer className="footer">
      <div className="container">
        <FooterContent contributions={contributions} serverClapCount={claps ?? 0}>
          {footerContent.body.map(({ _key, children, markDefs }) => (
            <p key={_key} className="footer__message">
              <PortableTextBlock childrenContent={children} markDefs={markDefs} linksClass="shadow-link" />
            </p>
          ))}
        </FooterContent>
        <p className="footer__privacy"><Link href="/privacy" className="shadow-link">Privacy</Link></p>
      </div>
    </footer>
  );
}
