// Xử lý scroll khi nhấn nút "Xem thêm"
document.querySelectorAll('.see-more').forEach((button, index) => {
    button.addEventListener('click', function (event) {
        event.stopPropagation(); // Ngăn chặn sự kiện lan đến radio button

        const sectionId = `section${index + 1}`;
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// Thêm hiệu ứng fade khi scroll
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Xử lý active state cho navigation
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

function changeImage(num) {
    const imagePath = `./img/da_${num}.png`;
    const displayImage = document.getElementById("displayImage");
    if (displayImage) {
        displayImage.src = imagePath;
        
        // Add loading error handling
        displayImage.onerror = function() {
            console.error(`Failed to load image: ${imagePath}`);
            displayImage.src = './img/da_1.png'; // Fallback to first image
        };
    }
}

