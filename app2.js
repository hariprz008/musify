/**
 * Mucify - Web Player Master JavaScript (app2.js)
 * Consolidated, production-grade JavaScript for the Mucify Web Player.
 * Includes defensive DOM safety, audio playback controls, view routing,
 * All Songs view, playlist CRUD operations, contextual menus, keyboard controls,
 * local storage persistence, and local/remote audio fallbacks.
 */

// --- 1. Database of Songs (21 Tracks) ---
const songs = [
    {
        "id": "song-1",
        "title": "Ambikapathy",
        "artist": "A.R. Rahman",
        "album": "Ambikapathy",
        "url": "songs/Ambikapathy_spotdown.org.mp3",
        "localUrl": "songs/Ambikapathy_spotdown.org.mp3",
        "cover": "assets/aura.png",
        "duration": "9:14",
        "durationSec": 554,
        "artistBio": "Track by A.R. Rahman. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-2",
        "title": "Aura 10-10",
        "artist": "hiphop tamizha",
        "album": "Cosmic Glow",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783244820/Aura_10-10_bkjowp.mp3",
        "localUrl": "songs/Aura 10-10.mp3",
        "cover": "assets/aura.png",
        "duration": "3:01",
        "durationSec": 181,
        "artistBio": "Aura blends ethereal soundscapes with retro synthesis to transport listeners to another dimension."
    },
    {
        "id": "song-3",
        "title": "Azhage-Azhage",
        "artist": "D Imman",
        "album": "Kathakali",
        "url": "songs/Azhage-Azhage.mp3",
        "localUrl": "songs/Azhage-Azhage.mp3",
        "cover": "assets/cook_cook.png",
        "duration": "11:23",
        "durationSec": 683,
        "artistBio": "Track by Hiphop Tamizha. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-4",
        "title": "Beer Song",
        "artist": "Mucify Collection",
        "album": "Mucify Library",
        "url": "songs/Beer Song.mp3",
        "localUrl": "songs/Beer Song.mp3",
        "cover": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
        "duration": "6:15",
        "durationSec": 375,
        "artistBio": "Track by Mucify Collection. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-5",
        "title": "Cook Cook",
        "artist": "santhosh narayanan",
        "album": "cook cook",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783244815/Cook_Cook_mi8dq3.mp3",
        "localUrl": "songs/Cook Cook.mp3",
        "cover": "assets/cook_cook.png",
        "duration": "1:54",
        "durationSec": 114,
        "artistBio": "Cook Cook delivers high-fidelity lo-fi beats infused with culinary ambient soundscapes."
    },
    {
        "id": "song-6",
        "title": "Cupid - Twin Version",
        "artist": "FIFTY FIFTY",
        "album": "The Beginning: Cupid",
        "url": "songs/Cupid - Twin Version_spotdown.org.mp3",
        "localUrl": "songs/Cupid - Twin Version_spotdown.org.mp3",
        "cover": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
        "duration": "5:15",
        "durationSec": 315,
        "artistBio": "Track by FIFTY FIFTY. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-7",
        "title": "Enadhuyirae",
        "artist": "Mucify Collection",
        "album": "Mucify Library",
        "url": "songs/Enadhuyirae.mp3",
        "localUrl": "songs/Enadhuyirae.mp3",
        "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
        "duration": "9:11",
        "durationSec": 551,
        "artistBio": "Track by Mucify Collection. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-8",
        "title": "GTA",
        "artist": "Rockstar Games",
        "album": "GTA Soundtrack",
        "url": "songs/GTA .mp3",
        "localUrl": "songs/GTA .mp3",
        "cover": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
        "duration": "3:43",
        "durationSec": 223,
        "artistBio": "Track by Rockstar Games. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-9",
        "title": "God Mode",
        "artist": "sai abhyankar",
        "album": "karuppu",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783244817/God_Mode_gm64ej.mp3",
        "localUrl": "songs/God Mode.mp3",
        "cover": "assets/god_mode.png",
        "duration": "5:28",
        "durationSec": 328,
        "artistBio": "God Mode is a cyber-metal and electronic production duo inspired by high-stakes gaming."
    },
    {
        "id": "song-10",
        "title": "HEAVENLY JUMPSTYLE",
        "artist": "INNXCENCE",
        "album": "phonk",
        "url": "songs/HEAVENLY JUMPSTYLE.mp3",
        "localUrl": "songs/HEAVENLY JUMPSTYLE.mp3",
        "cover": "assets/aura.png",
        "duration": "5:00",
        "durationSec": 300,
        "artistBio": "Track by INNXCENCE. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-11",
        "title": "I Thought I Saw Your Face Today",
        "artist": "she and him",
        "album": "Mucify Library",
        "url": "songs/I Thought I Saw Your Face Today_spotdown.org.mp3",
        "localUrl": "songs/I Thought I Saw Your Face Today_spotdown.org.mp3",
        "cover": "assets/god_mode.png",
        "duration": "5:05",
        "durationSec": 305,
        "artistBio": "Track by she and him. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-12",
        "title": "JMSN - Love Me ()",
        "artist": "JMSN",
        "album": "Love Me",
        "url": "songs/JMSN_-_Love_Me_(mp3.pm).mp3",
        "localUrl": "songs/JMSN_-_Love_Me_(mp3.pm).mp3",
        "cover": "assets/cook_cook.png",
        "duration": "4:29",
        "durationSec": 269,
        "artistBio": "Track by JMSN. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-13",
        "title": "Karuppa Kooda Va",
        "artist": "Mucify Collection",
        "album": "Mucify Library",
        "url": "songs/Karuppa Kooda Va.mp3",
        "localUrl": "songs/Karuppa Kooda Va.mp3",
        "cover": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80",
        "duration": "8:41",
        "durationSec": 521,
        "artistBio": "Track by Mucify Collection. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-14",
        "title": "King-Theme-Ringtone",
        "artist": "Mucify Collection",
        "album": "Mucify Library",
        "url": "songs/King-Theme-Ringtone.mp3",
        "localUrl": "songs/King-Theme-Ringtone.mp3",
        "cover": "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80",
        "duration": "1:31",
        "durationSec": 91,
        "artistBio": "Track by Mucify Collection. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-15",
        "title": "Minnale-Nee-Vanthathenadi",
        "artist": "Harris Jayaraj",
        "album": "Minnale",
        "url": "songs/Minnale-Nee-Vanthathenadi.mp3",
        "localUrl": "songs/Minnale-Nee-Vanthathenadi.mp3",
        "cover": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
        "duration": "12:16",
        "durationSec": 736,
        "artistBio": "Track by Harris Jayaraj. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-16",
        "title": "Mona-Gasolina",
        "artist": "Mucify Collection",
        "album": "Mucify Library",
        "url": "songs/Mona-Gasolina.mp3",
        "localUrl": "songs/Mona-Gasolina.mp3",
        "cover": "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=80",
        "duration": "13:15",
        "durationSec": 795,
        "artistBio": "Track by Mucify Collection. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-17",
        "title": "Naan Erikkarri",
        "artist": "Mucify Collection",
        "album": "Mucify Library",
        "url": "songs/Naan Erikkarri_spotdown.org.mp3",
        "localUrl": "songs/Naan Erikkarri_spotdown.org.mp3",
        "cover": "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
        "duration": "5:15",
        "durationSec": 315,
        "artistBio": "Track by Mucify Collection. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-18",
        "title": "Naanga Naalu Peru",
        "artist": "sai abhyankar",
        "album": "karuppu",
        "url": "songs/Naanga Naalu Peru.mp3",
        "localUrl": "songs/Naanga Naalu Peru.mp3",
        "cover": "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=300&q=80",
        "duration": "6:49",
        "durationSec": 409,
        "artistBio": "Track by sai abhyankar. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-19",
        "title": "Nallaru Po - From Dude",
        "artist": "sai abhyankar",
        "album": "DUDE",
        "url": "songs/Nallaru Po - From Dude.mp3",
        "localUrl": "songs/Nallaru Po - From Dude.mp3",
        "cover": "assets/aura.png",
        "duration": "9:55",
        "durationSec": 595,
        "artistBio": "Track by sai abhyankar. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-20",
        "title": "Nenjil-Mamazhai-Thanthu",
        "artist": "Ajaneesh Loknath",
        "album": "Nimir",
        "url": "songs/Nenjil-Mamazhai-Thanthu-MassTamilan.com.mp3",
        "localUrl": "songs/Nenjil-Mamazhai-Thanthu-MassTamilan.com.mp3",
        "cover": "assets/god_mode.png",
        "duration": "9:28",
        "durationSec": 568,
        "artistBio": "Track by Ajaneesh Loknath. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-21",
        "title": "le-castle-vania-john-wick",
        "artist": "Le Castle Vania",
        "album": "John Wick Chapter 2",
        "url": "songs/le-castle-vania-john-wick-mode-(john-wick-chapter-2-club-scene-made-with-Voicemod.mp3",
        "localUrl": "songs/le-castle-vania-john-wick-mode-(john-wick-chapter-2-club-scene-made-with-Voicemod.mp3",
        "cover": "assets/cook_cook.png",
        "duration": "0:45",
        "durationSec": 45,
        "artistBio": "Track by Le Castle Vania. Curated specially for your Mucify web player experience."
    }
];

