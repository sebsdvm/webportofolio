// Inisialisasi AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  once: true
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    // Menampilkan/menyembunyikan menu saat hamburger diklik
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Menutup menu saat link navigasi diklik (khusus mobile)
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            // Tambahkan logika untuk garis bawah aktif jika diperlukan
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });

    // Mengatur kelas 'active' saat halaman dimuat
    const setActiveLink = () => {
        const currentHash = window.location.hash || '#home';
        navItems.forEach(link => {
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    setActiveLink();
    window.addEventListener('hashchange', setActiveLink);

    // Mengaktifkan link saat scroll
    const sections = document.querySelectorAll('section, header');
    const options = {
        root: null,
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                const correspondingLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
                if (correspondingLink) {
                    navItems.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const textElement = document.getElementById('job-title');
    
    // 💡 Daftar teks yang akan dianimasikan
    const textsToAnimate = [
        "High School Student.",
        "Front-End Developer.",
        
    ];
    
    let textIndex = 0;   // Indeks untuk array textsToAnimate
    let charIndex = 0;   // Indeks untuk karakter dalam satu teks
    let isDeleting = false;
    
    const typingSpeed = 150;     // Kecepatan mengetik (ms)
    const deletingSpeed = 80;    // Kecepatan menghapus (ms)
    const pauseTime = 1000;      // Jeda setelah selesai mengetik (ms)
    const newTextDelay = 500;    // Jeda setelah selesai menghapus sebelum mulai teks baru (ms)

    function typeWriter() {
        // Teks yang sedang dikerjakan saat ini
        const currentText = textsToAnimate[textIndex]; 

        if (!isDeleting) {
            // ➡️ Logika Mengetik
            if (charIndex < currentText.length) {
                // Tambahkan karakter berikutnya
                textElement.textContent += currentText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                isDeleting = true;
                setTimeout(typeWriter, pauseTime); 
            }
        } else {
            if (charIndex > 0) {
                textElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(typeWriter, deletingSpeed);
            } else {
                isDeleting = false;
                textIndex = (textIndex + 1) % textsToAnimate.length; 
                setTimeout(typeWriter, newTextDelay); 
            }
        }
    }
    typeWriter();
});
