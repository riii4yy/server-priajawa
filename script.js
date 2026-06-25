/* =========================================================
   SERVER PRIA JAWA — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  initNavbar();
  initScrollFadeIn();
  initMemberStats();
  initLiveFeed();
  initStaffAvatars();
  initGames();
  initGallery();
  initAccordion();
  initMusicPlayer();
});

/* ---------------------------------------------------------
   Tahun di footer
--------------------------------------------------------- */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   NAVBAR: burger menu mobile + tutup saat klik link
--------------------------------------------------------- */
function initNavbar() {
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('navMenu');
  if (!burger || !menu) return;

  burger.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------
   ANIMASI SCROLL (fade-in / slide-up) via IntersectionObserver
--------------------------------------------------------- */
function initScrollFadeIn() {
  const items = document.querySelectorAll('.fade-in');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

/* ---------------------------------------------------------
   STATISTIK MEMBER — Discord Widget API
--------------------------------------------------------- */

// >>> EDIT DI SINI: total member server, isi manual karena widget.json
// Discord TIDAK menyediakan jumlah total member, hanya member online.
const totalMemberManual = 20; // <-- ganti angka ini sesuai jumlah member asli

const GUILD_ID = '1455762620907913409';
const WIDGET_URL = `https://discord.com/api/guilds/${GUILD_ID}/widget.json`;

async function initMemberStats() {
  const onlineEl = document.getElementById('onlineCount');
  const totalEl = document.getElementById('totalCount');

  // Tampilkan dulu nilai manual untuk total member
  if (totalEl) animateCounter(totalEl, totalMemberManual);

  try {
    const res = await fetch(WIDGET_URL);
    if (!res.ok) throw new Error('Widget fetch gagal: ' + res.status);
    const data = await res.json();
    const presenceCount = typeof data.presence_count === 'number' ? data.presence_count : 0;
    if (onlineEl) animateCounter(onlineEl, presenceCount);
  } catch (err) {
    // Fallback ke data dummy supaya halaman tidak rusak jika widget
    // nonaktif / server private / koneksi gagal.
    console.warn('Gagal mengambil data widget Discord, pakai data dummy.', err);
    if (onlineEl) animateCounter(onlineEl, 0);
  }
}

// Animasi counter naik dari 0 -> target
function animateCounter(el, target) {
  const duration = 900;
  const start = performance.now();
  const startVal = 0;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(startVal + (target - startVal) * progress);
    el.textContent = value.toLocaleString('id-ID');
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------
   LIVE FEED JOIN/LEAVE (mock data)

   CARA INTEGRASI KE DATA REAL-TIME DI MASA DEPAN:
   1. Buat bot Discord (discord.js / discord.py) yang mendengarkan
      event guildMemberAdd & guildMemberRemove.
   2. Saat event terjadi, bot mengirim data (nama, avatar, waktu,
      status join/leave) ke endpoint backend kamu (mis. via webhook
      ke server Node/Express, Cloudflare Worker, atau Firebase).
   3. Endpoint itu menyimpan log ke database (mis. Firestore/Supabase).
   4. Website ini (script.js) fetch data tersebut secara periodic
      (mis. setInterval tiap 10-30 detik) atau pakai WebSocket untuk
      live update, lalu render ke #liveFeedList seperti fungsi di
      bawah ini.
--------------------------------------------------------- */
const mockLiveFeed = [
  { name: 'Damar_07', type: 'join', time: '2 menit lalu' },
  { name: 'Kirana.ml', type: 'join', time: '8 menit lalu' },
  { name: 'BimaSakti', type: 'leave', time: '15 menit lalu' },
  { name: 'AyuPetir', type: 'join', time: '32 menit lalu' },
  { name: 'GatotkacaFF', type: 'join', time: '1 jam lalu' },
];

function initLiveFeed() {
  const list = document.getElementById('liveFeedList');
  if (!list) return;

  list.innerHTML = mockLiveFeed.map(item => `
    <li class="livefeed__item ${item.type === 'leave' ? 'livefeed__item--leave' : ''}">
      <span class="livefeed__avatar">${item.type === 'leave' ? '🔴' : '🟢'}</span>
      <span class="livefeed__name">${escapeHTML(item.name)}</span>
      <span>${item.type === 'leave' ? 'keluar server' : 'bergabung ke server'}</span>
      <span class="livefeed__time">${escapeHTML(item.time)}</span>
    </li>
  `).join('');
}

/* ---------------------------------------------------------
   GAME YANG DIMAINKAN

   >>> EDIT DI SINI: tambah/ubah game di array `games`.
--------------------------------------------------------- */
const games = [
  { name: 'Minecraft', icon: '🧱', desc: 'Komunitas survival, build, dan minigame Minecraft. Server SMP tersedia khusus member.' },
  { name: 'Free Fire', icon: '🔥', desc: 'Mabar squad rank maupun fun, sharing tips rotasi & loadout terbaik.' },
  { name: 'Mobile Legends', icon: '⚔️', desc: 'Push rank bareng, scrim santai, dan diskusi meta hero tiap update.' },
  { name: 'PUBG Mobile', icon: '🎯', desc: 'Squad classic & TDM, drop bareng dengan komunikasi yang asik.' },
  { name: 'Roblox', icon: '🧩', desc: 'Main berbagai game Roblox bareng, dari obby sampai roleplay.' },
  { name: 'Game Lain', icon: '➕', desc: 'Main game lain? Share juga di channel komunitas, siapa tahu nemu squad baru!' },
];

function initGames() {
  const grid = document.getElementById('gameGrid');
  if (!grid) return;

  grid.innerHTML = games.map((g, i) => `
    <button class="game-card" type="button" data-game-index="${i}">
      <span class="game-card__icon">${g.icon}</span>
      <span class="game-card__name">${escapeHTML(g.name)}</span>
    </button>
  `).join('');

  const modal = document.getElementById('gameModal');
  const modalTitle = document.getElementById('modalGameTitle');
  const modalText = document.getElementById('modalGameText');

  grid.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('click', () => {
      const game = games[Number(card.dataset.gameIndex)];
      modalTitle.textContent = `${game.icon} ${game.name}`;
      modalText.textContent = game.desc;
      modal.hidden = false;
    });
  });

  modal.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => { modal.hidden = true; });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modal.hidden = true;
  });
}

