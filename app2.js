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
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iLO5aPkU5OPzoPXnA8VACRtVtxqg3jnDrcgWMr5cwOibCBQeHBkkkNqaY_sBG-OREjeTxw&s=10",
        "duration": "4:16",
        "durationSec": 240,
        "artistBio": "Track by A.R. Rahman. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-2",
        "title": "Aura 10-10",
        "artist": "hiphop tamizha",
        "album": "Cosmic Glow",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783244820/Aura_10-10_bkjowp.mp3",
        "localUrl": "songs/Aura 10-10.mp3",
        "cover": "https://m.media-amazon.com/images/M/MV5BM2M2NjRjNGUtN2IwYy00MThmLTgxZTgtMzNhZDY0MDhhZTM0XkEyXkFqcGc@._V1_.jpg",
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
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/e0/cc/d4/e0ccd4db-e143-52c8-a402-7027a54224ae/886443553750.jpg/316x316bb.webp",
        "duration": "5:55",
        "durationSec": 355,
        "artistBio": "Track by Hiphop Tamizha. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-4",
        "title": "Beer Song",
        "artist": "Sam cs",
        "album": "Mucify Library",
        "url": "songs/Beer Song.mp3",
        "localUrl": "songs/Beer Song.mp3",
        "cover": "https://cdn.district.in/movies-assets/images/cinema/Diesel--Gallery-6588faa0-edc9-11ef-8cb3-05c6c7d276fb.jpg",
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
        "cover": "cook_cook.png",
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
        "cover": "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/39/3f/c5/393fc5e1-e89f-b94f-7c24-fed819442a57/196872363197.jpg/300x300bb.webp",
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
        "cover": "https://imgs.search.brave.com/z1MVtpC82VH7aoluSmSEoX4ZekZ29UU9Tc7DBLT8bCA/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qll6YzNaVEl4/TkRZdFlqQTBOaTAw/WmpObExXRXlZamd0/TXpFeFlUSXhZbVZp/Wm1NeFhrRXlYa0Zx/Y0djQC5fVjFfLmpw/Zw",
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
        "cover": "https://m.media-amazon.com/images/M/MV5BNGE3NmY3N2ItYTYyYi00MmNmLThhMDUtYWYxYjgxYjhjZDU5XkEyXkFqcGc@._V1_QL75_UX164_.jpg",
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
        "cover": "https://imgs.search.brave.com/nLljDj1z68NnJQPnIthcsbudE3xdeaAUgs4EgtEZruY/rs:fit:200:200:1:0/g:ce/aHR0cDovL2ltYWdl/cy5nZW5pdXMuY29t/LzAyNTM2Y2ZkODUy/MDQ2ZGE1MzYyMTgz/NWU1MTBmNTU5LjEw/MDB4MTAwMHgxLmpw/Zw",
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
        "cover": "https://imgs.search.brave.com/0mR7-PgVGRcYH5psX2IkTHAeImdrTnPeBiySnbAqL_g/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZ2VuaXVzLmNv/bS9mMzA2MzgxNjJl/Njg3OTczOGU3ODhk/Mjg0YzI1OGQ3NS4x/MDAweDEwMDB4MS5q/cGc",
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
        "cover": "https://m.media-amazon.com/images/M/MV5BNGE3NmY3N2ItYTYyYi00MmNmLThhMDUtYWYxYjgxYjhjZDU5XkEyXkFqcGc@._V1_QL75_UX164_.jpg",
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
        "cover": "https://imgs.search.brave.com/5Gi-4iLp53k_XFeHVtnBIFn_af-spOKNw_p8jt5zi-w/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk5tWmpNRGN3/TXpJdE9UQTFPQzAw/TnpVM0xXRTVPVFl0/TURSbE1UTTFNalV4/WXpjMFhrRXlYa0Zx/Y0djQC5fVjFfLmpw/Zw",
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
        "cover": "https://imgs.search.brave.com/ev-THFbsqWG9jd4hVRhJnhiPqz74SIQ3J9K432qqmSY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vZS9lMy9M/aW5nYWEuanBnP3V0/bV9zb3VyY2U9ZW4u/d2lraXBlZGlhLm9y/ZyZhbXA7dXRtX2Nh/bXBhaWduPWluZGV4/JmFtcDt1dG1fY29u/dGVudD10aHVtYm5h/aWxfdW5zY2FsZWQ",
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
        "cover": "https://imgs.search.brave.com/qdTbwvtB7gxgws3tEAIKglo7JkYd6v_UHbjH4083oTQ/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9tYXNz/dGFtaWxhbi5jb20u/c2UvdXBsb2FkX2Zp/bGUvMy8xMi82Mjcv/MjMweDIzMC90aHVt/Yl82ODc4ODhiODI3/ZmZhLndlYnA",
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
        "cover": "https://www.tamil2lyrics.com/wp-content/uploads/2026/03/Naanga-Naalu-Peru-Song.jpg",
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
        "cover": "https://imgs.search.brave.com/ImVVqBcWI3YI_Z710n_0SHKqhaHAHSBV9dNZm043T34/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly93d3cu/dGFtaWwybHlyaWNz/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNS8wOS9OYWxs/YXJ1LVBvLVNvbmcu/anBn",
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
        "cover": "https://imgs.search.brave.com/HUxViwFwuuQu3TQoBlyS-NHU1aNev2fk0kNRaXnvX-s/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvZW4vNi82YS9O/aW1pcl9wb3N0ZXIu/anBnP3V0bV9zb3Vy/Y2U9ZW4ud2lraXBl/ZGlhLm9yZyZ1dG1f/Y2FtcGFpZ249cGFy/c2VyJnV0bV9jb250/ZW50PXRodW1ibmFp/bF91bnNjYWxlZA",
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
        "cover": "https://imgs.search.brave.com/KyZcdRx69aW7txN-LfTBMmF45heZr0ob_c09ESEd4aE/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1UVTJOakEx/T0Rnek1GNUJNbDVC/YW5CblhrRnRaVGd3/TVRNMk1USTRNakVA/Ll9WMV8uanBn",
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

