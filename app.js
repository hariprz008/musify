/**
 * Mucify - Web Player JavaScript
 * Implements audio playback controls, view routing, playlist management,
 * search filters, history nav, volume sliders, and Cloudinary fallback logic.
 */

// 1. Database of Songs
const songs = [
    {
        id: "song-1",
        title: "Aura 10-10",
        artist: "Aura",
        album: "Cosmic Glow",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783244820/Aura_10-10_bkjowp.mp3",
        localUrl: "songs/Aura 10-10.mp3",
        cover: "assets/aura.png",
        duration: "3:01",
        durationSec: 181,
        artistBio: "Aura blends ethereal soundscapes with retro synthesis to transport listeners to another dimension. Their style is characterized by deep basslines, pulsing arpeggios, and cosmic visual aesthetics."
    },
    {
        id: "song-2",
        title: "God Mode",
        artist: "sai abhyankar",
        album: "karuppu",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783244817/God_Mode_gm64ej.mp3",
        localUrl: "songs/God Mode.mp3",
        cover: "assets/god_mode.png",
        duration: "5:28",
        durationSec: 328,
        artistBio: "God Mode is a cyber-metal and electronic production duo. Inspired by high-stakes gaming and virtual worlds, their tracks feature crushing synthesizers and fast-paced breakbeats."
    },
    {
        id: "song-3",
        title: "Cook Cook",
        artist: "santhosh narayanan",
        album: "cook cook",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783244815/Cook_Cook_mi8dq3.mp3",
        localUrl: "songs/Cook Cook.mp3",
        cover: "assets/cook_cook.png",
        duration: "1:54",
        durationSec: 114,
        artistBio: "Cook Cook delivers high-fidelity lo-fi beats infused with culinary ambient soundscapes. Perfect for relaxing, studying, or adding rhythm to your daily culinary activities."
    },
    {
        id: "song-4",
        title: "HEAVENLY_JUMPSTYLE",
        artist: "INNXCENCE",
        album: "phonk",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783250135/HEAVENLY_JUMPSTYLE_q1zcbp.mp3",
        localurl: "songs/HEAVENLY_JUMPSTYLE",
        cover: "assets/HEAVENLY_JUMPSTYLE.png",
        duration: "1:54",
        durationsec: 114,
        artistBio: "high-fidelity lo-fi beats infused with culinary ambient soundscapes. Perfect for relaxing, studying, or adding rhythm to your daily culinary activities."
    },
    {
        id: "song-5",
        title: "Nallaru Po",
        artist: "sai abhyankar",
        album: "DUDE",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783250145/Nallaru_Po_-_From_Dude_swkipw.mp3",
        localurl: "songs/Nallaru Po",
        cover: "assets/Nallaru Po.png",
        duration: "3:54",
        durationsec: "234",
        aristBio: "high-fidelity lo-fi beats infused with culinary ambient soundscapes. Perfect for relaxing, studying, or adding rhythm to your daily culinary activities."
    },
    {
        id: "song-6",
        title: "Naanga Naalu Peru",
        artist: "sai abhyankar",
        album: "karuppu",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783250137/Naanga_Naalu_Peru_trlzhu.mp3",
        localurl: "songs/Naanga Naalu Peru",
        cover: "assets/Naanga-Naalu-Peru-From-Karuppu-Tamil-2026-20260327132334-500x500.jpg",
        duration: "3:17",
        durationsec: "190",
        artistBio: "high-fidelity lo-fi beats infused with culinary ambient soundscapes. Perfect for relaxing, studying, or adding rhythm to your daily culinary activities."
    },
    {
        id: "song-7",
        title: "JMSN_-_Love_Me",
        artist: "JMSN",
        album: "love me",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783250130/JMSN_-_Love_Me__mp3.pm_eqyel5.mp3",
        localurl: "songs/JMSN_-_Love_Me",
        cover: "LOVE-ME-Korean-2025-20250805101550-500x500.jpg",
        duration: "4:28",
        durationsec: "256",
        artistBio: "high-fidelity lo-fi beats infused with culinary ambient soundscapes. Perfect for relaxing, studying, or adding rhythm to your daily culinary activities."
    },
    {
        id: "song-8",
        title: "i thought i see you face again",
        artist: "she and him",
        album: "i thought i see you face again",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783250129/I_Thought_I_Saw_Your_Face_Today_spotdown.org_e0cnqn.mp3",
        localurl: "songs/I Thought I Saw Your Face Today",
        cover: "https___images.genius.com_02536cfd852046da53621835e510f559.1000x1000x1.jpg",
        duration: "2:49",
        durationsec: 149,
        artistBio: "high-fidelity lo-fi beats infused with culinary ambient soundscapes. Perfect for relaxing, studying, or adding rhythm to your daily culinary activities."
    },
    {
        id: "song-9",
        title: "Nenjil-Mamazhai-Thanthu",
        artist: "Ajaneesh Loknath",
        album: "Nimir",
        url: "https://res.cloudinary.com/dxvguv2vw/video/upload/v1783250145/Nenjil-Mamazhai-Thanthu-MassTamilan.com_vlbe8t.mp3",
        localurl: "songs/Nenjil-Mamazhai-Thanthu",
        cover: "Nimir-Tamil-2018-20180118082105-500x500.jpg",
        duration: "4:39",
        durationsec: 263,
        artistBio: "high-fidelity lo-fi beats infused with culinary ambient soundscapes. Perfect for relaxing, studying, or adding rhythm to your daily culinary activities."
    }
];

