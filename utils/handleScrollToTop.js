const handleScrollToTop = (e, router) => {
  e.preventDefault();

  router.push("/");

  if (window !== undefined) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export default handleScrollToTop;
