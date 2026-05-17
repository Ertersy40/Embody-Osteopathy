// loadPractitioners.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".practitioner-list");
  if (!container) return;

  // 1) Fetch & render practitioners
  fetch("../practitioners.json")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      data.forEach((p) => {
        const el = document.createElement("div");
        el.classList.add("practitioner");
        el.id = p.id;

        // Build headshot: either an <img> or a coloured placeholder
        const headshotHTML = (!p.headshot || p.headshot === 'NA')
          ? `<div class="headshot headshot-placeholder" aria-label="${p.name}'s headshot"></div>`
          : `<img src="${p.headshot}" alt="${p.name}'s headshot" class="headshot">`;

        el.innerHTML = `
                    <div className="profile">
                        ${headshotHTML}
                        <p class="locations">${p.locations}</p>
                        <h4 class="deskName">${p.name}</h4>
                    </div>
                    <div class="info">
                        <div class="name-toggle">
                            <h4 class="name">${p.name}</h4>
                            <span class="toggle-icon">+</span>
                        </div>
                        <p class="description">${p.description}</p>
                    </div>
                `;

        container.appendChild(el);
      });

      // 2) Attach toggles
      container.querySelectorAll(".name-toggle").forEach((toggle) => {
        toggle.addEventListener("click", () => {
          const parent = toggle.closest(".practitioner");
          const desc = parent.querySelector(".description");
          const icon = toggle.querySelector(".toggle-icon");
          const collapsedHeight = 45;
          const padTop = 55;

          if (desc.style.height && desc.style.height !== `${collapsedHeight}px`) {
            // collapse
            desc.style.height = `${collapsedHeight}px`;
            desc.style.paddingTop = `0`;
            toggle.style.marginBottom = `0`;
            icon.textContent = "+";
          } else {
            // expand
            const full = desc.scrollHeight;
            desc.style.height = `${full + collapsedHeight}px`;
            desc.style.paddingTop = `${padTop}px`;
            toggle.style.marginBottom = `${full + padTop}px`;
            icon.textContent = "−";
          }
        });
      });

      // 3) Scroll to any #hash now that the items exist
      const scrollToHash = () => {
        const { hash } = window.location;
        if (!hash) return;
        const target = document.querySelector(hash);
        if (!target) return;

        const navHeight = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--nav-height")
        ) || 0;

        const top = target.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top - navHeight, behavior: "smooth" });
      };

      // let the browser finish layout, then scroll
      requestAnimationFrame(scrollToHash);
    })
    .catch((err) => console.error("Error loading practitioners:", err));
});
