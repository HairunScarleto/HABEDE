// ======================================================
// BAGIAN 1: LOGIKA PINDAH HALAMAN & EFEK SPESIAL
// ======================================================

function bukaGaleri() {
  const landingPage = document.getElementById("landing-page");
  const galleryPage = document.getElementById("gallery-page");

  // --- [BARU] PANGGIL EFEK LEDAKAN TEKS DI SINI ---
  ledakanHappyBirthday();

  // Animasi menghilangkan Landing Page
  landingPage.style.opacity = "0";
  landingPage.style.transform = "scale(0.9)";

  // Tunggu 0.8 detik sebelum mengganti tampilan ke galeri
  setTimeout(() => {
    landingPage.style.display = "none";
    landingPage.classList.remove("active-section");

    galleryPage.style.display = "block";

    setTimeout(() => {
      galleryPage.classList.remove("hidden-section");
      galleryPage.classList.add("active-section");
    }, 50);
  }, 800);
}

// --- [FUNGSI BARU] LEDAKAN TEKS "HAPPY BIRTHDAY" ---
function ledakanHappyBirthday() {
  // 1. Ledakan Konfeti Biasa (sebagai background meriah)
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ["#a1c4fd", "#c2e9fb", "#ff9a9e", "#fad0c4"],
  });

  // 2. Fungsi Helper untuk menembakkan Teks
  function tembakTeks(text, ukuran, delay) {
    setTimeout(() => {
      confetti({
        shapes: ["text"], // Bentuknya teks
        shapeOptions: {
          text: {
            value: text,
            font: "Fredoka One, cursive", // Font tebal lucu
          },
        },
        scalar: ukuran, // Ukuran teks (makin besar makin gede)
        particleCount: 15, // Jumlah teks per tembakan
        spread: 360, // Menyebar ke segala arah
        startVelocity: 35, // Kecepatan lontaran
        gravity: 0.6,
        origin: { x: 0.5, y: 0.5 }, // Meledak dari tengah layar
        colors: ["#FFD700", "#FF6B6B", "#4ECDC4", "#FFE66D"], // Warna-warni cerah
      });
    }, delay); // Delay agar munculnya bergantian
  }

  // 3. Tembakkan kata-kata secara berurutan
  tembakTeks("HAPPY", 5, 0); // Muncul langsung
  tembakTeks("BIRTHDAY", 5, 200); // Muncul setelah 200ms
  tembakTeks("🎂", 7, 400); // Emoji kue, lebih besar
  tembakTeks("🎉", 7, 600); // Emoji terompet
}

// ======================================================
// BAGIAN 2: LOGIKA MODAL FULLSCREEN (GAMBAR BESAR)
// ======================================================
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("full-image");
const captionText = document.getElementById("caption-text");
const photoCards = document.querySelectorAll(".photo-card");

photoCards.forEach((card) => {
  card.addEventListener("click", function () {
    const imgSource = this.querySelector("img").src;
    const caption = this.querySelector(".overlay span").innerText;
    tampilkanModal(imgSource, caption);
  });
});

function tampilkanModal(src, text) {
  modal.classList.add("modal-active");
  modalImg.src = src;
  captionText.innerHTML = text;

  // Kunci Scroll Body saat fullscreen
  document.body.style.overflow = "hidden";

  // Efek Confetti Tambahan saat buka foto
  confetti({
    particleCount: 100,
    spread: 120,
    origin: { x: 0.5, y: 0.5 },
    colors: ["#ff9a9e", "#fad0c4", "#a1c4fd", "#ffffff"],
    zIndex: 10000,
  });
}

function tutupModal() {
  modal.classList.remove("modal-active");
  // Kembalikan Scroll Body
  document.body.style.overflow = "auto";
}

modal.addEventListener("click", function (e) {
  if (e.target === modal) tutupModal();
});
