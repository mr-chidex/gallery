export const assignRowSpans = () => {
  document.querySelectorAll(".masonry-item")?.forEach((item) => {
    const img = item.querySelector("img");
    if (img) {
      const rowSpan = Math.ceil(img.clientHeight / 10);
      item.style.setProperty("--rows", rowSpan);
    }
  });
};
