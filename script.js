// Custom Cursor Removed

// Scroll Animations (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            // Optional: Remove class to re-animate on scroll up
            // entry.target.classList.remove('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el, index) => {
    // Add staggered delays for children in specific containers if needed
    // This is a simple implementation; CSS transition-delay can be handled more robustly
    observer.observe(el);
});

// Mobile Navbar Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Hamburger animation
    hamburger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Glitch Effect for Title (optional JS enhancement)
const glitchText = document.querySelector('.glitch');
// We can add random glitching intervals here if we want more than just CSS hover

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formResult = document.getElementById('formResult');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        formResult.innerHTML = "Please wait...";
        formResult.style.color = "var(--text-secondary)";

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    formResult.innerHTML = "Message sent successfully!";
                    formResult.style.color = "var(--primary-color)";
                    contactForm.reset();
                } else {
                    console.log(response);
                    formResult.innerHTML = json.message;
                    formResult.style.color = "var(--secondary-color)";
                }
            })
            .catch(error => {
                console.log(error);
                formResult.innerHTML = "Something went wrong!";
                formResult.style.color = "var(--secondary-color)";
            })
            .then(function () {
                setTimeout(() => {
                    formResult.innerHTML = "";
                }, 5000);
            });
    });
}