// --- SVG Icons & State UI Handlers ---
const PLAY_TRIANGLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#000000" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play play-icon-triangle" id="play-pause-icon"><polygon points="6 3 20 12 6 21 6 3"/></svg>`;

const PAUSE_LINES_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#000000" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause pause-icon-lines" id="play-pause-icon"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;

const VOLUME_HIGH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-2" id="volume-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`;

const VOLUME_LOW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-1" id="volume-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;

const VOLUME_MUTED_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x" id="volume-icon"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`;

function updatePlayPauseUI(playing) {
    if (!elPlayPauseBtn) return;

    if (playing) {
        // Play State: Apply play state classes & switch icon source/innerHTML to pause lines
        elPlayPauseBtn.classList.remove('pause-state', 'is-paused', 'paused');
        elPlayPauseBtn.classList.add('play-state', 'is-playing', 'playing');
        elPlayPauseBtn.setAttribute('title', 'Pause');
        elPlayPauseBtn.setAttribute('aria-label', 'Pause');
        elPlayPauseBtn.innerHTML = PAUSE_LINES_SVG;
    } else {
        // Pause State: Apply pause state classes & switch icon source/innerHTML to play triangle
        elPlayPauseBtn.classList.remove('play-state', 'is-playing', 'playing');
        elPlayPauseBtn.classList.add('pause-state', 'is-paused', 'paused');
        elPlayPauseBtn.setAttribute('title', 'Play');
        elPlayPauseBtn.setAttribute('aria-label', 'Play');
        elPlayPauseBtn.innerHTML = PLAY_TRIANGLE_SVG;
    }
}
const elPrevBtn = document.getElementById('btn-prev');
const elNextBtn = document.getElementById('btn-next');
const elShuffleBtn = document.getElementById('btn-shuffle');
const elRepeatBtn = document.getElementById('btn-repeat');

const elProgressBar = document.getElementById('progress-track') || document.getElementById('progress-bar');
const elProgressFill = document.getElementById('progress-fill');
const elProgressThumb = document.getElementById('elProgressThumb');
const elTimeCurrent = document.getElementById('time-current');
const elTimeTotal = document.getElementById('time-total');

const elVolumeBar = document.getElementById('volume-track') || document.getElementById('volume-bar');
const elVolumeFill = document.getElementById('volume-fill');
const elVolumeThumb = document.getElementById('elVolumeThumb');
const elVolumeBtn = document.getElementById('btn-mute') || document.getElementById('btn-volume');
const elVolumeIcon = document.getElementById('volume-icon');

const elPlayerArt = document.getElementById('player-art');
const elPlayerTitle = document.getElementById('player-title');
const elPlayerArtist = document.getElementById('player-artist');
const elPlayerLikeBtn = document.getElementById('player-like-btn');

/**
 * Updates the player UI elements with song title, artist, and image source.
 * @param {string} songTitle - The title of the song
 * @param {string} artistName - The name of the artist
 * @param {string} imageSource - The URL/path to the album cover image
 */