// 2. Playlists Definitions
let likedSongIds = JSON.parse(localStorage.getItem('mucify_liked_songs')) || [];

const defaultPlaylists = {
    "liked": {
        name: "Liked Songs",
        desc: "Your collection of favorite tracks.",
        art: "liked", // Special flag
        songs: likedSongIds
    },
    "playlist-1": {
        name: "slient night",
        desc: "Lo-Fi tunes for a relaxed mood and late night coding.",
        art: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=300&q=80",
        songs: ["song-1", "song-3"]
    },
    "playlist-2": {
        name: "bass boost",
        desc: "Upbeat instrumentals to keep your concentration sharp.",
        art: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=300&q=80",
        songs: ["song-2", "song-1"]
    }
};

let playlists = JSON.parse(localStorage.getItem('mucify_playlists'));
if (!playlists) {
    playlists = defaultPlaylists;
} else {
    // Sync Liked Songs reference to local storage
    playlists["liked"] = defaultPlaylists["liked"];
}

function savePlaylists() {
    localStorage.setItem('mucify_playlists', JSON.stringify(playlists));
}

// 3. Audio & Player State Variables
const audio = document.getElementById('audio-player');
let currentQueue = [...songs]; // List of song objects currently in queue
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let repeatMode = 'off'; // 'off' | 'all' | 'one'
let volume = parseFloat(localStorage.getItem('mucify_volume')) || 0.7;
let isMuted = false;
let previousVolume = volume;

// Queue history tracking for shuffle mode
let playbackHistory = [];

// Navigation History Stack
const viewHistory = ['home'];
let historyIndex = 0;

// Current Active View
let currentView = 'home';
let activePlaylistId = null;

// UI Elements
const elPlayPauseBtn = document.getElementById('btn-play-pause');
// elPlayPauseIcon is resolved dynamically to prevent stale references after Lucide replacements
const elPrevBtn = document.getElementById('btn-prev');
const elNextBtn = document.getElementById('btn-next');
const elShuffleBtn = document.getElementById('btn-shuffle');
const elRepeatBtn = document.getElementById('btn-repeat');
const elProgressTrack = document.getElementById('progress-track');
const elProgressFill = document.getElementById('progress-fill');
const elProgressThumb = document.getElementById('progress-thumb');
const elTimeCurrent = document.getElementById('time-current');
const elTimeTotal = document.getElementById('time-total');
const elPlayerArt = document.getElementById('player-art');
const elPlayerTitle = document.getElementById('player-title');
const elPlayerArtist = document.getElementById('player-artist');
const elPlayerLikeBtn = document.getElementById('player-like-btn');
const elMuteBtn = document.getElementById('btn-mute');
// elVolumeIcon is resolved dynamically to prevent stale references after Lucide replacements
const elVolumeTrack = document.getElementById('volume-track');
const elVolumeFill = document.getElementById('volume-fill');
const elVolumeThumb = document.getElementById('volume-thumb');
const elSearchInput = document.getElementById('search-input');
const elHeaderSearchBar = document.getElementById('header-search-bar');
const elClearSearchBtn = document.getElementById('clear-search-btn');
const elGreetingTitle = document.getElementById('greeting-title');
const elScrollContainer = document.getElementById('scroll-container');
const elMainHeader = document.querySelector('.main-header');
const elNavBack = document.getElementById('nav-back');
const elNavForward = document.getElementById('nav-forward');
const elNowPlayingPanel = document.getElementById('now-playing-panel');
const elBtnNowPlaying = document.getElementById('btn-now-playing');
const elCloseNowPlaying = document.getElementById('close-now-playing');
const elProfileMenu = document.querySelector('.profile-menu');
const elProfileDropdown = document.getElementById('profile-dropdown-menu');

// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    initAudio();
    initEventListeners();
    renderSidebarPlaylists();
    syncVolumeUI();
    navigate('home', false); // Load default view
    
    // Set initial song in footer (don't play)
    loadSong(songs[0], false);
});

// --- Greetings Logic ---
function setGreeting() {
    const hours = new Date().getHours();
    let greeting = "Good afternoon";
    if (hours < 12) {
        greeting = "Good morning";
    } else if (hours >= 18) {
        greeting = "Good evening";
    }
    if (elGreetingTitle) elGreetingTitle.textContent = greeting;
}