/* ---------------------------------------------------------
   GALERI FOTO

   >>> EDIT DI SINI: tambah foto baru ke array `gallery`.
   Pakai nama file konsisten (foto1.jpg, foto2.jpg, dst) di
   folder /assets/gallery/ supaya tinggal timpa file tanpa
   ubah kode ini.
--------------------------------------------------------- */
const gallery = [
  { src: 'assets/gallery/foto1.jpg', caption: 'Caption 1' },
  { src: 'assets/gallery/foto2.jpg', caption: 'Caption 2' },
  { src: 'assets/gallery/foto3.jpg', caption: 'Caption 3' },
];

let currentLightboxIndex = 0;

function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = gallery.map((item, i) => `
    <div class="gallery-item" data-index="${i}">
      <img src="${item.src}" alt="${escapeHTML(item.caption)}" loading="lazy"
           onerror="this.closest('.gallery-item').style.display='none'">
      <span class="gallery-item__caption">${escapeHTML(item.caption)}</span>
    </div>
  `).join('');

  grid.querySelectorAll('.gallery-item').forEach(el => {
    el.addEventListener('click', () => openLightbox(Number(el.dataset.index)));
  });

  const lightbox = document.getElementById('lightbox');
  lightbox.querySelectorAll('[data-close-lightbox]').forEach(btn => {
    btn.addEventListener('click', () => { lightbox.hidden = true; });
  });
  document.getElementById('lightboxPrev').addEventListener('click', () => navigateLightbox(-1));
  document.getElementById('lightboxNext').addEventListener('click', () => navigateLightbox(1));
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') lightbox.hidden = true;
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  renderLightbox();
  document.getElementById('lightbox').hidden = false;
}

function navigateLightbox(dir) {
  currentLightboxIndex = (currentLightboxIndex + dir + gallery.length) % gallery.length;
  renderLightbox();
}

function renderLightbox() {
  const item = gallery[currentLightboxIndex];
  document.getElementById('lightboxImg').src = item.src;
  document.getElementById('lightboxImg').alt = item.caption;
  document.getElementById('lightboxCaption').textContent = item.caption;
}

/* ---------------------------------------------------------
   FAQ ACCORDION
--------------------------------------------------------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion__item');
  items.forEach(item => {
    const trigger = item.querySelector('.accordion__trigger');
    const panel = item.querySelector('.accordion__panel');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      // Tutup item lain (accordion single-open). Hapus blok ini
      // jika ingin beberapa item terbuka bersamaan.
      items.forEach(other => {
        if (other !== item) {
          other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
          other.querySelector('.accordion__panel').style.maxHeight = null;
        }
      });

      trigger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
    });
  });
}

/* ---------------------------------------------------------
   MUSIK — playlist, autoplay-muted + banner, mini player

   >>> EDIT DI SINI: tambah/ubah lagu di array `playlist`.
   Pakai nama file konsisten (track1.mp3, dst) di folder
   /assets/music/ supaya tinggal timpa file tanpa ubah kode.
--------------------------------------------------------- */
const playlist = [
  { title: 'Kutho Karanganyar Tentrem', src: 'assets/music/track1.mp3' },
  { title: 'Warok Ponorogo', src: 'assets/music/track2.mp3' },
  { title: 'Kyai Petruk', src: 'assets/music/track3.mp3' },
];