function updatePlayerDetails(songTitle, artistName, imageSource) {
    const artElement = document.getElementById('player-art');
    const titleElement = document.getElementById('player-title');
    const artistElement = document.getElementById('player-artist');

    if (artElement) artElement.src = imageSource;
    if (titleElement) titleElement.textContent = songTitle;
    if (artistElement) artistElement.textContent = artistName;
}

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
    renderHomeView();
    syncVolumeUI();
    setGreeting();

    if (songs.length > 0) {
        loadSong(songs[0], false);
    }
});

// --- 6. Audio Setup & Handlers ---
function initAudio() {
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
    audio.muted = isMuted;

    audio.addEventListener('play', () => {
        isPlaying = true;
        updatePlayPauseUI(true);
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        updatePlayPauseUI(false);
    });

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
    if (currentView === 'queue') {
        renderQueueView();
    }

    if (shouldPlay) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    if (!audio) return;
    isPlaying = true;
    updatePlayPauseUI(true);

    audio.play().catch(err => {
        console.log("Autoplay blocked by browser. User gesture required.", err);
        isPlaying = false;
        updatePlayPauseUI(false);
    });
}

function pauseAudio() {
    if (!audio) return;
    isPlaying = false;
    updatePlayPauseUI(false);
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
        renderHomeView();
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
    } else if (viewName === 'liked' || (viewName === 'playlist' && playlistId === 'liked')) {
        const likedView = document.getElementById('liked-songs-view');
        if (likedView) likedView.style.display = 'block';
        const navLiked = document.querySelector('[data-view="liked"]');
        if (navLiked) navLiked.classList.add('active');
        activePlaylistId = 'liked';
        currentView = 'liked';
        renderLikedSongsView();
    } else if (viewName === 'playlist' && playlistId) {
        const plView = document.getElementById('playlist-view');
        if (plView) plView.style.display = 'block';

        const sidebarPlItem = document.querySelector(`.playlist-nav-item[data-playlist-id="${playlistId}"]`);
        if (sidebarPlItem) sidebarPlItem.classList.add('active');

        renderPlaylistView(playlistId);
    } else if (viewName === 'queue') {
        const queueView = document.getElementById('queue-view');
        if (queueView) queueView.style.display = 'block';
        renderQueueView();
    }

    const btnQueue = document.getElementById('btn-queue');
    if (btnQueue) {
        btnQueue.classList.toggle('active', viewName === 'queue');
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
function renderHomeView() {
    // 1. Render Mood Boosters shelf cards dynamically
    const moodGrid = document.getElementById('home-mood-boosters-grid');
    if (moodGrid) {
        moodGrid.innerHTML = '';
        Object.keys(playlists).forEach(key => {
            if (key === 'liked') return;
            const pl = playlists[key];
            const card = document.createElement('div');
            card.className = 'music-card playlist-card';
            card.setAttribute('data-playlist-id', key);

            card.innerHTML = `
                <div class="card-art-wrapper">
                    <img src="${escapeHTML(pl.art)}" alt="${escapeHTML(pl.name)}" class="card-img">
                    <button class="play-card-btn hover-reveal"><i data-lucide="play" class="play-card-icon"></i></button>
                </div>
                <div class="card-metadata">
                    <h3>${escapeHTML(pl.name)}</h3>
                    <p>${escapeHTML(pl.desc || `${pl.songs.length} ${pl.songs.length === 1 ? 'song' : 'songs'}`)}</p>
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

            card.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showPlaylistContextMenu(key, e.clientX, e.clientY);
            });

            moodGrid.appendChild(card);
        });
    }

    // 2. Sync Quick Grid playlist cards
    document.querySelectorAll('.quick-card[data-playlist-id]').forEach(card => {
        const plId = card.getAttribute('data-playlist-id');
        if (plId === 'liked') return;
        const pl = playlists[plId];
        if (pl) {
            card.style.display = 'flex';
            const titleSpan = card.querySelector('.quick-card-info span');
            if (titleSpan) titleSpan.textContent = pl.name;
            const img = card.querySelector('img');
            if (img) {
                img.src = pl.art;
                img.alt = pl.name;
            }
        } else {
            card.style.display = 'none';
        }
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function showPlaylistContextMenu(playlistId, x, y) {
    if (!playlistId || playlistId === 'liked') return;
    const pl = playlists[playlistId];
    if (!pl) return;

    let menu = document.getElementById('playlist-context-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.id = 'playlist-context-menu';
        menu.className = 'context-menu';
        document.body.appendChild(menu);
    }

    menu.innerHTML = '';

    // Play item
    const itemPlay = document.createElement('div');
    itemPlay.className = 'context-menu-item';
    itemPlay.innerHTML = `<i data-lucide="play" style="width: 14px; height: 14px;"></i> <span>Play Playlist</span>`;
    itemPlay.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = 'none';
        playPlaylist(playlistId);
    });
    menu.appendChild(itemPlay);

    // Rename item
    const itemRename = document.createElement('div');
    itemRename.className = 'context-menu-item';
    itemRename.innerHTML = `<i data-lucide="edit-3" style="width: 14px; height: 14px;"></i> <span>Rename Playlist</span>`;
    itemRename.addEventListener('click', async (e) => {
        e.stopPropagation();
        menu.style.display = 'none';
        const newName = await showPlaylistModal("Rename Playlist", pl.name);
        if (newName && newName.trim() !== '') {
            pl.name = newName.trim();
            savePlaylists();
            renderSidebarPlaylists();
            renderLibraryView();
            renderHomeView();
            if (activePlaylistId === playlistId) {
                renderPlaylistView(playlistId);
            }
        }
    });
    menu.appendChild(itemRename);

    // Delete item
    const itemDelete = document.createElement('div');
    itemDelete.className = 'context-menu-item danger';
    itemDelete.style.color = '#ff5252';
    itemDelete.innerHTML = `<i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> <span>Delete Playlist</span>`;
    itemDelete.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = 'none';
        if (confirm(`Are you sure you want to delete the playlist "${pl.name}"?`)) {
            delete playlists[playlistId];
            savePlaylists();
            renderSidebarPlaylists();
            renderLibraryView();
            renderHomeView();
            if (activePlaylistId === playlistId) {
                navigate('home');
            }
        }
    });
    menu.appendChild(itemDelete);

    if (typeof lucide !== 'undefined') lucide.createIcons();

    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';

    const menuWidth = 180;
    const menuHeight = 120;
    let finalX = x;
    let finalY = y;

    if (x + menuWidth > window.innerWidth) finalX = window.innerWidth - menuWidth - 10;
    if (y + menuHeight > window.innerHeight) finalY = window.innerHeight - menuHeight - 10;

    menu.style.left = `${finalX}px`;
    menu.style.top = `${finalY}px`;
}

function renderLibraryView() {
    const likedCount = likedSongIds.length;
    const countEl = document.getElementById('library-liked-count');
    if (countEl) countEl.textContent = `${likedCount} ${likedCount === 1 ? 'song' : 'songs'}`;

    const grid = document.getElementById('library-playlists-grid');
    if (!grid) return;

    const likedCard = grid.querySelector('.liked-songs-playlist-card');
    grid.innerHTML = '';
    if (likedCard) {
        grid.appendChild(likedCard);
        likedCard.style.cursor = 'pointer';
        likedCard.onclick = (e) => {
            e.stopPropagation();
            navigate('liked');
        };
        likedCard.onkeydown = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('liked');
            }
        };
    }

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

        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showPlaylistContextMenu(key, e.clientX, e.clientY);
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

function renderQueueView() {
    const nowPlayingContainer = document.getElementById('queue-now-playing-container');
    const nextUpBody = document.getElementById('queue-next-up-list-body');
    const queueTable = document.getElementById('queue-table');
    const emptyMsg = document.getElementById('queue-empty-message');
    const clearBtn = document.getElementById('clear-queue-btn');

    if (!nowPlayingContainer || !nextUpBody) return;

    // 1. Now Playing Section
    const currentSong = currentQueue[currentSongIndex];
    if (currentSong) {
        const isLiked = likedSongIds.includes(currentSong.id);
        nowPlayingContainer.innerHTML = `
            <div class="queue-track-row now-playing-row" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; background-color: rgba(255, 255, 255, 0.07); border-radius: 6px; border-left: 4px solid var(--primary-green);">
                <div style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;">
                    <div style="width: 24px; text-align: center; font-size: 14px; color: var(--primary-green); display: flex; align-items: center; justify-content: center;">
                        ${isPlaying ? '<div class="playing-gif" style="display: block;"></div>' : '<i data-lucide="volume-2" class="small-icon" color="var(--primary-green)"></i>'}
                    </div>
                    <img src="${currentSong.cover}" alt="${escapeHTML(currentSong.title)}" style="width: 44px; height: 44px; border-radius: 4px; object-fit: cover;">
                    <div style="display: flex; flex-direction: column; overflow: hidden;">
                        <span style="font-weight: 600; color: var(--primary-green); font-size: 14px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(currentSong.title)}</span>
                        <span style="font-size: 12px; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(currentSong.artist)}</span>
                    </div>
                </div>
                <div style="flex: 1; font-size: 13px; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; padding: 0 16px;">
                    ${escapeHTML(currentSong.album)}
                </div>
                <div style="display: flex; align-items: center; gap: 16px;">
                    <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-song-id="${currentSong.id}" title="${isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}">
                        <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                    </button>
                    <span style="font-size: 13px; color: var(--text-muted); min-width: 40px; text-align: right;">${currentSong.duration}</span>
                    <button class="row-menu-btn" data-song-id="${currentSong.id}" title="More options" style="color: var(--text-muted); padding: 4px;"><i data-lucide="more-horizontal" class="small-icon"></i></button>
                </div>
            </div>
        `;

        const likeBtn = nowPlayingContainer.querySelector('.row-action-btn');
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleLikeSong(currentSong.id);
            });
        }
        const menuBtn = nowPlayingContainer.querySelector('.row-menu-btn');
        if (menuBtn) {
            menuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                showSongContextMenu(currentSong.id, e.clientX, e.clientY);
            });
        }
    } else {
        nowPlayingContainer.innerHTML = '<div style="color: var(--text-muted); font-size: 14px; padding: 12px 0;">Nothing is currently playing</div>';
    }

    // 2. Next Up Section
    nextUpBody.innerHTML = '';
    const upcomingSongs = currentQueue.slice(currentSongIndex + 1);

    if (clearBtn) {
        clearBtn.style.display = upcomingSongs.length > 0 ? 'block' : 'none';
        clearBtn.onclick = () => {
            currentQueue = currentQueue.slice(0, currentSongIndex + 1);
            renderQueueView();
        };
    }

    if (upcomingSongs.length === 0) {
        if (queueTable) queueTable.style.display = 'none';
        if (emptyMsg) emptyMsg.style.display = 'block';
    } else {
        if (queueTable) queueTable.style.display = 'table';
        if (emptyMsg) emptyMsg.style.display = 'none';

        upcomingSongs.forEach((song, idx) => {
            const actualIndex = currentSongIndex + 1 + idx;
            const isLiked = likedSongIds.includes(song.id);
            const row = document.createElement('tr');
            row.setAttribute('data-song-id', song.id);

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
                    <button class="remove-queue-btn" data-queue-index="${actualIndex}" title="Remove from Queue" style="background: transparent; border: none; color: var(--text-muted); padding: 4px; cursor: pointer; transition: color 0.2s ease;">
                        <i data-lucide="minus-circle" class="small-icon"></i>
                    </button>
                    <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}" title="${isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}">
                        <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                    </button>
                    <button class="row-menu-btn" data-song-id="${song.id}" title="More options" style="color: var(--text-muted); padding: 4px; opacity: 0;"><i data-lucide="more-horizontal" class="small-icon"></i></button>
                </td>
            `;

            row.addEventListener('click', (e) => {
                const removeBtn = e.target.closest('.remove-queue-btn');
                const likeBtn = e.target.closest('.row-action-btn');
                const menuBtn = e.target.closest('.row-menu-btn');
                if (removeBtn) {
                    e.stopPropagation();
                    currentQueue.splice(actualIndex, 1);
                    renderQueueView();
                } else if (likeBtn) {
                    e.stopPropagation();
                    toggleLikeSong(song.id);
                } else if (menuBtn) {
                    e.stopPropagation();
                    showSongContextMenu(song.id, e.clientX, e.clientY);
                } else {
                    playSongFromContext(actualIndex, currentQueue);
                    renderQueueView();
                }
            });

            nextUpBody.appendChild(row);
        });
    }

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
    activePlaylistId = playlistId;

    const headerArt = document.getElementById('playlist-header-art');
    const headerTitle = document.getElementById('playlist-header-title');
    const headerDesc = document.getElementById('playlist-header-desc');
    const headerStats = document.getElementById('playlist-header-stats');
    const listBody = document.getElementById('playlist-songs-list-body');

    if (headerArt) headerArt.src = list.art;
    if (headerTitle) {
        headerTitle.textContent = list.name;
        headerTitle.style.cursor = 'pointer';
        headerTitle.title = 'Click to rename playlist';
        headerTitle.onclick = async () => {
            if (!activePlaylistId || activePlaylistId === 'liked') return;
            const pl = playlists[activePlaylistId];
            if (!pl) return;
            const newName = await showPlaylistModal("Rename Playlist", pl.name);
            if (newName && newName.trim() !== '') {
                pl.name = newName.trim();
                savePlaylists();
                renderSidebarPlaylists();
                renderLibraryView();
                renderHomeView();
                renderPlaylistView(activePlaylistId);
            }
        };
    }
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

        btn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showPlaylistContextMenu(key, e.clientX, e.clientY);
        });

        listDiv.appendChild(btn);
    });
}