// --- Audio Initialization & Handlers ---
function initAudio() {
    audio.volume = isMuted ? 0 : volume;

    // Track Time Update
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            elProgressFill.style.width = `${percent}%`;
            elProgressThumb.style.left = `${percent}%`;
            elTimeCurrent.textContent = formatTime(audio.currentTime);
        }
    });

    // Duration Loaded
    audio.addEventListener('loadedmetadata', () => {
        elTimeTotal.textContent = formatTime(audio.duration);
    });

    // Handle Ended Track
    audio.addEventListener('ended', () => {
        if (repeatMode === 'one') {
            audio.currentTime = 0;
            playAudio();
        } else {
            nextSong();
        }
    });

    // Audio Error Fallback (Cloudinary fails, try local directory)
    audio.addEventListener('error', (e) => {
        const currentSong = currentQueue[currentSongIndex];
        console.warn(`Cloudinary loading failed for "${currentSong.title}". Reverting to local asset...`, e);
        
        // Check if we already tried local Url to avoid infinite loop
        if (audio.src !== window.location.origin + '/' + currentSong.localUrl && !audio.src.endsWith(currentSong.localUrl)) {
            audio.src = currentSong.localUrl;
            if (isPlaying) {
                playAudio();
            }
        }
    });
}

// --- Player Controls Logic ---
function loadSong(song, shouldPlay = true) {
    if (!song) return;

    // Try Cloudinary URL first
    audio.src = song.url;
    
    // Update footer info
    elPlayerArt.src = song.cover;
    elPlayerTitle.textContent = song.title;
    elPlayerArtist.textContent = song.artist;
    
    // Update Like Heart icon in player
    if (likedSongIds.includes(song.id)) {
        elPlayerLikeBtn.classList.add('liked');
        const icon = elPlayerLikeBtn.querySelector('svg, i');
        if (icon) icon.setAttribute('fill', 'var(--primary-green)');
    } else {
        elPlayerLikeBtn.classList.remove('liked');
        const icon = elPlayerLikeBtn.querySelector('svg, i');
        if (icon) icon.removeAttribute('fill');
    }

    // Update Right Panel Now Playing
    document.getElementById('panel-song-art').src = song.cover;
    document.getElementById('panel-song-title').textContent = song.title;
    document.getElementById('panel-song-artist').textContent = song.artist;
    document.getElementById('panel-artist-bio').textContent = song.artistBio;

    // Reset timelines
    elProgressFill.style.width = '0%';
    elProgressThumb.style.left = '0%';
    elTimeCurrent.textContent = "0:00";
    elTimeTotal.textContent = song.duration;

    // Highlight row in list
    updateActiveRowHighlight();

    if (shouldPlay) {
        playAudio();
    } else {
        pauseAudio();
    }
}

function playAudio() {
    isPlaying = true;
    const playPauseIcon = document.getElementById('play-pause-icon');
    if (playPauseIcon) {
        playPauseIcon.setAttribute('data-lucide', 'pause');
        playPauseIcon.setAttribute('fill', '#000');
    }
    lucide.createIcons();
    
    audio.play().catch(err => {
        console.log("Autoplay blocked by browser. User gesture required.", err);
        isPlaying = false;
        elPlayPauseIcon.setAttribute('data-lucide', 'play');
        lucide.createIcons();
    });
}

function pauseAudio() {
    isPlaying = false;
    const playPauseIcon = document.getElementById('play-pause-icon');
    if (playPauseIcon) {
        playPauseIcon.setAttribute('data-lucide', 'play');
        playPauseIcon.setAttribute('fill', '#000');
    }
    lucide.createIcons();
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
    if (audio.currentTime > 3) {
        // If song is more than 3 seconds in, restart it
        audio.currentTime = 0;
        return;
    }

    if (isShuffle && playbackHistory.length > 1) {
        // Pop current song, get previous
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
    if (isShuffle) {
        // Choose index at random (excluding current if possible)
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
            audio.currentTime = 0;
            return;
        }
        currentSongIndex = (currentSongIndex + 1) % currentQueue.length;
    }

    loadSong(currentQueue[currentSongIndex]);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    elShuffleBtn.classList.toggle('active', isShuffle);
    
    // Clear history stack
    playbackHistory = [];
    if (isShuffle) {
        playbackHistory.push(currentQueue[currentSongIndex].id);
    }
}

function toggleRepeat() {
    if (repeatMode === 'off') {
        repeatMode = 'all';
        elRepeatBtn.classList.add('active');
        elRepeatBtn.title = "Repeat All";
    } else if (repeatMode === 'all') {
        repeatMode = 'one';
        elRepeatBtn.classList.add('active');
        const icon = elRepeatBtn.querySelector('svg, i');
        if (icon) icon.setAttribute('data-lucide', 'repeat-1');
        elRepeatBtn.title = "Repeat One";
    } else {
        repeatMode = 'off';
        elRepeatBtn.classList.remove('active');
        const icon = elRepeatBtn.querySelector('svg, i');
        if (icon) icon.setAttribute('data-lucide', 'repeat');
        elRepeatBtn.title = "Repeat Off";
    }
    lucide.createIcons();
}

// --- Playlist / Queue Loading Logic ---
function playSongFromContext(songIndex, queueContext) {
    currentQueue = [...queueContext];
    currentSongIndex = songIndex;
    
    playbackHistory = [currentQueue[currentSongIndex].id];
    loadSong(currentQueue[currentSongIndex], true);
}

