window.addEventListener("load", function() {
    // Check if the URL contains an anchor
    const hash = window.location.hash;
    
    if (hash) {
      const targetElement = document.querySelector(hash);
  
      // Get the height of the navbar from the CSS variable
      const navHeight = getComputedStyle(document.documentElement).getPropertyValue('--nav-height');
  
      if (targetElement) {
        // Scroll the page to the target element, offset by the navbar height
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - parseInt(navHeight);
  
        // Adjust the scroll position
        window.scrollTo({
          top: offsetPosition,
          // behavior: "smooth" // Optional smooth scroll
        });
      }
    }
  });
  