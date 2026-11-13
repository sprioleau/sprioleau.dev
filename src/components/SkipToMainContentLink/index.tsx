import icons from "../Icons";

export default function SkipToMainContentLink() {
  return (
    <a
      href="#main-content"
      className="skip-to-main-content"
    >
      <p className="skip-to-main-content__label">Skip to main content</p>
      {icons.arrowRight}
    </a>
  );
}
