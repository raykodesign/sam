document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS PRINCIPALES ---
    const enterScreen = document.getElementById('enter-screen');
    const enterBtn = document.getElementById('enter-btn');
    const mainLayout = document.getElementById('main-layout');
    const typingText = document.getElementById('typing-text');
    const audio = document.getElementById('audio');
    const vinyl = document.getElementById('vinyl');
    const playIcon = document.getElementById('play-icon');
    const progressBar = document.getElementById('progress-bar');

    // --- 1. ENTRADA ---
    enterBtn.addEventListener('click', () => {
        enterScreen.style.opacity = '0';
        setTimeout(() => {
            enterScreen.style.display = 'none';
            mainLayout.classList.remove('hidden-layout');
            initTypewriter();
            playMusic();
        }, 800);
    });

    // --- MAQUINA DE ESCRIBIR ---
    const welcomeMsg = "La vida son problemas y toda persona que quiera obtener cualquier éxito se va a tener que montar a la montaña rusa de la vida. A mayor sueño, mayores problemas encontrarás. ¿No quieres tener problemas? Deja de soñar.";
    function initTypewriter() {
        let i = 0;
        typingText.innerHTML = "";
        function type() {
            if (i < welcomeMsg.length) {
                typingText.innerHTML += welcomeMsg.charAt(i);
                i++;
                setTimeout(type, 35); // Un poco más rápido
            }
        }
        type();
    }

    // --- 2. GESTIÓN DE MODALES ---
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        mainLayout.style.filter = "blur(10px) grayscale(50%)";
        mainLayout.style.transform = "scale(0.98)";
        
        if(modalId === 'modal-gallery') setTimeout(updateGallery3D, 100);
        if(modalId === 'modal-vip') {
            // Resetear pantalla de bloqueo al abrir
            document.getElementById('vip-lock-screen').style.display = 'flex';
            document.getElementById('vip-gallery-content').style.display = 'none';
            document.getElementById('vip-password').value = '';
            document.getElementById('vip-error').style.display = 'none';
        }
    };

    window.closeModal = function(modalId) {
        document.getElementById(modalId).classList.remove('active');
        mainLayout.style.filter = "none";
        mainLayout.style.transform = "scale(1)";
    };
    
    window.onclick = (e) => {
        if (e.target.classList.contains('modal')) closeModal(e.target.id);
    };


    // --- 3. GALERÍA 3D (ARREGLADA) ---
    const galleryImages = [
        "https://xatimg.com/image/7bnH4qCHobWJ.jpg",
        "https://xatimg.com/image/7EhzrIizvBlp.jpg",
        "https://xatimg.com/image/v1CRCJwUEysy.jpg",
    ];
    
    const carouselTrack = document.getElementById('carousel-3d-track');
    let galleryIndex = 2;

    // Crear cartas
    carouselTrack.innerHTML = "";
    galleryImages.forEach((src, i) => {
        const card = document.createElement('div');
        card.className = 'card-3d-gold';
        card.innerHTML = `<img src="${src}" alt="Img ${i}">`;
        card.onclick = () => { galleryIndex = i; updateGallery3D(); };
        carouselTrack.appendChild(card);
    });

    // Función matemática robusta para centrar
    window.updateGallery3D = () => {
        const cards = document.querySelectorAll('#carousel-3d-track .card-3d-gold');
        if(!cards.length) return;
        
        cards.forEach(c => c.classList.remove('active'));
        if(cards[galleryIndex]) cards[galleryIndex].classList.add('active');

        // CALCULO DE CENTRADO EXACTO
        // 1. Ancho de la carta + Margen (20px izquierda + 20px derecha = 40px)
        const fullCardWidth = cards[0].offsetWidth + 40; 
        
        // 2. Ancho del contenedor padre
        const containerWidth = carouselTrack.parentElement.offsetWidth;

        // 3. Fórmula: Centro del contenedor - (Posición de la carta + Mitad de su ancho)
        // El +20 es para compensar el margen izquierdo inicial
        const centerPosition = (containerWidth / 2) - (galleryIndex * fullCardWidth) - (fullCardWidth / 2) + 20;

        carouselTrack.style.transform = `translateX(${centerPosition}px)`;
    };

    window.moveGallery = (dir) => {
        galleryIndex += dir;
        if(galleryIndex < 0) galleryIndex = galleryImages.length - 1;
        if(galleryIndex >= galleryImages.length) galleryIndex = 0;
        updateGallery3D();
    };


    // --- 4. ZONA VIP (NUEVA LÓGICA) ---
    const vipImages = [
        "https://xatimg.com/image/rjR8fI693Cru.jpg",
        "https://xatimg.com/image/JJWaN2ig2FLc.jpg",
        "https://xatimg.com/image/riz8goKdP6L1.jpg",
    ];
    const vipTrack = document.getElementById('carousel-vip-track');
    let vipIndex = 1;

    // Crear cartas VIP
    vipTrack.innerHTML = "";
    vipImages.forEach((src, i) => {
        const card = document.createElement('div');
        card.className = 'card-3d-gold';
        card.innerHTML = `<img src="${src}">`;
        card.onclick = () => { vipIndex = i; updateVipGallery(); };
        vipTrack.appendChild(card);
    });

    window.checkVipPassword = () => {
        const pass = document.getElementById('vip-password').value;
        const errorMsg = document.getElementById('vip-error');
        
        // CONTRASEÑA: 2024 (Cámbiala aquí si quieres)
        if(pass === "2024") {
            document.getElementById('vip-lock-screen').style.display = 'none';
            document.getElementById('vip-gallery-content').style.display = 'block';
            setTimeout(updateVipGallery, 100);
        } else {
            errorMsg.style.display = 'block';
            setTimeout(() => errorMsg.style.display = 'none', 2000);
        }
    };

    window.updateVipGallery = () => {
        const cards = document.querySelectorAll('#carousel-vip-track .card-3d-gold');
        if(!cards.length) return;
        cards.forEach(c => c.classList.remove('active'));
        if(cards[vipIndex]) cards[vipIndex].classList.add('active');
        
        const fullCardWidth = cards[0].offsetWidth + 40; 
        const containerWidth = vipTrack.parentElement.offsetWidth;
        const centerPosition = (containerWidth / 2) - (vipIndex * fullCardWidth) - (fullCardWidth / 2) + 20;
        vipTrack.style.transform = `translateX(${centerPosition}px)`;
    };

    window.moveVipGallery = (dir) => {
        vipIndex += dir;
        if(vipIndex < 0) vipIndex = vipImages.length - 1;
        if(vipIndex >= vipImages.length) vipIndex = 0;
        updateVipGallery();
    };


    // --- 5. MÚSICA & EXTRAS ---
    const playlist = [
        { title: "Golden Hour", artist: "Synthwave", src: "audio/Kevin Kaarl - Colapso.mp3" },
    ];
    let sIdx = 0; let isPlaying = false; let pInt;

    function loadMusic(i) {
        audio.src = playlist[i].src;
        document.getElementById('song-title').innerText = playlist[i].title;
        document.getElementById('song-artist').innerText = playlist[i].artist;
    }
    
    window.playMusic = () => {
        audio.play().then(() => {
            isPlaying = true;
            vinyl.classList.add('vinyl-spin');
            playIcon.className = "fas fa-pause";
            pInt = setInterval(() => {
                progressBar.style.width = (audio.currentTime/audio.duration)*100 + "%";
            }, 100);
        }).catch(() => {});
    };
    
    window.togglePlay = () => {
        if(isPlaying) {
            audio.pause(); isPlaying = false;
            vinyl.classList.remove('vinyl-spin');
            playIcon.className = "fas fa-play";
            clearInterval(pInt);
        } else {
            playMusic();
        }
    };
    
    window.nextSong = () => { sIdx=(sIdx+1)%playlist.length; loadMusic(sIdx); playMusic(); };
    window.prevSong = () => { sIdx=(sIdx-1+playlist.length)%playlist.length; loadMusic(sIdx); playMusic(); };
    loadMusic(0);

    // Ajuste al cambiar tamaño de ventana para que la galería no se descentre
    window.addEventListener('resize', () => {
        updateGallery3D();
        updateVipGallery();
    });
});