function playPlaylist(playlistId) {
    const list = playlists[playlistId];
    if (!list) return;
    if (list.songs.length === 0) {
        alert("This playlist has no songs yet. Click the three-dots (...) menu next to any song in Search or other views to add tracks!");
        return;
    }
    
    const playlistSongs = songs.filter(s => list.songs.includes(s.id));
    playSongFromContext(0, playlistSongs);
}

// --- Liking Songs Logic ---
function toggleLikeSong(songId) {
    if (likedSongIds.includes(songId)) {
        likedSongIds = likedSongIds.filter(id => id !== songId);
    } else {
        likedSongIds.push(songId);
    }
    localStorage.setItem('mucify_liked_songs', JSON.stringify(likedSongIds));
    playlists["liked"].songs = likedSongIds;
    savePlaylists();

    // Refresh UI views
    syncLikeButtons(songId);
    
    // Refresh lists dynamically
    if (currentView === 'liked') {
        renderLikedSongsView();
    } else if (currentView === 'library') {
        renderLibraryView();
    }
}

function syncLikeButtons(songId) {
    const isLiked = likedSongIds.includes(songId);
    
    // Sync Bottom Player Like btn
    const currentSong = currentQueue[currentSongIndex];
    if (currentSong && currentSong.id === songId) {
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

    // Sync any row action buttons on tables
    document.querySelectorAll(`.row-action-btn[data-song-id="${songId}"]`).forEach(btn => {
        btn.classList.toggle('liked', isLiked);
        const icon = btn.querySelector('svg, i');
        if (icon) {
            if (isLiked) {
                btn.setAttribute('title', 'Remove from Liked Songs');
                icon.setAttribute('fill', 'var(--primary-green)');
                icon.setAttribute('color', 'var(--primary-green)');
            } else {
                btn.setAttribute('title', 'Save to Liked Songs');
                icon.removeAttribute('fill');
                icon.setAttribute('color', 'currentColor');
            }
        }
    });

    // Update Lucide SVG bindings
    lucide.createIcons();
}

// --- Navigation / Routing Logic ---
function navigate(viewName, addToHistory = true, playlistId = null) {
    // Hide all views
    document.querySelectorAll('.content-view').forEach(view => {
        view.style.display = 'none';
    });

    // Remove active sidebar state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.playlist-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    currentView = viewName;
    activePlaylistId = playlistId;
    elHeaderSearchBar.style.display = 'none';

    // Show appropriate view & run display logic
    if (viewName === 'home') {
        document.getElementById('home-view').style.display = 'block';
        document.querySelector('[data-view="home"]').classList.add('active');
        setGreeting();
    } else if (viewName === 'search') {
        document.getElementById('search-view').style.display = 'block';
        document.querySelector('[data-view="search"]').classList.add('active');
        elHeaderSearchBar.style.display = 'block';
        setTimeout(() => elSearchInput.focus(), 50);
        handleSearch(); // trigger search filter
    } else if (viewName === 'library') {
        document.getElementById('library-view').style.display = 'block';
        document.querySelector('[data-view="library"]').classList.add('active');
        renderLibraryView();
    } else if (viewName === 'liked') {
        document.getElementById('liked-songs-view').style.display = 'block';
        document.querySelector('[data-view="liked"]').classList.add('active');
        activePlaylistId = 'liked';
        renderLikedSongsView();
    } else if (viewName === 'playlist' && playlistId) {
        document.getElementById('playlist-view').style.display = 'block';
        
        // Highlight in sidebar if it exists there
        const sidebarPlItem = document.querySelector(`.playlist-nav-item[data-playlist-id="${playlistId}"]`);
        if (sidebarPlItem) sidebarPlItem.classList.add('active');

        renderPlaylistView(playlistId);
    }

    // Scroll main view back to top
    elScrollContainer.scrollTop = 0;
    elMainHeader.classList.remove('scrolled');

    // Manage nav history lists
    if (addToHistory) {
        // If we were backward in stack, slice forward entries
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

// --- View Rendering Logic ---

// 1. Library View
function renderLibraryView() {
    const likedCount = likedSongIds.length;
    document.getElementById('library-liked-count').textContent = `${likedCount} ${likedCount === 1 ? 'song' : 'songs'}`;

    const grid = document.getElementById('library-playlists-grid');
    // Clear dynamic playlists (keep Liked Card which is static in HTML)
    const likedCard = grid.querySelector('.liked-songs-playlist-card');
    grid.innerHTML = '';
    grid.appendChild(likedCard);

    // List custom playlists
    Object.keys(playlists).forEach(key => {
        if (key === 'liked') return;
        const pl = playlists[key];
        
        const card = document.createElement('div');
        card.className = 'music-card playlist-card';
        card.setAttribute('data-playlist-id', key);
        card.innerHTML = `
            <div class="card-art-wrapper">
                <img src="${pl.art}" alt="${pl.name}" class="card-img">
                <button class="play-card-btn hover-reveal"><i data-lucide="play" class="play-card-icon"></i></button>
            </div>
            <div class="card-metadata">
                <h3>${pl.name}</h3>
                <p>${pl.desc}</p>
            </div>
        `;
        
        // Click to navigate, hover play to play direct
        card.addEventListener('click', (e) => {
            if (e.target.closest('.play-card-btn')) {
                e.stopPropagation();
                playPlaylist(key);
            } else {
                navigate('playlist', true, key);
            }
        });

        grid.appendChild(card);
    });

    lucide.createIcons();
}

// 2. Liked Songs View
function renderLikedSongsView() {
    const listBody = document.getElementById('liked-songs-list-body');
    const emptyMsg = document.getElementById('liked-empty-message');
    const table = document.getElementById('liked-songs-table');
    const statsCount = document.getElementById('liked-songs-count');
    
    listBody.innerHTML = '';
    const likedCount = likedSongIds.length;
    statsCount.textContent = `${likedCount} ${likedCount === 1 ? 'song' : 'songs'}`;

    if (likedCount === 0) {
        table.style.display = 'none';
        emptyMsg.style.display = 'flex';
        return;
    }

    table.style.display = 'table';
    emptyMsg.style.display = 'none';

    // Filter songs matching liked ids
    const likedSongs = songs.filter(s => likedSongIds.includes(s.id));

    likedSongs.forEach((song, idx) => {
        const row = document.createElement('tr');
        row.setAttribute('data-song-id', song.id);
        
        // Mock a relative Date Added (e.g. 2 days ago)
        const dateAdded = "Jul 5, 2026";
        
        row.innerHTML = `
            <td class="col-index">
                <span class="index-num">${idx + 1}</span>
                <div class="playing-gif"></div>
                <button class="table-row-play-btn"><i data-lucide="play" fill="#fff" color="#fff" class="small-icon"></i></button>
            </td>
            <td class="col-title">
                <img src="${song.cover}" alt="${song.title}">
                <div class="title-info">
                    <span class="song-name-cell">${song.title}</span>
                    <span class="song-artist-cell">${song.artist}</span>
                </div>
            </td>
            <td class="col-album">${song.album}</td>
            <td class="col-date">${dateAdded}</td>
            <td class="col-duration">${song.duration}</td>
            <td class="col-actions" style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
                <button class="row-action-btn liked" data-song-id="${song.id}" title="Remove from Liked Songs">
                    <i data-lucide="heart" fill="var(--primary-green)" color="var(--primary-green)" class="small-icon"></i>
                </button>
                <button class="row-menu-btn" data-song-id="${song.id}" title="More options" style="color: var(--text-muted); padding: 4px; transition: var(--transition-fast); opacity: 0;"><i data-lucide="more-horizontal" class="small-icon"></i></button>
            </td>
        `;

        // Handle Row Actions
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

    lucide.createIcons();
}

// 3. Dynamic Playlist Detail View
function renderPlaylistView(playlistId) {
    const list = playlists[playlistId];
    if (!list) return;

    document.getElementById('playlist-header-art').src = list.art;
    document.getElementById('playlist-header-title').textContent = list.name;
    document.getElementById('playlist-header-desc').textContent = list.desc;
    
    const listBody = document.getElementById('playlist-songs-list-body');
    listBody.innerHTML = '';
    
    // Collect song items matching list IDs
    const playlistSongs = songs.filter(s => list.songs.includes(s.id));
    document.getElementById('playlist-header-stats').textContent = `${playlistSongs.length} ${playlistSongs.length === 1 ? 'song' : 'songs'}`;

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
                <img src="${song.cover}" alt="${song.title}">
                <div class="title-info">
                    <span class="song-name-cell">${song.title}</span>
                    <span class="song-artist-cell">${song.artist}</span>
                </div>
            </td>
            <td class="col-album">${song.album}</td>
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

    // Update play button hook
    const actionPlayBtn = document.getElementById('playlist-play-btn-action');
    // Clear old listeners
    const newPlayBtn = actionPlayBtn.cloneNode(true);
    actionPlayBtn.replaceWith(newPlayBtn);
    newPlayBtn.addEventListener('click', () => {
        playPlaylist(playlistId);
    });

    lucide.createIcons();
}

// 4. Sidebar Playlists
function renderSidebarPlaylists() {
    const listDiv = document.getElementById('sidebar-playlists');
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

// Highlight Row of current playing song
function updateActiveRowHighlight() {
    const currentSong = currentQueue[currentSongIndex];
    if (!currentSong) return;

    // Clear previous playing state
    document.querySelectorAll('.songs-table tbody tr').forEach(row => {
        row.classList.remove('active-playing');
    });

    // Add playing highlight to currently playing ID rows
    document.querySelectorAll(`.songs-table tbody tr[data-song-id="${currentSong.id}"]`).forEach(row => {
        row.classList.add('active-playing');
    });
}

// --- Search Filtering Logic ---
function handleSearch() {
    const query = elSearchInput.value.trim().toLowerCase();
    const resultsSection = document.getElementById('search-results-section');
    const resultsBody = document.getElementById('search-results-body');
    
    if (query === '') {
        resultsSection.style.display = 'none';
        elClearSearchBtn.style.display = 'none';
        return;
    }

    elClearSearchBtn.style.display = 'block';
    resultsSection.style.display = 'block';
    resultsBody.innerHTML = '';

    // Filter database
    const matchedSongs = songs.filter(song => 
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query) ||
        song.album.toLowerCase().includes(query)
    );

    if (matchedSongs.length === 0) {
        resultsBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 32px; color: var(--text-muted);">
                    No results found for "${elSearchInput.value}"
                </td>
            </tr>
        `;
        return;
    }

    matchedSongs.forEach((song, idx) => {
        const row = document.createElement('tr');
        row.setAttribute('data-song-id', song.id);
        const isLiked = likedSongIds.includes(song.id);

        row.innerHTML = `
            <td class="col-index">
                <span class="index-num">${idx + 1}</span>
                <div class="playing-gif"></div>
                <button class="table-row-play-btn"><i data-lucide="play" fill="#fff" color="#fff" class="small-icon"></i></button>
            </td>
            <td class="col-title">
                <img src="${song.cover}" alt="${song.title}">
                <div class="title-info">
                    <span class="song-name-cell">${song.title}</span>
                    <span class="song-artist-cell">${song.artist}</span>
                </div>
            </td>
            <td class="col-album">${song.album}</td>
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
                // When playing from search results, load them as current queue
                playSongFromContext(idx, matchedSongs);
            }
        });

        resultsBody.appendChild(row);
    });

    updateActiveRowHighlight();
    lucide.createIcons();
}

// --- Volume & Slider Seek Calculations ---
function syncVolumeUI() {
    const percent = isMuted ? 0 : volume * 100;
    elVolumeFill.style.width = `${percent}%`;
    elVolumeThumb.style.left = `${percent}%`;
    
    // Icon update
    const volumeIcon = document.getElementById('volume-icon');
    if (volumeIcon) {
        if (isMuted || volume === 0) {
            volumeIcon.setAttribute('data-lucide', 'volume-x');
        } else if (volume < 0.3) {
            volumeIcon.setAttribute('data-lucide', 'volume');
        } else if (volume < 0.7) {
            volumeIcon.setAttribute('data-lucide', 'volume-1');
        } else {
            volumeIcon.setAttribute('data-lucide', 'volume-2');
        }
    }
    lucide.createIcons();
}

function handleProgressSeek(clientX) {
    const rect = elProgressTrack.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    elProgressFill.style.width = `${percent * 100}%`;
    elProgressThumb.style.left = `${percent * 100}%`;
    
    if (audio.duration) {
        audio.currentTime = percent * audio.duration;
    }
}

function handleVolumeSeek(clientX) {
    const rect = elVolumeTrack.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    volume = percent;
    isMuted = false;
    audio.volume = volume;
    localStorage.setItem('mucify_volume', volume);
    syncVolumeUI();
}

// --- Event Listeners Binder ---
function initEventListeners() {
    // 1. Footer Control Toggles
    elPlayPauseBtn.addEventListener('click', togglePlay);
    elPrevBtn.addEventListener('click', prevSong);
    elNextBtn.addEventListener('click', nextSong);
    elShuffleBtn.addEventListener('click', toggleShuffle);
    elRepeatBtn.addEventListener('click', toggleRepeat);

    // 2. Click-to-Seek Progress Timeline
    elProgressTrack.addEventListener('mousedown', (e) => {
        handleProgressSeek(e.clientX);
        const onMouseMove = (moveEvent) => handleProgressSeek(moveEvent.clientX);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    // 3. Click-to-Seek Volume Track
    elVolumeTrack.addEventListener('mousedown', (e) => {
        handleVolumeSeek(e.clientX);
        const onMouseMove = (moveEvent) => handleVolumeSeek(moveEvent.clientX);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    });

    // 4. Mute Button
    elMuteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.volume = isMuted ? 0 : volume;
        syncVolumeUI();
    });

    // 5. Player Heart Like Button
    elPlayerLikeBtn.addEventListener('click', () => {
        const currentSong = currentQueue[currentSongIndex];
        if (currentSong) {
            toggleLikeSong(currentSong.id);
        }
    });

    // 6. Navigation View Buttons
    document.querySelectorAll('[data-view]').forEach(item => {
        item.addEventListener('click', () => {
            const targetView = item.getAttribute('data-view');
            navigate(targetView);
        });
    });

    // 7. Navigation History Arrows
    elNavBack.addEventListener('click', navBack);
    elNavForward.addEventListener('click', navForward);

    // 8. Scrolling Glassmorphism Header
    elScrollContainer.addEventListener('scroll', () => {
        if (elScrollContainer.scrollTop > 20) {
            elMainHeader.classList.add('scrolled');
        } else {
            elMainHeader.classList.remove('scrolled');
        }
    });

    // 9. Search Bar Event Handlers
    elSearchInput.addEventListener('input', handleSearch);
    elClearSearchBtn.addEventListener('click', () => {
        elSearchInput.value = '';
        handleSearch();
        elSearchInput.focus();
    });

    // 10. Direct Play Hooks on Quick Cards (Home view grid)
    document.querySelectorAll('.quick-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const playCardBtn = e.target.closest('.play-card-btn');
            const songIndexAttr = card.getAttribute('data-song-index');
            const playlistIdAttr = card.getAttribute('data-playlist-id');

            if (playCardBtn) {
                e.stopPropagation();
                if (songIndexAttr !== null) {
                    playSongFromContext(parseInt(songIndexAttr), songs);
                } else if (playlistIdAttr) {
                    playPlaylist(playlistIdAttr);
                }
            } else {
                // Clicking card negotiates nav
                if (songIndexAttr !== null) {
                    playSongFromContext(parseInt(songIndexAttr), songs);
                } else if (playlistIdAttr) {
                    if (playlistIdAttr === 'liked') {
                        navigate('liked');
                    } else {
                        navigate('playlist', true, playlistIdAttr);
                    }
                }
            }
        });
    });

    // 11. Top Tracks Shelf Cards on Home View
    document.querySelectorAll('.music-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const playCardBtn = e.target.closest('.play-card-btn');
            const songIndexAttr = card.getAttribute('data-song-index');
            const playlistIdAttr = card.getAttribute('data-playlist-id');

            if (playCardBtn) {
                e.stopPropagation();
                if (songIndexAttr !== null) {
                    playSongFromContext(parseInt(songIndexAttr), songs);
                } else if (playlistIdAttr) {
                    playPlaylist(playlistIdAttr);
                }
            } else {
                if (songIndexAttr !== null) {
                    playSongFromContext(parseInt(songIndexAttr), songs);
                } else if (playlistIdAttr) {
                    navigate('playlist', true, playlistIdAttr);
                }
            }
        });
    });

    // 12. Profile Dropdown Menu Trigger
    elProfileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        elProfileMenu.classList.toggle('open');
        elProfileDropdown.classList.toggle('show');
    });

    window.addEventListener('click', () => {
        elProfileMenu.classList.remove('open');
        elProfileDropdown.classList.remove('show');
        
        // Hide playlist options dropdown and context menus on click away
        const plDropdown = document.getElementById('playlist-options-dropdown');
        if (plDropdown) plDropdown.style.display = 'none';
        
        const songMenu = document.getElementById('song-context-menu');
        if (songMenu) songMenu.style.display = 'none';
    });

    // 13. Create Playlist Button
    document.getElementById('create-playlist-btn').addEventListener('click', async () => {
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

    // Playlist options dots button dropdown toggle
    document.getElementById('playlist-options-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = document.getElementById('playlist-options-dropdown');
        const isVisible = dropdown.style.display === 'flex';
        dropdown.style.display = isVisible ? 'none' : 'flex';
    });

    // Rename playlist dropdown item
    document.getElementById('pl-opt-rename').addEventListener('click', async (e) => {
        e.stopPropagation();
        document.getElementById('playlist-options-dropdown').style.display = 'none';
        if (!activePlaylistId || activePlaylistId === 'liked') return;
        
        const pl = playlists[activePlaylistId];
        const newName = await showPlaylistModal("Rename Playlist", pl.name);
        if (newName && newName.trim() !== '') {
            pl.name = newName.trim();
            savePlaylists();
            renderSidebarPlaylists();
            renderPlaylistView(activePlaylistId);
        }
    });

    // Delete playlist dropdown item
    document.getElementById('pl-opt-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('playlist-options-dropdown').style.display = 'none';
        if (!activePlaylistId || activePlaylistId === 'liked') return;

        const pl = playlists[activePlaylistId];
        if (confirm(`Are you sure you want to delete the playlist "${pl.name}"?`)) {
            delete playlists[activePlaylistId];
            savePlaylists();
            renderSidebarPlaylists();
            navigate('home');
        }
    });

    // 14. Liked Play action button on headers
    document.getElementById('liked-play-btn').addEventListener('click', () => {
        playPlaylist('liked');
    });

    // 15. Now Playing panel controls
    elBtnNowPlaying.addEventListener('click', () => {
        const isActive = document.querySelector('.app-container').classList.toggle('panel-active');
        elBtnNowPlaying.classList.toggle('active', isActive);
        elNowPlayingPanel.style.display = isActive ? 'flex' : 'none';
    });

    elCloseNowPlaying.addEventListener('click', () => {
        document.querySelector('.app-container').classList.remove('panel-active');
        elBtnNowPlaying.classList.remove('active');
        elNowPlayingPanel.style.display = 'none';
    });

    // 16. Queue Dummy Button - alerts user current queue
    document.getElementById('btn-queue').addEventListener('click', () => {
        const queueTitles = currentQueue.map((s, i) => `${i === currentSongIndex ? '▶ ' : '  '}${s.title} - ${s.artist}`).join('\n');
        alert(`Mucify Playback Queue:\n\n${queueTitles}`);
    });

    // 17. Fullscreen Logic
    document.getElementById('btn-fullscreen').addEventListener('click', () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });

    // Logout warning
    document.getElementById('logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        alert("Mucify web player logged out. Feel free to re-login next session!");
    });
}