// --- 2. State & Storage Initialization ---
let likedSongIds = JSON.parse(localStorage.getItem('mucify_liked_songs')) || [];

const defaultPlaylists = {
    "liked": {
        name: "Liked Songs",
        desc: "Your collection of favorite tracks.",
        art: "liked",
        songs: likedSongIds
    },
    "playlist-1": {
        name: "Chill Vibes",
        desc: "Lo-Fi tunes for a relaxed mood and late night coding.",
        art: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
        songs: ["song-1", "song-3", "song-5", "song-11"]
    },
    "playlist-2": {
        name: "Focus Flow",
        desc: "Upbeat instrumentals to keep your concentration sharp.",
        art: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=300&q=80",
        songs: ["song-2", "song-1", "song-8", "song-10"]
    },
    "playlist-3": {
        name: "Gaming Session",
        desc: "Fast-paced synth beats and cybernetic melodies.",
        art: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=300&q=80",
        songs: ["song-2", "song-3", "song-9", "song-15"]
    }
};

let playlists = JSON.parse(localStorage.getItem('mucify_playlists'));
if (!playlists) {
    playlists = defaultPlaylists;
} else {
    playlists["liked"] = defaultPlaylists["liked"];
}

function savePlaylists() {
    localStorage.setItem('mucify_playlists', JSON.stringify(playlists));
}

// --- 3. Audio & Player Variables ---
const audio = document.getElementById('audio-player');
let currentQueue = [...songs];
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 'off'; // 'off' | 'all' | 'one'
let volume = parseFloat(localStorage.getItem('mucify_volume')) || 0.7;
let isMuted = false;
let previousVolume = volume;
let isDraggingProgress = false;
let playbackHistory = [];

// Navigation History Stack
let viewHistory = [{ view: 'home', playlistId: null }];
let historyIndex = 0;
let currentView = 'home';
let activePlaylistId = null;

// --- 4. DOM Elements Cache ---
const elPlayPauseBtn = document.getElementById('btn-play-pause');
const elPlayPauseIcon = document.getElementById('play-pause-icon');
const elPrevBtn = document.getElementById('btn-prev');
const elNextBtn = document.getElementById('btn-next');
const elShuffleBtn = document.getElementById('btn-shuffle');
const elRepeatBtn = document.getElementById('btn-repeat');

const elProgressBar = document.getElementById('progress-bar');
const elProgressFill = document.getElementById('progress-fill');
const elTimeCurrent = document.getElementById('time-current');
const elTimeTotal = document.getElementById('time-total');

const elVolumeBar = document.getElementById('volume-bar');
const elVolumeFill = document.getElementById('volume-fill');
const elVolumeBtn = document.getElementById('btn-volume');
const elVolumeIcon = document.getElementById('volume-icon');

const elPlayerArt = document.getElementById('player-song-art');
const elPlayerTitle = document.getElementById('player-song-title');
const elPlayerArtist = document.getElementById('player-song-artist');
const elPlayerLikeBtn = document.getElementById('player-like-btn');

const elNavBack = document.getElementById('nav-back');
const elNavForward = document.getElementById('nav-forward');
const elHeaderSearchBar = document.getElementById('header-search-bar');
const elSearchInput = document.getElementById('search-input');
const elClearSearchBtn = document.getElementById('clear-search-btn');

const elProfileMenu = document.querySelector('.profile-menu');
const elProfileDropdown = document.getElementById('profile-dropdown-menu');
const elScrollContainer = document.getElementById('scroll-container');
const elMainHeader = document.querySelector('.main-header');

const elBtnNowPlaying = document.getElementById('btn-now-playing');
const elNowPlayingPanel = document.getElementById('now-playing-panel');
const elCloseNowPlaying = document.getElementById('close-now-playing');

// Utility to safely escape HTML string values
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// --- 5. Application Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initAudio();
    initEventListeners();
    renderSidebarPlaylists();
    syncVolumeUI();
    setGreeting();

    if (songs.length > 0) {
        loadSong(songs[0], false);
    }
});