function updateActiveRowHighlight() {
    const currentSong = currentQueue[currentSongIndex];
    if (!currentSong) return;

    document.querySelectorAll('.songs-table tbody tr').forEach(row => {
        row.classList.remove('active-playing', 'play-state', 'is-playing', 'playing', 'pause-state', 'is-paused', 'paused');
        const playBtn = row.querySelector('.table-row-play-btn');
        const playBtnIcon = row.querySelector('.table-row-play-btn svg, .table-row-play-btn i');
        if (playBtnIcon) {
            playBtnIcon.setAttribute('data-lucide', 'play');
        }

        if (row.getAttribute('data-song-id') === currentSong.id) {
            if (isPlaying) {
                row.classList.add('active-playing', 'play-state', 'is-playing', 'playing');
                if (playBtn) {
                    playBtn.classList.remove('pause-state', 'is-paused', 'paused');
                    playBtn.classList.add('play-state', 'is-playing', 'playing');
                }
                if (playBtnIcon) {
                    playBtnIcon.setAttribute('data-lucide', 'pause');
                }
            } else {
                row.classList.add('pause-state', 'is-paused', 'paused');
                if (playBtn) {
                    playBtn.classList.remove('play-state', 'is-playing', 'playing');
                    playBtn.classList.add('pause-state', 'is-paused', 'paused');
                }
                if (playBtnIcon) {
                    playBtnIcon.setAttribute('data-lucide', 'play');
                }
            }
        } else {
            row.classList.add('pause-state', 'is-paused', 'paused');
            if (playBtn) {
                playBtn.classList.remove('play-state', 'is-playing', 'playing');
                playBtn.classList.add('pause-state', 'is-paused', 'paused');
            }
        }
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// --- 11. Search & History Functionality (Spotify Style) ---
function renderSearchHistory() {
    const historyGrid = document.getElementById('search-history-grid');
    const historyEmpty = document.getElementById('search-history-empty');
    const clearBtn = document.getElementById('clear-history-btn');
    if (!historyGrid) return;

    historyGrid.innerHTML = '';

    // Safely filter valid songs currently existing in database
    const historySongs = listeningHistory
        .map(id => songs.find(s => s.id === id))
        .filter(Boolean);

    if (historySongs.length === 0) {
        historyGrid.style.display = 'none';
        if (historyEmpty) historyEmpty.style.display = 'block';
        if (clearBtn) clearBtn.style.display = 'none';
        return;
    }

    historyGrid.style.display = 'grid';
    if (historyEmpty) historyEmpty.style.display = 'none';
    if (clearBtn) {
        clearBtn.style.display = 'block';
        clearBtn.onclick = (e) => {
            e.stopPropagation();
            listeningHistory = [];
            localStorage.setItem('mucify_listening_history', JSON.stringify(listeningHistory));
            renderSearchHistory();
        };
    }

    historySongs.forEach((song) => {
        const card = document.createElement('div');
        card.className = 'music-card';
        card.setAttribute('data-song-id', song.id);

        card.innerHTML = `
            <div class="card-art-wrapper">
                <img src="${song.cover}" alt="${escapeHTML(song.title)}" class="card-img">
                <button class="play-card-btn hover-reveal" title="Play Track"><i data-lucide="play" class="play-card-icon"></i></button>
                <button class="remove-history-btn" title="Remove from history"><i data-lucide="x" class="small-icon"></i></button>
            </div>
            <div class="card-metadata">
                <h3>${escapeHTML(song.title)}</h3>
                <p>${escapeHTML(song.artist)}</p>
            </div>
        `;

        card.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.remove-history-btn');
            const playBtn = e.target.closest('.play-card-btn');

            if (removeBtn) {
                e.stopPropagation();
                listeningHistory = listeningHistory.filter(id => id !== song.id);
                localStorage.setItem('mucify_listening_history', JSON.stringify(listeningHistory));
                renderSearchHistory();
            } else {
                const songIdx = songs.findIndex(s => s.id === song.id);
                if (songIdx !== -1) {
                    playSongFromContext(songIdx, songs);
                }
            }
        });

        historyGrid.appendChild(card);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function handleSearch() {
    if (!elSearchInput) return;
    const query = elSearchInput.value.trim().toLowerCase();
    if (elClearSearchBtn) {
        elClearSearchBtn.style.display = query.length > 0 ? 'block' : 'none';
    }

    const resultsSection = document.getElementById('search-results-section');
    const topResultCard = document.getElementById('top-result-card');
    const topSongsList = document.getElementById('top-songs-list');
    const tableResultsBody = document.getElementById('search-results-body');
    const searchHeaderTitle = document.getElementById('search-results-title');
    const historySection = document.getElementById('search-history-section');

    if (!query) {
        if (resultsSection) resultsSection.style.display = 'none';
        if (historySection) {
            historySection.style.display = 'block';
            renderSearchHistory();
        }
        return;
    }

    if (historySection) historySection.style.display = 'none';
    if (resultsSection) resultsSection.style.display = 'block';

    const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
        if (topResultCard) topResultCard.innerHTML = `<div style="padding: 24px; color: var(--text-muted); font-size: 14px;">No top result found</div>`;
        if (topSongsList) topSongsList.innerHTML = `<div style="padding: 16px; color: var(--text-muted); font-size: 14px;">No matching songs</div>`;
        if (tableResultsBody) {
            tableResultsBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted); padding: 32px;">No tracks found matching "${escapeHTML(query)}"</td></tr>`;
        }
        if (searchHeaderTitle) searchHeaderTitle.textContent = `All Songs matching "${escapeHTML(query)}"`;
        return;
    }

    // 1. Top Result (#1 Best Match)
    const topMatch = filtered[0];
    const topMatchIdx = songs.findIndex(s => s.id === topMatch.id);

    if (topResultCard) {
        topResultCard.innerHTML = `
            <img src="${topMatch.cover}" alt="${escapeHTML(topMatch.title)}" class="top-result-art">
            <div class="top-result-title">${escapeHTML(topMatch.title)}</div>
            <div class="top-result-meta">
                <span class="top-result-badge">Song</span>
                <span>${escapeHTML(topMatch.artist)}</span>
            </div>
            <button class="play-card-btn hover-reveal" title="Play ${escapeHTML(topMatch.title)}">
                <i data-lucide="play" class="play-card-icon"></i>
            </button>
        `;
        topResultCard.onclick = () => {
            if (topMatchIdx !== -1) playSongFromContext(topMatchIdx, songs);
        };
    }

    // 2. Top Songs List (First 4 matches in compact Spotify row format)
    if (topSongsList) {
        topSongsList.innerHTML = '';
        const top4 = filtered.slice(0, 4);

        top4.forEach((song) => {
            const songIdx = songs.findIndex(s => s.id === song.id);
            const isLiked = likedSongIds.includes(song.id);
            const row = document.createElement('div');
            row.className = 'search-song-row';
            row.innerHTML = `
                <div class="search-song-left">
                    <img src="${song.cover}" alt="${escapeHTML(song.title)}" class="search-song-art">
                    <div class="search-song-info">
                        <span class="search-song-title">${escapeHTML(song.title)}</span>
                        <span class="search-song-artist">${escapeHTML(song.artist)}</span>
                    </div>
                </div>
                <div class="search-song-right">
                    <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}" style="background: none; border: none; cursor: pointer;">
                        <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                    </button>
                    <span>${song.duration}</span>
                </div>
            `;

            row.addEventListener('click', (e) => {
                const likeBtn = e.target.closest('.row-action-btn');
                if (likeBtn) {
                    e.stopPropagation();
                    toggleLikeSong(song.id);
                } else if (songIdx !== -1) {
                    playSongFromContext(songIdx, songs);
                }
            });

            topSongsList.appendChild(row);
        });
    }

    // 3. Full Matching Tracks Table
    if (searchHeaderTitle) {
        searchHeaderTitle.textContent = `All Songs matching "${query}"`;
    }

    if (tableResultsBody) {
        tableResultsBody.innerHTML = '';

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
    }

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

    const itemAddQueue = document.createElement('div');
    itemAddQueue.className = 'context-menu-item';
    itemAddQueue.innerHTML = `<i data-lucide="list-plus" style="width: 14px; height: 14px;"></i> <span>Add to Queue</span>`;
    itemAddQueue.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = 'none';
        const targetSong = songs.find(s => s.id === songId);
        if (targetSong) {
            currentQueue.push(targetSong);
            if (currentView === 'queue') {
                renderQueueView();
            }
        }
    });
    menu.appendChild(itemAddQueue);

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
    greetingEl.textContent = 'Hey there!';
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
            if (isMuted || volume === 0) {
                isMuted = false;
                volume = (previousVolume > 0) ? previousVolume : 0.7;
            } else {
                isMuted = true;
                if (volume > 0) previousVolume = volume;
            }
            if (audio) {
                audio.muted = isMuted;
                audio.volume = isMuted ? 0 : volume;
            }
            localStorage.setItem('mucify_volume', volume.toString());
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

    // Search Keyboard Shortcuts (/ or Ctrl+K to focus, Escape to clear)
    document.addEventListener('keydown', (e) => {
        const isInput = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);
        if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && !isInput) {
            e.preventDefault();
            navigate('search');
            if (elSearchInput) elSearchInput.focus();
        } else if (e.key === 'Escape' && document.activeElement === elSearchInput) {
            if (elSearchInput.value) {
                elSearchInput.value = '';
                handleSearch();
            } else {
                elSearchInput.blur();
            }
        }
    });

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

        const plContextMenu = document.getElementById('playlist-context-menu');
        if (plContextMenu) plContextMenu.style.display = 'none';

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
            renderLibraryView();
            renderHomeView();
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
                renderLibraryView();
                renderHomeView();
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
                renderLibraryView();
                renderHomeView();
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

    // Queue Button - Toggles Spotify Queue View
    const btnQueue = document.getElementById('btn-queue');
    if (btnQueue) {
        btnQueue.addEventListener('click', () => {
            if (currentView === 'queue') {
                navBack();
            } else {
                navigate('queue');
            }
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
        card.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-card-btn');
            const plId = card.getAttribute('data-playlist-id');
            if (playBtn) {
                e.stopPropagation();
                playPlaylist(plId);
            } else {
                if (plId === 'liked') {
                    navigate('liked');
                } else {
                    navigate('playlist', true, plId);
                }
            }
        });
    });

    // Home Top Tracks Music Cards
    document.querySelectorAll('#home-view .music-card[data-song-index]').forEach(card => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.getAttribute('data-song-index'), 10);
            playSongFromContext(idx, songs);
        });
    });

    // Home Mood Boosters Playlist Cards
    document.querySelectorAll('#home-view .music-card[data-playlist-id]').forEach(card => {
        card.addEventListener('click', (e) => {
            const playBtn = e.target.closest('.play-card-btn');
            const plId = card.getAttribute('data-playlist-id');
            if (playBtn) {
                e.stopPropagation();
                playPlaylist(plId);
            } else {
                if (plId === 'liked') {
                    navigate('liked');
                } else {
                    navigate('playlist', true, plId);
                }
            }
        });
    });

    // Event delegation on library playlists grid for Liked Songs & custom cards
    const libGrid = document.getElementById('library-playlists-grid');
    if (libGrid) {
        libGrid.addEventListener('click', (e) => {
            const likedCard = e.target.closest('.liked-songs-playlist-card, [data-view="liked"]');
            if (likedCard) {
                e.stopPropagation();
                navigate('liked');
            }
        });
    }
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
    if (rect.width === 0) return;
    let offsetX = e.clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const newVol = offsetX / rect.width;

    volume = newVol;
    if (volume > 0) {
        isMuted = false;
        previousVolume = volume;
    } else {
        isMuted = true;
    }

    if (audio) {
        audio.muted = isMuted;
        audio.volume = isMuted ? 0 : volume;
    }
    localStorage.setItem('mucify_volume', volume.toString());
    syncVolumeUI();
}

function syncVolumeUI() {
    const activeVol = isMuted ? 0 : volume;
    const pct = activeVol * 100;

    if (elVolumeFill) elVolumeFill.style.width = `${pct}%`;
    if (elVolumeThumb) elVolumeThumb.style.left = `${pct}%`;

    const muteBtn = elVolumeBtn || document.getElementById('btn-mute');
    if (muteBtn) {
        if (isMuted || activeVol === 0) {
            muteBtn.innerHTML = VOLUME_MUTED_SVG;
            muteBtn.setAttribute('title', 'Unmute');
            muteBtn.setAttribute('aria-label', 'Unmute');
        } else if (activeVol < 0.5) {
            muteBtn.innerHTML = VOLUME_LOW_SVG;
            muteBtn.setAttribute('title', 'Mute');
            muteBtn.setAttribute('aria-label', 'Mute');
        } else {
            muteBtn.innerHTML = VOLUME_HIGH_SVG;
            muteBtn.setAttribute('title', 'Mute');
            muteBtn.setAttribute('aria-label', 'Mute');
        }
    }
}
