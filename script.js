// Ambil elemen audio dan tombol
const audio = document.getElementById("myAudio");
const musicBtnText = document.getElementById("musicBtnText");
const musicIcon = document.getElementById("musicIcon");

function toggleAudio() {
    if (audio.paused) {
        // Jika audio mati, putar lagunya
        audio.play()
            .then(() => {
                musicBtnText.innerText = "Musik: On ✨";
                musicIcon.classList.add("animate-spin"); // Efek putar icon lucide
            })
            .catch(error => {
                console.log("Pemutaran audio diblokir browser:", error);
            });
    } else {
        // Jika audio hidup, matikan lagunya
        audio.pause();
        musicBtnText.innerText = "Musik: Off";
        musicIcon.classList.remove("animate-spin");
    }
}

const CORRECT_PIN = "131106"; // ganti PIN

function checkPin() {
    const inputField = document.getElementById("pinInput");
    const lockScreen = document.getElementById("lockScreen");
    const errorText = document.getElementById("pinError");
    
    // Ambil elemen sound effect baru
    const correctSound = document.getElementById("correctSound");
    const wrongSound = document.getElementById("wrongSound");
    
    if (inputField.value === CORRECT_PIN) {
        // 1. Putar sound effect BENAR
        if (correctSound) correctSound.play();

        // Efek memudar saat PIN benar
        lockScreen.style.opacity = "0";
        lockScreen.style.pointerEvents = "none";
        setTimeout(() => {
            lockScreen.classList.add("hidden");
            if (typeof triggerConfettiBurst === 'function') triggerConfettiBurst(); 
            if (typeof toggleAudio === 'function') toggleAudio(); 
        }, 700);
    } else {
        // 2. Putar sound effect SALAH
        if (wrongSound) {
            wrongSound.currentTime = 0; // Reset audio ke awal agar bisa dimainkan berulang saat diklik cepat
            wrongSound.play();
        }

        // Tampilkan pesan error jika salah
        errorText.classList.remove("hidden");
        inputField.value = "";
        inputField.focus();
        
        inputField.classList.add("border-rose-400");
        setTimeout(() => {
            inputField.classList.remove("border-rose-400");
        }, 1000);
    }
}

// Menjalankan fungsi login jika menekan tombol Enter pada keyboard
document.getElementById("pinInput")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkPin();
    }
});

