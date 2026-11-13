import { type MouseEvent } from "react";
import toastMessage from "./toastMessage";

export default async function handleCopyEmailToClipboard(event: MouseEvent<HTMLAnchorElement>, email: string) {
  if (!navigator.clipboard || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;

  const fallbackUrl = event.currentTarget.href;
  event.preventDefault();

  try {
    await navigator.clipboard.writeText(email);
    toastMessage("Email address successfully copied!", "email");
  } catch {
    window.location.href = fallbackUrl;
  }
}