// --- 6. Audio Setup & Handlers ---
function initAudio() {
    if (!audio) return;
    audio.volume = volume;

    audio.addEventListener('timeupdate', () => {
        if (!isDraggingProgress && audio.duration) {
            const pct = (audio.currentTime / audio.duration) * 100;
            if (elProgressFill) elProgressFill.style.width = `${pct}%`;
            if (elProgressThumb) elProgressThumb.style.left = `${pct}%`;
            if (elTimeCurrent) elTimeCurrent.textContent = formatTime(audio.currentTime);
        }
    });

    audio.addEventListener('loadedmetadata', () => {
        if (elTimeTotal) elTimeTotal.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
        if (repeatMode === 'one') {
            audio.currentTime = 0;
            playAudio();
        } else {
            nextSong();
        }
    });

    audio.addEventListener('error', (e) => {
        const currentSong = currentQueue[currentSongIndex];
        if (!currentSong) return;

        console.warn(`Audio loading failed for "${currentSong.title}". Trying local fallback...`, e);
        if (!audio._hasTriedFallback && currentSong.localUrl) {
            audio._hasTriedFallback = true;
            audio.src = currentSong.localUrl;
            if (isPlaying) playAudio();
        }
    });
}

// --- 7. Playback Control Functions ---
function loadSong(song, shouldPlay = true) {
    if (!song || !audio) return;

    audio._hasTriedFallback = false;
    audio.src = song.url;

    if (elPlayerArt) elPlayerArt.src = song.cover;
    if (elPlayerTitle) elPlayerTitle.textContent = song.title;
    if (elPlayerArtist) elPlayerArtist.textContent = song.artist;

    syncLikeButtons(song.id);
    updateNowPlayingPanel(song);
    updateActiveRowHighlight();

    if (shouldPlay) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    if (!audio) return;
    isPlaying = true;
    if (elPlayPauseBtn) {
        elPlayPauseBtn.style.transform = 'scale(1.08)';
        elPlayPauseBtn.style.boxShadow = '0 0 16px rgba(29, 185, 84, 0.7)';
        elPlayPauseBtn.classList.add('playing');
    }
    if (elPlayPauseIcon) {
        elPlayPauseIcon.setAttribute('data-lucide', 'pause');
        elPlayPauseIcon.setAttribute('fill', '#000');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();

    audio.play().catch(err => {
        console.log("Autoplay blocked by browser. User gesture required.", err);
        isPlaying = false;
        if (elPlayPauseBtn) {
            elPlayPauseBtn.style.transform = '';
            elPlayPauseBtn.style.boxShadow = '';
            elPlayPauseBtn.classList.remove('playing');
        }
        if (elPlayPauseIcon) {
            elPlayPauseIcon.setAttribute('data-lucide', 'play');
            elPlayPauseIcon.setAttribute('fill', '#000');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    });
}

function pauseAudio() {
    if (!audio) return;
    isPlaying = false;
    if (elPlayPauseBtn) {
        elPlayPauseBtn.style.transform = '';
        elPlayPauseBtn.style.boxShadow = '';
        elPlayPauseBtn.classList.remove('playing');
    }
    if (elPlayPauseIcon) {
        elPlayPauseIcon.setAttribute('data-lucide', 'play');
        elPlayPauseIcon.setAttribute('fill', '#000');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
    audio.pause();
}

function togglePlay() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function prevSong() {
    if (!audio) return;
    if (audio.currentTime > 3) {
        audio.currentTime = 0;
        return;
    }

    if (isShuffle && playbackHistory.length > 1) {
        playbackHistory.pop();
        const prevId = playbackHistory[playbackHistory.length - 1];
        const prevIndex = currentQueue.findIndex(s => s.id === prevId);
        if (prevIndex !== -1) {
            currentSongIndex = prevIndex;
        } else {
            currentSongIndex = (currentSongIndex - 1 + currentQueue.length) % currentQueue.length;
        }
    } else {
        currentSongIndex = (currentSongIndex - 1 + currentQueue.length) % currentQueue.length;
    }

    loadSong(currentQueue[currentSongIndex]);
}

function nextSong() {
    if (currentQueue.length === 0) return;

    if (isShuffle) {
        let randomIndex = currentSongIndex;
        if (currentQueue.length > 1) {
            while (randomIndex === currentSongIndex) {
                randomIndex = Math.floor(Math.random() * currentQueue.length);
            }
        }
        currentSongIndex = randomIndex;
        playbackHistory.push(currentQueue[currentSongIndex].id);
    } else {
        if (currentSongIndex === currentQueue.length - 1 && repeatMode === 'off') {
            pauseAudio();
            if (audio) audio.currentTime = 0;
            return;
        }
        currentSongIndex = (currentSongIndex + 1) % currentQueue.length;
    }

    loadSong(currentQueue[currentSongIndex]);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    if (elShuffleBtn) {
        elShuffleBtn.classList.toggle('active', isShuffle);
        const icon = elShuffleBtn.querySelector('svg, i');
        if (icon) icon.style.color = isShuffle ? 'var(--primary-green)' : '';
    }

    playbackHistory = [];
    if (isShuffle && currentQueue[currentSongIndex]) {
        playbackHistory.push(currentQueue[currentSongIndex].id);
    }
}

function toggleRepeat() {
    if (repeatMode === 'off') {
        repeatMode = 'all';
    } else if (repeatMode === 'all') {
        repeatMode = 'one';
    } else {
        repeatMode = 'off';
    }

    if (elRepeatBtn) {
        const isActive = (repeatMode !== 'off');
        elRepeatBtn.classList.toggle('active', isActive);
        const icon = elRepeatBtn.querySelector('svg, i');
        if (icon) icon.style.color = isActive ? 'var(--primary-green)' : '';

        let badge = elRepeatBtn.querySelector('.repeat-one-badge');
        if (repeatMode === 'one') {
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'repeat-one-badge';
                badge.textContent = '1';
                badge.style.cssText = 'position: absolute; top: -2px; right: -2px; font-size: 9px; font-weight: 800; background: var(--primary-green); color: #000; border-radius: 50%; width: 12px; height: 12px; display: flex; align-items: center; justify-content: center; line-height: 1; pointer-events: none;';
                elRepeatBtn.style.position = 'relative';
                elRepeatBtn.appendChild(badge);
            }
            badge.style.display = 'flex';
            elRepeatBtn.setAttribute('title', 'Repeat One Track');
        } else {
            if (badge) badge.style.display = 'none';
            if (repeatMode === 'all') {
                elRepeatBtn.setAttribute('title', 'Repeat All Tracks');
            } else {
                elRepeatBtn.setAttribute('title', 'Enable Repeat');
            }
        }
    }
}

// --- 8. Liking & Favorites ---
function toggleLikeSong(songId) {
    if (likedSongIds.includes(songId)) {
        likedSongIds = likedSongIds.filter(id => id !== songId);
    } else {
        likedSongIds.push(songId);
    }
    localStorage.setItem('mucify_liked_songs', JSON.stringify(likedSongIds));
    playlists["liked"].songs = likedSongIds;
    savePlaylists();

    syncLikeButtons(songId);

    if (currentView === 'liked') {
        renderLikedSongsView();
    } else if (currentView === 'library') {
        renderLibraryView();
    } else if (currentView === 'all-songs') {
        renderAllSongsView();
    }
}

function syncLikeButtons(songId) {
    const currentSong = currentQueue[currentSongIndex];

    if (currentSong && currentSong.id === songId && elPlayerLikeBtn) {
        const isLiked = likedSongIds.includes(songId);
        if (isLiked) {
            elPlayerLikeBtn.classList.add('liked');
            const icon = elPlayerLikeBtn.querySelector('svg, i');
            if (icon) icon.setAttribute('fill', 'var(--primary-green)');
        } else {
            elPlayerLikeBtn.classList.remove('liked');
            const icon = elPlayerLikeBtn.querySelector('svg, i');
            if (icon) icon.removeAttribute('fill');
        }
    }

    document.querySelectorAll(`.row-action-btn[data-song-id="${songId}"]`).forEach(btn => {
        const isLiked = likedSongIds.includes(songId);
        btn.classList.toggle('liked', isLiked);
        const icon = btn.querySelector('svg, i');
        if (icon) {
            if (isLiked) {
                icon.setAttribute('fill', 'var(--primary-green)');
                icon.setAttribute('color', 'var(--primary-green)');
            } else {
                icon.removeAttribute('fill');
                icon.setAttribute('color', 'currentColor');
            }
        }
    });
}

function playSongFromContext(index, customQueue = null) {
    if (customQueue) {
        currentQueue = [...customQueue];
    }
    currentSongIndex = index;
    loadSong(currentQueue[currentSongIndex]);
}

function playPlaylist(playlistId) {
    const list = playlists[playlistId];
    if (!list || list.songs.length === 0) return;

    const playlistSongs = songs.filter(s => list.songs.includes(s.id));
    if (playlistSongs.length > 0) {
        playSongFromContext(0, playlistSongs);
    }
}

// --- 9. Navigation / Routing Logic ---
function navigate(viewName, addToHistory = true, playlistId = null) {
    document.querySelectorAll('.content-view').forEach(view => {
        view.style.display = 'none';
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.playlist-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    currentView = viewName;
    activePlaylistId = playlistId;
    if (elHeaderSearchBar) elHeaderSearchBar.style.display = 'none';

    if (viewName === 'home') {
        const homeView = document.getElementById('home-view');
        if (homeView) homeView.style.display = 'block';
        const navHome = document.querySelector('[data-view="home"]');
        if (navHome) navHome.classList.add('active');
        setGreeting();
    } else if (viewName === 'search') {
        const searchView = document.getElementById('search-view');
        if (searchView) searchView.style.display = 'block';
        const navSearch = document.querySelector('[data-view="search"]');
        if (navSearch) navSearch.classList.add('active');
        if (elHeaderSearchBar) elHeaderSearchBar.style.display = 'block';
        if (elSearchInput) setTimeout(() => elSearchInput.focus(), 50);
        handleSearch();
    } else if (viewName === 'library') {
        const libView = document.getElementById('library-view');
        if (libView) libView.style.display = 'block';
        const navLib = document.querySelector('[data-view="library"]');
        if (navLib) navLib.classList.add('active');
        renderLibraryView();
    } else if (viewName === 'all-songs') {
        const allSongsView = document.getElementById('all-songs-view');
        if (allSongsView) allSongsView.style.display = 'block';
        const navAllSongs = document.querySelector('[data-view="all-songs"]');
        if (navAllSongs) navAllSongs.classList.add('active');
        renderAllSongsView();
    } else if (viewName === 'liked') {
        const likedView = document.getElementById('liked-songs-view');
        if (likedView) likedView.style.display = 'block';
        const navLiked = document.querySelector('[data-view="liked"]');
        if (navLiked) navLiked.classList.add('active');
        activePlaylistId = 'liked';
        renderLikedSongsView();
    } else if (viewName === 'playlist' && playlistId) {
        const plView = document.getElementById('playlist-view');
        if (plView) plView.style.display = 'block';

        const sidebarPlItem = document.querySelector(`.playlist-nav-item[data-playlist-id="${playlistId}"]`);
        if (sidebarPlItem) sidebarPlItem.classList.add('active');

        renderPlaylistView(playlistId);
    }

    if (elScrollContainer) elScrollContainer.scrollTop = 0;
    if (elMainHeader) elMainHeader.classList.remove('scrolled');

    if (addToHistory) {
        if (historyIndex < viewHistory.length - 1) {
            viewHistory.splice(historyIndex + 1);
        }
        viewHistory.push({ view: viewName, playlistId: playlistId });
        historyIndex = viewHistory.length - 1;
    }

    updateNavArrowStates();
    updateActiveRowHighlight();
}

function updateNavArrowStates() {
    if (!elNavBack || !elNavForward) return;
    elNavBack.disabled = (historyIndex === 0);
    elNavForward.disabled = (historyIndex === viewHistory.length - 1);

    elNavBack.style.opacity = elNavBack.disabled ? '0.4' : '1';
    elNavForward.style.opacity = elNavForward.disabled ? '0.4' : '1';
}

function navBack() {
    if (historyIndex > 0) {
        historyIndex--;
        const state = viewHistory[historyIndex];
        if (typeof state === 'string') {
            navigate(state, false);
        } else {
            navigate(state.view, false, state.playlistId);
        }
    }
}

function navForward() {
    if (historyIndex < viewHistory.length - 1) {
        historyIndex++;
        const state = viewHistory[historyIndex];
        if (typeof state === 'string') {
            navigate(state, false);
        } else {
            navigate(state.view, false, state.playlistId);
        }
    }
}

// --- 10. View Rendering Logic ---
function renderLibraryView() {
    const likedCount = likedSongIds.length;
    const countEl = document.getElementById('library-liked-count');
    if (countEl) countEl.textContent = `${likedCount} ${likedCount === 1 ? 'song' : 'songs'}`;

    const grid = document.getElementById('library-playlists-grid');
    if (!grid) return;

    const likedCard = grid.querySelector('.liked-songs-playlist-card');
    grid.innerHTML = '';
    if (likedCard) grid.appendChild(likedCard);

    Object.keys(playlists).forEach(key => {
        if (key === 'liked') return;
        const pl = playlists[key];
        const card = document.createElement('div');
        card.className = 'music-card';
        card.setAttribute('data-playlist-id', key);

        card.innerHTML = `
            <div class="card-art-wrapper">
                <img src="${pl.art}" alt="${escapeHTML(pl.name)}" class="card-img">
                <button class="play-card-btn hover-reveal"><i data-lucide="play" class="play-card-icon"></i></button>
            </div>
            <div class="card-metadata">
                <h3>${escapeHTML(pl.name)}</h3>
                <p>${pl.songs.length} ${pl.songs.length === 1 ? 'song' : 'songs'}</p>
            </div>
        `;

        card.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-card-btn');
            if (playBtn) {
                e.stopPropagation();
                playPlaylist(key);
            } else {
                navigate('playlist', true, key);
            }
        });

        grid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderLikedSongsView() {
    const listBody = document.getElementById('liked-songs-list-body');
    const table = document.getElementById('liked-songs-table');
    const emptyMsg = document.getElementById('liked-empty-message');
    const statsCount = document.getElementById('liked-songs-count');
    if (!listBody || !table || !statsCount) return;

    listBody.innerHTML = '';
    const likedCount = likedSongIds.length;
    statsCount.textContent = `${likedCount} ${likedCount === 1 ? 'song' : 'songs'}`;

    if (likedCount === 0) {
        table.style.display = 'none';
        if (emptyMsg) emptyMsg.style.display = 'flex';
        return;
    }

    table.style.display = 'table';
    if (emptyMsg) emptyMsg.style.display = 'none';

    const likedSongs = songs.filter(s => likedSongIds.includes(s.id));

    likedSongs.forEach((song, idx) => {
        const row = document.createElement('tr');
        row.setAttribute('data-song-id', song.id);
        const dateAdded = "Jul 5, 2026";

        row.innerHTML = `
            <td class="col-index">
                <span class="index-num">${idx + 1}</span>
                <div class="playing-gif"></div>
                <button class="table-row-play-btn"><i data-lucide="play" fill="#fff" color="#fff" class="small-icon"></i></button>
            </td>
            <td class="col-title">
                <img src="${song.cover}" alt="${escapeHTML(song.title)}">
                <div class="title-info">
                    <span class="song-name-cell">${escapeHTML(song.title)}</span>
                    <span class="song-artist-cell">${escapeHTML(song.artist)}</span>
                </div>
            </td>
            <td class="col-album">${escapeHTML(song.album)}</td>
            <td class="col-date">${dateAdded}</td>
            <td class="col-duration">${song.duration}</td>
            <td class="col-actions" style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                <button class="row-action-btn liked" data-song-id="${song.id}" title="Remove from Liked Songs">
                    <i data-lucide="heart" fill="var(--primary-green)" color="var(--primary-green)" class="small-icon"></i>
                </button>
                <button class="row-menu-btn" data-song-id="${song.id}" title="More options" style="color: var(--text-muted); padding: 4px; transition: var(--transition-fast); opacity: 0;"><i data-lucide="more-horizontal" class="small-icon"></i></button>
            </td>
        `;

        row.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.row-action-btn');
            const menuBtn = e.target.closest('.row-menu-btn');
            if (likeBtn) {
                e.stopPropagation();
                toggleLikeSong(song.id);
            } else if (menuBtn) {
                e.stopPropagation();
                showSongContextMenu(song.id, e.clientX, e.clientY);
            } else {
                playSongFromContext(idx, likedSongs);
            }
        });

        listBody.appendChild(row);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderAllSongsView() {
    const listBody = document.getElementById('all-songs-list-body');
    const countEl = document.getElementById('all-songs-count');
    if (countEl) countEl.textContent = `${songs.length} ${songs.length === 1 ? 'song' : 'songs'}`;

    if (!listBody) return;
    listBody.innerHTML = '';

    songs.forEach((song, idx) => {
        const row = document.createElement('tr');
        row.setAttribute('data-song-id', song.id);
        const dateAdded = "Jul 5, 2026";
        const isLiked = likedSongIds.includes(song.id);

        row.innerHTML = `
            <td class="col-index">
                <span class="index-num">${idx + 1}</span>
                <div class="playing-gif"></div>
                <button class="table-row-play-btn"><i data-lucide="play" fill="#fff" color="#fff" class="small-icon"></i></button>
            </td>
            <td class="col-title">
                <img src="${song.cover}" alt="${escapeHTML(song.title)}">
                <div class="title-info">
                    <span class="song-name-cell">${escapeHTML(song.title)}</span>
                    <span class="song-artist-cell">${escapeHTML(song.artist)}</span>
                </div>
            </td>
            <td class="col-album">${escapeHTML(song.album)}</td>
            <td class="col-date">${dateAdded}</td>
            <td class="col-duration">${song.duration}</td>
            <td class="col-actions" style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}" title="${isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}">
                    <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                </button>
                <button class="row-menu-btn" data-song-id="${song.id}" title="More options" style="color: var(--text-muted); padding: 4px; transition: var(--transition-fast); opacity: 0;"><i data-lucide="more-horizontal" class="small-icon"></i></button>
            </td>
        `;

        row.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.row-action-btn');
            const menuBtn = e.target.closest('.row-menu-btn');
            if (likeBtn) {
                e.stopPropagation();
                toggleLikeSong(song.id);
            } else if (menuBtn) {
                e.stopPropagation();
                showSongContextMenu(song.id, e.clientX, e.clientY);
            } else {
                playSongFromContext(idx, songs);
            }
        });

        listBody.appendChild(row);
    });

    const actionPlayBtn = document.getElementById('all-songs-play-btn');
    if (actionPlayBtn) {
        const newPlayBtn = actionPlayBtn.cloneNode(true);
        actionPlayBtn.replaceWith(newPlayBtn);
        newPlayBtn.addEventListener('click', () => {
            playSongFromContext(0, songs);
        });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    updateActiveRowHighlight();
}

function renderPlaylistView(playlistId) {
    const list = playlists[playlistId];
    if (!list) return;

    const headerArt = document.getElementById('playlist-header-art');
    const headerTitle = document.getElementById('playlist-header-title');
    const headerDesc = document.getElementById('playlist-header-desc');
    const headerStats = document.getElementById('playlist-header-stats');
    const listBody = document.getElementById('playlist-songs-list-body');

    if (headerArt) headerArt.src = list.art;
    if (headerTitle) headerTitle.textContent = list.name;
    if (headerDesc) headerDesc.textContent = list.desc;
    if (!listBody) return;

    listBody.innerHTML = '';

    const playlistSongs = songs.filter(s => list.songs.includes(s.id));
    if (headerStats) headerStats.textContent = `${playlistSongs.length} ${playlistSongs.length === 1 ? 'song' : 'songs'}`;

    playlistSongs.forEach((song, idx) => {
        const row = document.createElement('tr');
        row.setAttribute('data-song-id', song.id);
        const dateAdded = "Jul 5, 2026";
        const isLiked = likedSongIds.includes(song.id);

        row.innerHTML = `
            <td class="col-index">
                <span class="index-num">${idx + 1}</span>
                <div class="playing-gif"></div>
                <button class="table-row-play-btn"><i data-lucide="play" fill="#fff" color="#fff" class="small-icon"></i></button>
            </td>
            <td class="col-title">
                <img src="${song.cover}" alt="${escapeHTML(song.title)}">
                <div class="title-info">
                    <span class="song-name-cell">${escapeHTML(song.title)}</span>
                    <span class="song-artist-cell">${escapeHTML(song.artist)}</span>
                </div>
            </td>
            <td class="col-album">${escapeHTML(song.album)}</td>
            <td class="col-date">${dateAdded}</td>
            <td class="col-duration">${song.duration}</td>
            <td class="col-actions" style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}" title="${isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}">
                    <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                </button>
                <button class="row-menu-btn" data-song-id="${song.id}" title="More options" style="color: var(--text-muted); padding: 4px; transition: var(--transition-fast); opacity: 0;"><i data-lucide="more-horizontal" class="small-icon"></i></button>
            </td>
        `;

        row.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.row-action-btn');
            const menuBtn = e.target.closest('.row-menu-btn');
            if (likeBtn) {
                e.stopPropagation();
                toggleLikeSong(song.id);
            } else if (menuBtn) {
                e.stopPropagation();
                showSongContextMenu(song.id, e.clientX, e.clientY);
            } else {
                playSongFromContext(idx, playlistSongs);
            }
        });

        listBody.appendChild(row);
    });

    const actionPlayBtn = document.getElementById('playlist-play-btn-action');
    if (actionPlayBtn) {
        const newPlayBtn = actionPlayBtn.cloneNode(true);
        actionPlayBtn.replaceWith(newPlayBtn);
        newPlayBtn.addEventListener('click', () => {
            playPlaylist(playlistId);
        });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    updateActiveRowHighlight();
}

function renderSidebarPlaylists() {
    const listDiv = document.getElementById('sidebar-playlists');
    if (!listDiv) return;
    listDiv.innerHTML = '';

    Object.keys(playlists).forEach(key => {
        if (key === 'liked') return;
        const pl = playlists[key];
        const btn = document.createElement('button');
        btn.className = 'playlist-nav-item';
        btn.setAttribute('data-playlist-id', key);
        btn.textContent = pl.name;

        btn.addEventListener('click', () => {
            navigate('playlist', true, key);
        });

        listDiv.appendChild(btn);
    });
}

function updateActiveRowHighlight() {
    const currentSong = currentQueue[currentSongIndex];
    if (!currentSong) return;

    document.querySelectorAll('.songs-table tbody tr').forEach(row => {
        row.classList.remove('active-playing');
        const playBtnIcon = row.querySelector('.table-row-play-btn svg, .table-row-play-btn i');
        if (playBtnIcon) {
            playBtnIcon.setAttribute('data-lucide', 'play');
        }

        if (row.getAttribute('data-song-id') === currentSong.id) {
            row.classList.add('active-playing');
            if (isPlaying && playBtnIcon) {
                playBtnIcon.setAttribute('data-lucide', 'pause');
            }
        }
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- 11. Search Functionality ---
function handleSearch() {
    if (!elSearchInput) return;
    const query = elSearchInput.value.toLowerCase().trim();
    if (elClearSearchBtn) {
        elClearSearchBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    const gridResults = document.getElementById('search-results-grid');
    const tableResultsBody = document.getElementById('search-table-body');
    const searchHeaderTitle = document.getElementById('search-results-title');

    if (!query) {
        if (gridResults) gridResults.style.display = 'grid';
        if (searchHeaderTitle) searchHeaderTitle.style.display = 'none';
        const tableContainer = document.querySelector('.search-table-container');
        if (tableContainer) tableContainer.style.display = 'none';
        return;
    }

    if (gridResults) gridResults.style.display = 'none';
    if (searchHeaderTitle) {
        searchHeaderTitle.style.display = 'block';
        searchHeaderTitle.textContent = `Songs matching "${query}"`;
    }

    const tableContainer = document.querySelector('.search-table-container');
    if (tableContainer) tableContainer.style.display = 'block';

    const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
    );

    if (!tableResultsBody) return;
    tableResultsBody.innerHTML = '';

    if (filtered.length === 0) {
        tableResultsBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px;">No tracks found matching "${escapeHTML(query)}"</td></tr>`;
        return;
    }

    filtered.forEach((song, idx) => {
        const row = document.createElement('tr');
        row.setAttribute('data-song-id', song.id);
        const isLiked = likedSongIds.includes(song.id);

        row.innerHTML = `
            <td class="col-index">
                <span class="index-num">${idx + 1}</span>
                <button class="table-row-play-btn"><i data-lucide="play" fill="#fff" color="#fff" class="small-icon"></i></button>
            </td>
            <td class="col-title">
                <img src="${song.cover}" alt="${escapeHTML(song.title)}">
                <div class="title-info">
                    <span class="song-name-cell">${escapeHTML(song.title)}</span>
                    <span class="song-artist-cell">${escapeHTML(song.artist)}</span>
                </div>
            </td>
            <td class="col-album">${escapeHTML(song.album)}</td>
            <td class="col-duration">${song.duration}</td>
            <td class="col-actions" style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}">
                    <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                </button>
            </td>
        `;

        row.addEventListener('click', (e) => {
            const likeBtn = e.target.closest('.row-action-btn');
            if (likeBtn) {
                e.stopPropagation();
                toggleLikeSong(song.id);
            } else {
                playSongFromContext(idx, filtered);
            }
        });

        tableResultsBody.appendChild(row);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
    updateActiveRowHighlight();
}

// --- 12. Context Menu & Modal Logic ---
function showSongContextMenu(songId, x, y) {
    let menu = document.getElementById('song-context-menu');
    if (!menu) return;

    menu.innerHTML = '';
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    const isLiked = likedSongIds.includes(songId);

    const itemPlay = document.createElement('div');
    itemPlay.className = 'context-menu-item';
    itemPlay.innerHTML = `<i data-lucide="play" style="width: 14px; height: 14px;"></i> <span>Play Track</span>`;
    itemPlay.addEventListener('click', () => {
        const index = currentQueue.findIndex(s => s.id === songId);
        if (index !== -1) {
            playSongFromContext(index);
        } else {
            loadSong(song, true);
        }
        menu.style.display = 'none';
    });
    menu.appendChild(itemPlay);

    const itemLike = document.createElement('div');
    itemLike.className = 'context-menu-item';
    itemLike.innerHTML = `<i data-lucide="heart" style="width: 14px; height: 14px;"></i> <span>${isLiked ? 'Remove from Liked' : 'Save to Liked Songs'}</span>`;
    itemLike.addEventListener('click', () => {
        toggleLikeSong(songId);
        menu.style.display = 'none';
    });
    menu.appendChild(itemLike);

    const itemAddPl = document.createElement('div');
    itemAddPl.className = 'context-menu-item has-submenu';
    itemAddPl.innerHTML = `<i data-lucide="plus-circle" style="width: 14px; height: 14px;"></i> <span>Add to Playlist</span>`;

    const submenu = document.createElement('div');
    submenu.className = 'context-submenu';

    let hasCustomPl = false;
    Object.keys(playlists).forEach(key => {
        if (key === 'liked') return;
        hasCustomPl = true;
        const pl = playlists[key];
        const subItem = document.createElement('div');
        subItem.className = 'context-menu-item';
        subItem.textContent = pl.name;
        subItem.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!pl.songs.includes(songId)) {
                pl.songs.push(songId);
                savePlaylists();
            }
            menu.style.display = 'none';
        });
        submenu.appendChild(subItem);
    });

    if (!hasCustomPl) {
        const noPlMsg = document.createElement('div');
        noPlMsg.className = 'context-menu-item disabled';
        noPlMsg.style.opacity = '0.5';
        noPlMsg.textContent = "No custom playlists";
        submenu.appendChild(noPlMsg);
    }

    itemAddPl.appendChild(submenu);
    menu.appendChild(itemAddPl);

    if (currentView === 'playlist' && activePlaylistId && activePlaylistId !== 'liked') {
        const removeItem = document.createElement('div');
        removeItem.className = 'context-menu-item danger';
        removeItem.style.color = '#ff5252';
        removeItem.innerHTML = `<i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> <span>Remove from Playlist</span>`;

        removeItem.addEventListener('click', () => {
            const pl = playlists[activePlaylistId];
            if (pl) {
                pl.songs = pl.songs.filter(id => id !== songId);
                savePlaylists();
                renderPlaylistView(activePlaylistId);
            }
            menu.style.display = 'none';
        });

        menu.appendChild(removeItem);
    }

    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const menuWidth = 200;
    const menuHeight = menu.offsetHeight || 150;

    let finalX = x;
    let finalY = y;
    if (x + menuWidth > window.innerWidth) {
        finalX = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
        finalY = window.innerHeight - menuHeight - 10;
    }

    menu.style.left = `${finalX}px`;
    menu.style.top = `${finalY}px`;
}

function showPlaylistModal(title = "Create Playlist", defaultValue = "") {
    return new Promise((resolve) => {
        const modal = document.getElementById('playlist-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalInput = document.getElementById('modal-input');
        const cancelBtn = document.getElementById('modal-cancel-btn');
        const saveBtn = document.getElementById('modal-save-btn');

        if (!modal || !modalInput || !saveBtn || !cancelBtn) {
            const promptVal = prompt(title, defaultValue);
            resolve(promptVal);
            return;
        }

        if (modalTitle) modalTitle.textContent = title;
        modalInput.value = defaultValue;
        modal.style.display = 'flex';
        setTimeout(() => modalInput.focus(), 50);

        function cleanupModal() {
            modal.style.display = 'none';
            saveBtn.removeEventListener('click', onSave);
            cancelBtn.removeEventListener('click', onCancel);
            modalInput.removeEventListener('keydown', onKeyDown);
        }

        function onSave() {
            const val = modalInput.value;
            cleanupModal();
            resolve(val);
        }

        function onCancel() {
            cleanupModal();
            resolve(null);
        }

        function onKeyDown(e) {
            if (e.key === 'Enter') onSave();
            if (e.key === 'Escape') onCancel();
        }

        saveBtn.addEventListener('click', onSave);
        cancelBtn.addEventListener('click', onCancel);
        modalInput.addEventListener('keydown', onKeyDown);
    });
}

// --- 13. UI Helper Functions ---
function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function setGreeting() {
    const greetingEl = document.getElementById('greeting-title');
    if (!greetingEl) return;
    const hour = new Date().getHours();
    if (hour < 12) {
        greetingEl.textContent = 'Good morning';
    } else if (hour < 18) {
        greetingEl.textContent = 'Good afternoon';
    } else {
        greetingEl.textContent = 'Good evening';
    }
}

function updateNowPlayingPanel(song) {
    const art = document.getElementById('panel-song-art');
    const title = document.getElementById('panel-song-title');
    const artist = document.getElementById('panel-song-artist');
    const bio = document.getElementById('panel-artist-bio');

    if (art) art.src = song.cover;
    if (title) title.textContent = song.title;
    if (artist) artist.textContent = song.artist;
    if (bio) bio.textContent = song.artistBio || `Track by ${song.artist}. Curated specially for your Mucify web player experience.`;
}

// --- 14. Event Listeners Setup ---
function initEventListeners() {
    if (elPlayPauseBtn) elPlayPauseBtn.addEventListener('click', togglePlay);
    if (elPrevBtn) elPrevBtn.addEventListener('click', prevSong);
    if (elNextBtn) elNextBtn.addEventListener('click', nextSong);
    if (elShuffleBtn) elShuffleBtn.addEventListener('click', toggleShuffle);
    if (elRepeatBtn) elRepeatBtn.addEventListener('click', toggleRepeat);
    if (elPlayerLikeBtn) {
        elPlayerLikeBtn.addEventListener('click', () => {
            const currentSong = currentQueue[currentSongIndex];
            if (currentSong) toggleLikeSong(currentSong.id);
        });
    }

    // Progress Bar Interactions
    if (elProgressBar) {
        elProgressBar.addEventListener('mousedown', (e) => {
            isDraggingProgress = true;
            handleProgressSeek(e);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDraggingProgress) handleProgressSeek(e);
        });

        window.addEventListener('mouseup', () => {
            if (isDraggingProgress) isDraggingProgress = false;
        });
    }

    // Volume Slider & Mute Interactions
    if (elVolumeBar) {
        let isDraggingVolume = false;
        elVolumeBar.addEventListener('mousedown', (e) => {
            isDraggingVolume = true;
            handleVolumeSeek(e);
        });

        window.addEventListener('mousemove', (e) => {
            if (isDraggingVolume) handleVolumeSeek(e);
        });

        window.addEventListener('mouseup', () => {
            isDraggingVolume = false;
        });
    }

    if (elVolumeBtn) {
        elVolumeBtn.addEventListener('click', () => {
            if (isMuted) {
                isMuted = false;
                volume = previousVolume > 0 ? previousVolume : 0.7;
            } else {
                isMuted = true;
                previousVolume = volume;
                volume = 0;
            }
            if (audio) audio.volume = volume;
            syncVolumeUI();
        });
    }

    // Header Navigation & Search
    if (elNavBack) elNavBack.addEventListener('click', navBack);
    if (elNavForward) elNavForward.addEventListener('click', navForward);

    if (elSearchInput) {
        elSearchInput.addEventListener('input', handleSearch);
    }
    if (elClearSearchBtn) {
        elClearSearchBtn.addEventListener('click', () => {
            if (elSearchInput) {
                elSearchInput.value = '';
                handleSearch();
                elSearchInput.focus();
            }
        });
    }

    // Sidebar View Item Clicks
    document.querySelectorAll('.nav-item[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            navigate(view);
        });
    });

    document.querySelectorAll('.action-btn[data-view]').forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            navigate(view);
        });
    });

    // Profile Dropdown Toggle
    if (elProfileMenu && elProfileDropdown) {
        elProfileMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            elProfileMenu.classList.toggle('open');
            elProfileDropdown.classList.toggle('show');
        });
    }

    window.addEventListener('click', () => {
        if (elProfileMenu) elProfileMenu.classList.remove('open');
        if (elProfileDropdown) elProfileDropdown.classList.remove('show');

        const contextMenu = document.getElementById('song-context-menu');
        if (contextMenu) contextMenu.style.display = 'none';

        const plDropdown = document.getElementById('playlist-options-dropdown');
        if (plDropdown) plDropdown.style.display = 'none';
    });

    // Create Playlist Button
    const createPlBtn = document.getElementById('create-playlist-btn');
    if (createPlBtn) {
        createPlBtn.addEventListener('click', async () => {
            const title = await showPlaylistModal("Create Playlist");
            if (!title || title.trim() === '') return;

            const id = `playlist-${Date.now()}`;
            playlists[id] = {
                name: title.trim(),
                desc: "Custom user-created playlist.",
                art: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
                songs: []
            };
            savePlaylists();

            renderSidebarPlaylists();
            navigate('playlist', true, id);
        });
    }

    // Playlist Options Dots Dropdown
    const plOptionsBtn = document.getElementById('playlist-options-btn');
    if (plOptionsBtn) {
        plOptionsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('playlist-options-dropdown');
            if (dropdown) {
                const isVisible = dropdown.style.display === 'flex';
                dropdown.style.display = isVisible ? 'none' : 'flex';
            }
        });
    }

    // Rename Playlist
    const plOptRename = document.getElementById('pl-opt-rename');
    if (plOptRename) {
        plOptRename.addEventListener('click', async (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('playlist-options-dropdown');
            if (dropdown) dropdown.style.display = 'none';
            if (!activePlaylistId || activePlaylistId === 'liked') return;

            const pl = playlists[activePlaylistId];
            if (!pl) return;
            const newName = await showPlaylistModal("Rename Playlist", pl.name);
            if (newName && newName.trim() !== '') {
                pl.name = newName.trim();
                savePlaylists();
                renderSidebarPlaylists();
                renderPlaylistView(activePlaylistId);
            }
        });
    }

    // Delete Playlist
    const plOptDelete = document.getElementById('pl-opt-delete');
    if (plOptDelete) {
        plOptDelete.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = document.getElementById('playlist-options-dropdown');
            if (dropdown) dropdown.style.display = 'none';
            if (!activePlaylistId || activePlaylistId === 'liked') return;

            const pl = playlists[activePlaylistId];
            if (!pl) return;
            if (confirm(`Are you sure you want to delete the playlist "${pl.name}"?`)) {
                delete playlists[activePlaylistId];
                savePlaylists();
                renderSidebarPlaylists();
                navigate('home');
            }
        });
    }

    // Liked Songs Play All Button
    const likedPlayBtn = document.getElementById('liked-play-btn');
    if (likedPlayBtn) {
        likedPlayBtn.addEventListener('click', () => {
            playPlaylist('liked');
        });
    }

    // Now Playing Sidebar Panel Toggles
    if (elBtnNowPlaying && elNowPlayingPanel) {
        elBtnNowPlaying.addEventListener('click', () => {
            const appContainer = document.querySelector('.app-container');
            if (!appContainer) return;
            const isActive = appContainer.classList.toggle('panel-active');
            elBtnNowPlaying.classList.toggle('active', isActive);
            elNowPlayingPanel.style.display = isActive ? 'flex' : 'none';
        });
    }

    if (elCloseNowPlaying && elNowPlayingPanel) {
        elCloseNowPlaying.addEventListener('click', () => {
            const appContainer = document.querySelector('.app-container');
            if (appContainer) appContainer.classList.remove('panel-active');
            if (elBtnNowPlaying) elBtnNowPlaying.classList.remove('active');
            elNowPlayingPanel.style.display = 'none';
        });
    }

    // Queue Button - displays queue listing
    const btnQueue = document.getElementById('btn-queue');
    if (btnQueue) {
        btnQueue.addEventListener('click', () => {
            const queueTitles = currentQueue.map((s, i) => `${i === currentSongIndex ? '▶ ' : '  '}${s.title} - ${s.artist}`).join('\n');
            alert(`Mucify Playback Queue:\n\n${queueTitles}`);
        });
    }

    // Fullscreen Logic
    const btnFullscreen = document.getElementById('btn-fullscreen');
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    alert(`Error attempting to enable full-screen mode: ${err.message}`);
                });
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
            }
        });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'ArrowRight') {
            e.preventDefault();
            if (audio) audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
        } else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            if (audio) audio.currentTime = Math.max(0, audio.currentTime - 5);
        } else if (e.code === 'ArrowUp') {
            e.preventDefault();
            volume = Math.min(1, volume + 0.1);
            isMuted = false;
            if (audio) audio.volume = volume;
            syncVolumeUI();
        } else if (e.code === 'ArrowDown') {
            e.preventDefault();
            volume = Math.max(0, volume - 0.1);
            if (volume === 0) isMuted = true;
            if (audio) audio.volume = volume;
            syncVolumeUI();
        } else if (e.code === 'KeyM') {
            e.preventDefault();
            if (elVolumeBtn) elVolumeBtn.click();
        }
    });

    // Home Quick Grid Cards
    document.querySelectorAll('.quick-card[data-song-index]').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.getAttribute('data-song-index'), 10);
            playSongFromContext(idx, songs);
        });
    });

    document.querySelectorAll('.quick-card[data-playlist-id]').forEach(card => {
        card.addEventListener('click', () => {
            const plId = card.getAttribute('data-playlist-id');
            if (plId === 'liked') {
                navigate('liked');
            } else {
                navigate('playlist', true, plId);
            }
        });
    });

    document.querySelectorAll('.music-card[data-song-index]').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.getAttribute('data-song-index'), 10);
            playSongFromContext(idx, songs);
        });
    });
}

