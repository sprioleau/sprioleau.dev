import { ActionIndicator } from "@/components";

type Props = {
  advanceToSectionSlug: string;
  className: string;
};

export default function AdvanceToNextSectionButton({
  advanceToSectionSlug,
  className,
}: Props) {
  return (
    <a
      className={className}
      aria-label={`Scroll to ${advanceToSectionSlug}`}
      href={`/#${advanceToSectionSlug}`}
    >
      <ActionIndicator
        size="5rem"
        variant="lg"
      />
    </a>
  );
}
