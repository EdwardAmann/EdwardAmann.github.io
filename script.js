const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const typeTargets = [
  ".hero-content .eyebrow",
  "#hero-title",
  ".intro",
  ".intro-band .label",
  ".intro-band p",
  ".section-heading .eyebrow",
  ".section-heading h2",
  ".project-type",
  ".project-copy h3",
  ".project-copy p:not(.project-type)",
  ".about-copy p",
  ".contact h2",
  ".email-text",
  "footer p"
];

const elements = document.querySelectorAll(typeTargets.join(", "));

if (!prefersReducedMotion) {
  elements.forEach((element) => {
    const text = element.textContent.trim();

    if (!text) {
      return;
    }

    element.dataset.typeText = text;
    element.dataset.typeDone = "false";
    element.style.minHeight = `${element.offsetHeight}px`;
    element.textContent = "";
    element.classList.add("typewriter-ready");
  });

  const typeElement = (element) => {
    if (element.dataset.typeDone === "true") {
      return;
    }

    const text = element.dataset.typeText;
    let index = 0;
    element.dataset.typeDone = "true";
    element.classList.add("is-writing");

    const speed = element.matches("h1") ? 42 : 18;

    const writeNextCharacter = () => {
      element.textContent = text.slice(0, index);
      index += 1;

      if (index <= text.length) {
        window.setTimeout(writeNextCharacter, speed);
      } else {
        element.classList.remove("is-writing");
        element.style.minHeight = "";
      }
    };

    writeNextCharacter();
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          typeElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -12% 0px",
      threshold: 0.22
    }
  );

  elements.forEach((element) => observer.observe(element));
}