// --- 15. Range & Slider Handlers ---
function handleProgressSeek(e) {
    if (!elProgressBar || !audio || !audio.duration) return;
    const rect = elProgressBar.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const pct = offsetX / rect.width;

    if (elProgressFill) elProgressFill.style.width = `${pct * 100}%`;
    if (elProgressThumb) elProgressThumb.style.left = `${pct * 100}%`;
    audio.currentTime = pct * audio.duration;
    if (elTimeCurrent) elTimeCurrent.textContent = formatTime(audio.currentTime);
}

function handleVolumeSeek(e) {
    if (!elVolumeBar) return;
    const rect = elVolumeBar.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    volume = offsetX / rect.width;
    isMuted = (volume === 0);

    if (audio) audio.volume = volume;
    localStorage.setItem('mucify_volume', volume.toString());
    syncVolumeUI();
}

function syncVolumeUI() {
    const activeVol = isMuted ? 0 : volume;
    const pct = activeVol * 100;

    if (elVolumeFill) elVolumeFill.style.width = `${pct}%`;
    if (elVolumeThumb) elVolumeThumb.style.left = `${pct}%`;
    if (!elVolumeIcon) return;

    if (isMuted || volume === 0) {
        elVolumeIcon.setAttribute('data-lucide', 'volume-x');
    } else if (volume < 0.5) {
        elVolumeIcon.setAttribute('data-lucide', 'volume-1');
    } else {
        elVolumeIcon.setAttribute('data-lucide', 'volume-2');
    }
    if (typeof lucide !== 'undefined') lucide.createIcons();
}