// --- Helper Functions ---
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// --- Custom Playlist Input Modal ---
function showPlaylistModal(title, defaultValue = '') {
    return new Promise((resolve) => {
        const modal = document.getElementById('playlist-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalInput = document.getElementById('modal-input');
        const cancelBtn = document.getElementById('modal-cancel-btn');
        const saveBtn = document.getElementById('modal-save-btn');

        modalTitle.textContent = title;
        modalInput.value = defaultValue;
        modal.style.display = 'flex';
        setTimeout(() => modalInput.focus(), 50);

        function cleanup() {
            modal.style.display = 'none';
            // Remove listeners by cloning
            const newCancel = cancelBtn.cloneNode(true);
            const newSave = saveBtn.cloneNode(true);
            cancelBtn.replaceWith(newCancel);
            saveBtn.replaceWith(newSave);
        }

        document.getElementById('modal-cancel-btn').addEventListener('click', () => {
            cleanup();
            resolve(null);
        });

        document.getElementById('modal-save-btn').addEventListener('click', () => {
            const val = modalInput.value.trim();
            cleanup();
            resolve(val);
        });

        modalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const val = modalInput.value.trim();
                cleanup();
                resolve(val);
            } else if (e.key === 'Escape') {
                cleanup();
                resolve(null);
            }
        });
    });
}

