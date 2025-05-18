document.addEventListener("DOMContentLoaded", () => {
    const practitionerContainer = document.querySelector(".practitioner-list");

    fetch("../practitioners.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(practitioner => {
                const practitionerElement = document.createElement("div");
                practitionerElement.classList.add("practitioner");
                practitionerElement.id = practitioner.id;


                practitionerElement.innerHTML = `
                    <div className="profile">
                        <img src="${practitioner.headshot}" alt="${practitioner.name}'s headshot" class="headshot">
                        <p class="locations">${practitioner.locations}</p>
                        <h4 class="deskName">${practitioner.name}</h4>
                    </div>
                    <div class="info">
                        <div class="name-toggle">
                            <h4 class="name">${practitioner.name}</h4>
                            <span class="toggle-icon">+</span>
                        </div>
                        <p class="description">${practitioner.description}</p>
                    </div>
                `;

                practitionerContainer.appendChild(practitionerElement);
            });

            // Now attach the event listeners after the elements are in the DOM
            const nameToggles = document.querySelectorAll('.name-toggle');
            // FIXME: Toggled items keep padding top in wider view
    
            nameToggles.forEach(nameToggle => {
                nameToggle.addEventListener('click', () => {
                    const practitionerElement = nameToggle.closest('.practitioner');
                    const descriptionElement = practitionerElement.querySelector('.description');
                    const toggleIcon = nameToggle.querySelector('.toggle-icon');
                    
                    // Check if element is currently expanded (height not zero)
                    if (descriptionElement.style.height && descriptionElement.style.height !== '45px') {
                        // Collapse the description and reset margin-bottom
                        descriptionElement.style.paddingTop = '0px';
                        descriptionElement.style.height = '45px';
                        nameToggle.style.marginBottom = '0px';
                        toggleIcon.innerHTML = '+';
                    } else {
                        // Expand the description: dynamically set the height to scrollHeight
                        const contentHeight = descriptionElement.scrollHeight;
                        descriptionElement.style.height = contentHeight + 45 + 'px';
                        descriptionElement.style.paddingTop = '55px';
                        // Set .name-toggle's margin-bottom to match the content's height
                        nameToggle.style.marginBottom = contentHeight + 55 + 'px';
                        toggleIcon.innerHTML = '−';
                    }
                });
                
            });
        })
        .catch(error => console.error('Error fetching practitioners:', error));
});