let currentTrackIndex = 0;
let audio;

/* ---------------------------------------------------------
   FOTO STAFF — load foto dari atribut data-img jika file ada.
   Kalau file belum ada / gagal load, emoji role tetap tampil
   sebagai placeholder (tidak merusak tampilan).
--------------------------------------------------------- */
function initStaffAvatars() {
  document.querySelectorAll('.staff-card__avatar[data-img]').forEach(el => {
    const src = el.dataset.img;
    const img = new Image();
    img.onload = () => {
      el.style.backgroundImage = `url('${src}')`;
      el.querySelector('.staff-card__emoji').style.display = 'none';
    };
    img.onerror = () => { /* biarkan emoji placeholder tampil */ };
    img.src = src;
  });
}

function initMusicPlayer() {
  audio = document.getElementById('audioPlayer');
  const banner = document.getElementById('musicBanner');
  const heroToggle = document.getElementById('musicToggle');
  const heroIcon = document.getElementById('musicIcon');
  const playerPlayPause = document.getElementById('playerPlayPause');
  const playerPrev = document.getElementById('playerPrev');
  const playerNext = document.getElementById('playerNext');
  const playerVolume = document.getElementById('playerVolume');
  const playerTitle = document.getElementById('playerTrackTitle');
  const progressFill = document.getElementById('playerProgressFill');
  const progressBar = document.getElementById('playerProgressBar');
  const playerCollapse = document.getElementById('playerCollapse');
  const playerEl = document.getElementById('player');

  if (!playlist.length) return;

  loadTrack(0);
  audio.volume = Number(playerVolume.value);

  // --- Coba autoplay muted dulu (browser modern mengizinkan ini) ---
  audio.muted = true;
  audio.play().then(() => {
    // Berhasil autoplay (muted). Tampilkan banner supaya user klik untuk suara.
    banner.hidden = false;
  }).catch(() => {
    // Autoplay diblokir total: tunggu interaksi user pertama.
    banner.hidden = false;
  });

  function unmuteAndPlay() {
    audio.muted = false;
    audio.play().catch(() => {});
    banner.hidden = true;
    updatePlayIcon();
  }

  banner.addEventListener('click', unmuteAndPlay);

  // Klik di mana pun pertama kali juga bisa menyalakan suara (fallback ramah)
  document.body.addEventListener('click', function onFirstClick() {
    if (audio.muted) unmuteAndPlay();
    document.body.removeEventListener('click', onFirstClick);
  }, { once: true });

  heroToggle.addEventListener('click', togglePlay);
  playerPlayPause.addEventListener('click', togglePlay);
  playerPrev.addEventListener('click', () => changeTrack(-1));
  playerNext.addEventListener('click', () => changeTrack(1));
  playerVolume.addEventListener('input', () => { audio.volume = Number(playerVolume.value); });
  playerCollapse.addEventListener('click', () => playerEl.classList.toggle('is-collapsed'));

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    if (audio.duration) audio.currentTime = ratio * audio.duration;
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progressFill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    }
  });

  // Lanjut otomatis ke track berikutnya, looping playlist
  audio.addEventListener('ended', () => changeTrack(1));

  audio.addEventListener('error', () => {
    // File musik belum ada / nama salah -> jangan sampai merusak halaman
    playerTitle.textContent = 'File musik belum tersedia';
  });

  function togglePlay() {
    if (audio.paused) {
      audio.muted = false;
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
    updatePlayIcon();
  }

  function updatePlayIcon() {
    const playing = !audio.paused;
    heroIcon.textContent = playing ? '⏸' : '▶';
    playerPlayPause.textContent = playing ? '⏸' : '▶';
  }

  function loadTrack(index) {
    currentTrackIndex = (index + playlist.length) % playlist.length;
    const track = playlist[currentTrackIndex];
    audio.src = track.src;
    playerTitle.textContent = track.title;
  }

  function changeTrack(dir) {
    const wasPlaying = !audio.paused;
    loadTrack(currentTrackIndex + dir);
    if (wasPlaying) audio.play().catch(() => {});
    updatePlayIcon();
  }

  audio.addEventListener('play', updatePlayIcon);
  audio.addEventListener('pause', updatePlayIcon);
}

/* ---------------------------------------------------------
   Helper kecil: escape HTML supaya aman dari injeksi
--------------------------------------------------------- */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