// --- Context Menu for Song Actions ---
function showSongContextMenu(songId, x, y) {
    const menu = document.getElementById('song-context-menu');
    if (!menu) return;
    menu.innerHTML = '';
    
    // Header for Menu
    const header = document.createElement('div');
    header.style.padding = '8px 12px 4px 12px';
    header.style.fontSize = '11px';
    header.style.fontWeight = '700';
    header.style.color = 'var(--text-subtle)';
    header.style.textTransform = 'uppercase';
    header.style.letterSpacing = '0.05em';
    header.textContent = "Add to playlist";
    menu.appendChild(header);

    // List available custom playlists
    let countPlaylists = 0;
    Object.keys(playlists).forEach(key => {
        if (key === 'liked') return;
        countPlaylists++;
        const pl = playlists[key];
        
        const item = document.createElement('button');
        item.className = 'dropdown-item';
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.gap = '10px';
        item.style.padding = '10px 12px';
        item.style.width = '100%';
        item.style.textAlign = 'left';
        item.style.fontSize = '13px';
        item.style.color = 'var(--text-muted)';
        item.style.borderRadius = '2px';
        item.style.transition = 'var(--transition-fast)';
        item.innerHTML = `<i data-lucide="music" style="width: 14px; height: 14px;"></i> <span>${pl.name}</span>`;

        item.addEventListener('click', () => {
            if (!pl.songs.includes(songId)) {
                pl.songs.push(songId);
                savePlaylists();
                alert(`Added to "${pl.name}"`);
            } else {
                alert(`Song is already in "${pl.name}"`);
            }
            menu.style.display = 'none';
        });

        menu.appendChild(item);
    });

    if (countPlaylists === 0) {
        const noPlMsg = document.createElement('div');
        noPlMsg.style.padding = '8px 12px';
        noPlMsg.style.fontSize = '12px';
        noPlMsg.style.color = 'var(--text-subtle)';
        noPlMsg.style.fontStyle = 'italic';
        noPlMsg.textContent = "No playlists created yet";
        menu.appendChild(noPlMsg);
    }

    // Add Remove option if inside a custom playlist page
    if (currentView === 'playlist' && activePlaylistId && activePlaylistId !== 'liked') {
        const separator = document.createElement('div');
        separator.style.height = '1px';
        separator.style.backgroundColor = 'var(--border-color)';
        separator.style.margin = '4px 0';
        menu.appendChild(separator);

        const removeItem = document.createElement('button');
        removeItem.className = 'dropdown-item';
        removeItem.style.display = 'flex';
        removeItem.style.alignItems = 'center';
        removeItem.style.gap = '10px';
        removeItem.style.padding = '10px 12px';
        removeItem.style.width = '100%';
        removeItem.style.textAlign = 'left';
        removeItem.style.fontSize = '13px';
        removeItem.style.color = '#ff5252';
        removeItem.style.borderRadius = '2px';
        removeItem.style.transition = 'var(--transition-fast)';
        removeItem.innerHTML = `<i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> <span>Remove from Playlist</span>`;

        removeItem.addEventListener('click', () => {
            const pl = playlists[activePlaylistId];
            pl.songs = pl.songs.filter(id => id !== songId);
            savePlaylists();
            renderPlaylistView(activePlaylistId);
            menu.style.display = 'none';
        });

        menu.appendChild(removeItem);
    }

    // Show menu first so offsetHeight is readable
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    lucide.createIcons();

    // Adjust position to keep within screen bounds
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
