document.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash;
  if (!hash) return;

  // Let the browser do its native jump first
  requestAnimationFrame(() => {
    const target = document.querySelector(hash);
    if (!target) return;

    // Pull your nav height, strip non-digits
    const navHeight =
      parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-height')
      ) || 0;

    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top - navHeight,
      behavior: 'smooth'
    });
  });
});
