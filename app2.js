/**
 * Mucify - Web Player Master JavaScript (app2.js)
 * Consolidated, production-grade JavaScript for the Mucify Web Player.
 * Includes defensive DOM safety, audio playback controls, view routing,
 * All Songs view, playlist CRUD operations, contextual menus, keyboard controls,
 * local storage persistence, and local/remote audio fallbacks.
 */

// --- 1. Database of Songs (22 Tracks) ---
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
        "album": "Oru Kal Oru Kannadi",
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
        "cover": "https://imgs.search.brave.com/g_QcPztwyKrDtRT9wbOA61IOEabCSy6yR0vsJs1XCkQ/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly9pczEt/c3NsLm16c3RhdGlj/LmNvbS9pbWFnZS90/aHVtYi9NdXNpYzIy/MS92NC83Ny9hMi9k/YS83N2EyZGEzNy1m/OTZmLTJkOTUtZTk1/MS1mOWViNWEwZjY4/NjEvODkwMzQzMTE0/ODk2NF9jb3Zlci5q/cGcvMTIwMHg2MzBi/Yi5qcGc",
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
    },
    {
        "id": "song-22",
        "title": "Kadhal Aasai",
        "artist": "Yuvan Shankar Raja",
        "album": "Anjaan",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791636906/Kadhal_Aasai_-_Yuvan_Shankar_Raja_u08rmg.mp3",
        "localUrl": "songs/Kadhal_Aasai.mp3",
        "cover": "https://c.saavncdn.com/451/Anjaan-Tamil-2014-20190822151819-500x500.jpg",
        "duration": "5:04",
        "durationSec": 304,
        "artistBio": "Hit melody composed and sung by Yuvan Shankar Raja with Sooraj Santhosh from the blockbuster movie Anjaan."
    },
    {
        "id": "song-23",
        "title": "Asai Asai",
        "artist": "shankar mahadevan",
        "album": "thool",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791645465/Aasai_Aasai_-_Shankar_Mahadevan_ezhyuu.mp3",
        "localUrl": "songs/Asai_Aasai.mp3",
        "duration": "5:15",
        "durationSec": 315,
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSJq59goVltNXnW0S7g-Cr3-f2u09edWLZVcB6JzI5DcnAQQwo1ZiXfhI8-lLbJvTrbvQTw7z-P8Tp4Hw6si1PHDspQHabLnQ7ul3CVW_GIA&s=10",
        "artistBio": "Track by Shankar Mahadevan. Curated specially for your Mucify web player experience."
    },
    {
        "id": "song-24",
        "title": "chammak challo",
        "artist": "vishal-shekhar",
        "album": "ra one",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791645784/Chammak_Challo_-_Vishal-Shekhar_bu7uew.mp3",
        "localUrl": "songs/Chammak_Challo_-_Vishal-Shekhar_bu7uew.mp3",
        "duration": "3:52",
        "durationSec": 232,
        "cover": "data:image/jpeg;base64,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",
        "artistBio": ""
    },
    {
        "id": "song-25",
        "title": "Ain't no body",
        "artist": "anirudh",
        "album": "dc",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791646002/Ain_t_Nobody_From__DC__-_Anirudh_Ravichander_vyodli.mp3",
        "duration": "3:59",
        "durationsec": 239,
        "cover": "data:image/jpeg;base64,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",
        "artistBio": ""
    },
    {
        "id": "song-26",
        "title": "Arabian nights",
        "artist": "Alan menken",
        "album": "Aladdin",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791646267/Arabian_Nights_2019_-_Will_Smith_ok31gi.mp3",
        "duration": "5:08",
        "durationsec": 308,
        "cover": "https://i.ytimg.com/vi/T9GmO_WFhjQ/maxresdefault.jpg",
        "artistBio": "Alan Menken is an American composer, singer, songwriter, and record producer. He is best known for composing the scores for Walt Disney Animation Studios films, including The Little Mermaid, Beauty and the Beast, Aladdin, and Pocahontas."
    },
    {
        "id": "song-27",
        "title": "blue",
        "artist": "yung kai",
        "album": "blue",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791646499/blue_-_yung_kai_qgttsb.mp3",
        "duration": "3:03",
        "durationsec": 183,
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbUbjhxhDJ_f7AgIj9gR50eSdm4yUxMdEwYgiLU5_Zfg&s=10",
        "artistBio": "yung kai is an American rapper, singer, songwriter, and record producer. He is best known for his hit song 'blue'"
    },
    {
        "id": "song-28",
        "title": "chikitu",
        "artist": "anirudh",
        "album": "coolie",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791646943/Chikitu_From__Coolie__Tamil_-_Anirudh_Ravichander_ftblmz.mp3",
        "duration": "",
        "durationSec": "",
        "cover": "data:image/jpeg;base64,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",
        "artistBio": ""
    },
    {
        "id": "song-29",
        "title": "Espresso",
        "artist": "sabrina carpenter",
        "album": "Espresso",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791647321/Espresso_-_Sabrina_Carpenter_fnim7i.mp3",
        "duration": "3:12",
        "durationSec": "192",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsDPCyCJed98bLM8sVg51Xl09C7LWTSlQQxvRmOrNDSA&s=10",
        "artistBio": "Sabrina Carpenter is an American singer and songwriter. She began her career in the early 2010s, posting covers on YouTube and gaining attention for her vocal talent. In 2014, she signed with Hollywood Records and released her debut single Can't Blame a Girl for Trying. Her debut studio album, Eyes Wide Open, followed in 2015. She continued to release music throughout the late 2010s, including albums like Evolution (2016), Singular: Act I (2018), and Singular: Act II (2019). In 2022, she released her fifth studio album, Emails I Can't Send, which spawned the hit single Nonsense. Carpenter has also ventured into acting, appearing in television shows like Girl Meets World and Adventures in Babysitting"
    },
    {
        "id": "song-30",
        "title": "Fein!",
        "artist": "playboi carti",
        "album": "",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791647575/FE_N_feat._Playboi_Carti_-_Travis_Scott_gieno4.mp3",
        "duration": "2:38",
        "durationSec": "158",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI0Bm1PXkY-TCIDAVcdatDaNunCcd0N-TqmOx8f8cidA&s",
        "artistBio": ""
    },
    {
        "id": "song-31",
        "title": "Flight",
        "artist": "han zimmer",
        "album": "man of steel",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791647707/Flight_-_Hans_Zimmer_y12lwb.mp3",
        "duration": "4:18",
        "durationSec": "258",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMbGLiDiGVgE8ssabkKRlMMsrxbJrQHz_o9tMzB5kLmg&s=10",
        "artistBio": ""
    },
    {
        "id": "song-32",
        "title": "Golden brown",
        "artist": "the stranglers",
        "album": "Golden brown",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791647815/Golden_Brown_-_Slowed_Down_Version_-_The_Stranglers_wklth9.mp3",
        "duration": "3:33",
        "durationSec": "213",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0nNFdn4qHCqK4O1dXTvqD4mduGqHuGzFZ5jr7MhWAOQ&s",
        "artistBio": ""
    },
    {
        "id": "song-33",
        "title": "Ichu Ichu",
        "artist": "vijay antony",
        "album": "vedi",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791647817/Ichu_Ichu_-_Vijay_Antony_ku66xk.mp3",
        "duration": "5:30",
        "durationSec": "330",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReaFr3plwcI_xYJwsyPmnSxAFZ8S24ZNlggCHu5cg6IQ&s=10",
        "artistBio": ""
    },
    {
        "id": "song-34",
        "title": "Idhayam",
        "artist": "a.r.rahman",
        "album": "idhayathil nee",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791647820/Idhayam_-_A.R._Rahman_vhbqee.mp3",
        "duration": "5:09",
        "durationSec": "309",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ex0aM5V3nz3APBjAQQet7D-slzPwT2ASWpdvhCEagA&s=10",
        "artistBio": ""
    },
    {
        "id": "song-35",
        "title": "Kalasala Kalasala",
        "artist": "s.thaman",
        "album": "osthe",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791648129/Kalasala_Kalasala_-_Thaman_S_aztma2.mp3",
        "duration": "4:51",
        "durationSec": "291",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8N1BWx8I5QS0a2qe9Z5aGAmHAqThsPX818C09UeThgg&s=10",
        "artistBio": ""
    },
    {
        "id": "song-36",
        "title": "Katchi Sera",
        "artist": "sai abhyankkar",
        "album": "katchi sera",
        "url": "https://res.cloudinary.com/dxvguv2vw/video/upload/v1791648140/Katchi_Sera_-_From__Think_Indie__-_Sai_Abhyankkar_i0frad.mp3",
        "duration": "4:50",
        "durationSec": "290",
        "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfFbO_9IIdC5f1LLbuXtZcOYB38dmPKo8KNh895JVOw&s",
        "artistBio": ""
    }
];

// --- 2. State & Storage Initialization ---
let likedSongIds = JSON.parse(localStorage.getItem('mucify_liked_songs')) || [];
let listeningHistory = JSON.parse(localStorage.getItem('mucify_listening_history')) || [];

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

    if (song && song.id) {
        listeningHistory = [song.id, ...listeningHistory.filter(id => id !== song.id)].slice(0, 20);
        try {
            localStorage.setItem('mucify_listening_history', JSON.stringify(listeningHistory));
        } catch (e) { }
    }

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

// --- Queue Customization & Reordering Logic ---
let toastTimeoutId = null;
let draggedUpcomingIndex = null;

function showToast(message) {
    let toast = document.getElementById('mucify-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'mucify-toast';
        toast.className = 'mucify-toast';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i data-lucide="info" style="width: 16px; height: 16px; color: var(--primary-green); flex-shrink: 0;"></i><span>${escapeHTML(message)}</span>`;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    toast.style.display = 'flex';
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (!toast.classList.contains('show')) {
                toast.style.display = 'none';
            }
        }, 300);
    }, 2400);
}

function formatTotalDuration(songList) {
    if (!songList || songList.length === 0) return '0 min';
    const totalSec = songList.reduce((acc, s) => {
        if (s.durationSec) return acc + s.durationSec;
        if (s.duration) {
            const parts = s.duration.split(':').map(Number);
            if (parts.length === 2) return acc + parts[0] * 60 + parts[1];
        }
        return acc + 180;
    }, 0);
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    if (mins >= 60) {
        const hrs = Math.floor(mins / 60);
        const remMins = mins % 60;
        return `${hrs} hr ${remMins} min`;
    }
    return `${mins} min${secs > 0 ? ' ' + secs + 's' : ''}`;
}

function reorderUpcomingQueue(fromIdx, toIdx) {
    const upcomingCount = currentQueue.length - (currentSongIndex + 1);
    if (upcomingCount <= 0) return;
    if (fromIdx < 0 || fromIdx >= upcomingCount || toIdx < 0 || toIdx >= upcomingCount) return;
    if (fromIdx === toIdx) return;

    const fromAbs = currentSongIndex + 1 + fromIdx;
    const toAbs = currentSongIndex + 1 + toIdx;

    const [movedSong] = currentQueue.splice(fromAbs, 1);
    currentQueue.splice(toAbs, 0, movedSong);

    renderQueueView();
    showToast(`Moved "${movedSong.title}" to position #${toIdx + 1}`);
}

function shuffleUpcomingQueue() {
    const upcomingCount = currentQueue.length - (currentSongIndex + 1);
    if (upcomingCount <= 1) {
        showToast("Add more songs to queue to shuffle");
        return;
    }
    const upcoming = currentQueue.slice(currentSongIndex + 1);
    for (let i = upcoming.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [upcoming[i], upcoming[j]] = [upcoming[j], upcoming[i]];
    }
    currentQueue.splice(currentSongIndex + 1, upcomingCount, ...upcoming);
    renderQueueView();
    showToast("Upcoming queue randomized");
}

function clearUpcomingQueue() {
    const upcomingCount = currentQueue.length - (currentSongIndex + 1);
    if (upcomingCount === 0) return;
    currentQueue = currentQueue.slice(0, currentSongIndex + 1);
    renderQueueView();
    showToast("Upcoming queue cleared");
}

function openQueueAddModal() {
    const modal = document.getElementById('queue-add-modal');
    const input = document.getElementById('queue-add-search-input');
    if (!modal) return;
    modal.style.display = 'flex';
    if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 60);
    }
    renderQueueAddModalList('');
}

function closeQueueAddModal() {
    const modal = document.getElementById('queue-add-modal');
    if (modal) modal.style.display = 'none';
}

function renderQueueAddModalList(query = '') {
    const listContainer = document.getElementById('queue-add-songs-list');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    const q = (query || '').toLowerCase().trim();
    const filteredSongs = songs.filter(s => {
        if (!q) return true;
        return s.title.toLowerCase().includes(q) ||
            s.artist.toLowerCase().includes(q) ||
            s.album.toLowerCase().includes(q);
    });

    if (filteredSongs.length === 0) {
        listContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 28px; font-size: 13px;">No matching songs found</div>';
        return;
    }

    const upcomingIds = currentQueue.slice(currentSongIndex + 1).map(s => s.id);

    filteredSongs.forEach(song => {
        const item = document.createElement('div');
        item.className = 'queue-modal-item';

        const inQueue = upcomingIds.includes(song.id);

        item.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; min-width: 0; flex: 1;">
                <img src="${song.cover}" alt="${escapeHTML(song.title)}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover; flex-shrink: 0;">
                <div style="overflow: hidden; display: flex; flex-direction: column;">
                    <span style="font-size: 13px; font-weight: 600; color: #fff; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(song.title)}</span>
                    <span style="font-size: 12px; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(song.artist)} • ${escapeHTML(song.album)}</span>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                ${inQueue ? '<span class="in-queue-badge">In Queue</span>' : ''}
                <button class="queue-modal-btn play-next" data-song-id="${song.id}" title="Play right after current song">
                    <i data-lucide="corner-down-right" style="width: 13px; height: 13px;"></i> Play Next
                </button>
                <button class="queue-modal-btn add-queue" data-song-id="${song.id}" title="Add to end of queue">
                    <i data-lucide="plus" style="width: 13px; height: 13px;"></i> Add
                </button>
            </div>
        `;

        item.querySelector('.play-next').addEventListener('click', (e) => {
            e.stopPropagation();
            currentQueue.splice(currentSongIndex + 1, 0, song);
            if (currentView === 'queue') renderQueueView();
            renderQueueAddModalList(document.getElementById('queue-add-search-input')?.value || '');
            showToast(`"${song.title}" set to play next`);
        });

        item.querySelector('.add-queue').addEventListener('click', (e) => {
            e.stopPropagation();
            currentQueue.push(song);
            if (currentView === 'queue') renderQueueView();
            renderQueueAddModalList(document.getElementById('queue-add-search-input')?.value || '');
            showToast(`Added "${song.title}" to queue`);
        });

        listContainer.appendChild(item);
    });

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderQueueView() {
    const nowPlayingContainer = document.getElementById('queue-now-playing-container');
    const nextUpBody = document.getElementById('queue-next-up-list-body');
    const queueTable = document.getElementById('queue-table');
    const emptyMsg = document.getElementById('queue-empty-message');
    const clearBtn = document.getElementById('clear-queue-btn');
    const shuffleBtn = document.getElementById('queue-shuffle-btn');
    const summaryBadge = document.getElementById('queue-summary-badge');

    if (!nowPlayingContainer || !nextUpBody) return;

    // 1. Now Playing Section
    const currentSong = currentQueue[currentSongIndex];
    if (currentSong) {
        const isLiked = likedSongIds.includes(currentSong.id);
        nowPlayingContainer.innerHTML = `
            <div class="queue-track-row now-playing-row" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 18px; background-color: rgba(255, 255, 255, 0.07); border-radius: 8px; border-left: 4px solid var(--primary-green);">
                <div style="display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0;">
                    <div style="width: 24px; text-align: center; font-size: 14px; color: var(--primary-green); display: flex; align-items: center; justify-content: center;">
                        ${isPlaying ? '<div class="playing-gif" style="display: block;"></div>' : '<i data-lucide="volume-2" class="small-icon" color="var(--primary-green)"></i>'}
                    </div>
                    <img src="${currentSong.cover}" alt="${escapeHTML(currentSong.title)}" style="width: 46px; height: 46px; border-radius: 4px; object-fit: cover;">
                    <div style="display: flex; flex-direction: column; overflow: hidden;">
                        <span style="font-weight: 700; color: var(--primary-green); font-size: 14px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(currentSong.title)}</span>
                        <span style="font-size: 12px; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${escapeHTML(currentSong.artist)}</span>
                    </div>
                </div>
                <div style="flex: 1; font-size: 13px; color: var(--text-muted); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; padding: 0 16px;">
                    ${escapeHTML(currentSong.album)}
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
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

    if (summaryBadge) {
        summaryBadge.textContent = `${upcomingSongs.length} ${upcomingSongs.length === 1 ? 'song' : 'songs'}${upcomingSongs.length > 0 ? ' • ' + formatTotalDuration(upcomingSongs) : ''}`;
    }

    if (clearBtn) {
        clearBtn.style.display = upcomingSongs.length > 0 ? 'inline-flex' : 'none';
        clearBtn.onclick = clearUpcomingQueue;
    }
    if (shuffleBtn) {
        shuffleBtn.style.display = upcomingSongs.length > 1 ? 'inline-flex' : 'none';
        shuffleBtn.onclick = shuffleUpcomingQueue;
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
            const isFirst = idx === 0;
            const isLast = idx === upcomingSongs.length - 1;

            const row = document.createElement('tr');
            row.className = 'queue-table-row';
            row.setAttribute('data-song-id', song.id);
            row.setAttribute('data-upcoming-index', idx);
            row.setAttribute('draggable', 'true');

            row.innerHTML = `
                <td class="col-drag" style="text-align: center;">
                    <div class="queue-drag-handle" title="Drag to reorder" draggable="false">
                        <i data-lucide="grip-vertical" class="small-icon"></i>
                    </div>
                </td>
                <td class="col-index">
                    <span class="index-num">${idx + 1}</span>
                    <button class="table-row-play-btn" title="Play now" draggable="false"><i data-lucide="play" fill="#fff" color="#fff" class="small-icon"></i></button>
                </td>
                <td class="col-title">
                    <img src="${song.cover}" alt="${escapeHTML(song.title)}" draggable="false">
                    <div class="title-info">
                        <span class="song-name-cell">${escapeHTML(song.title)}</span>
                        <span class="song-artist-cell">${escapeHTML(song.artist)}</span>
                    </div>
                </td>
                <td class="col-album">${escapeHTML(song.album)}</td>
                <td class="col-duration">${song.duration}</td>
                <td class="col-actions" style="display: flex; align-items: center; justify-content: flex-end; gap: 4px;">
                    <button class="queue-order-btn queue-move-top" data-action="top" title="Move to Top (Play Next)" ${isFirst ? 'disabled' : ''} draggable="false">
                        <i data-lucide="arrow-up-to-line" class="small-icon"></i>
                    </button>
                    <button class="queue-order-btn queue-move-up" data-action="up" title="Move Up" ${isFirst ? 'disabled' : ''} draggable="false">
                        <i data-lucide="chevron-up" class="small-icon"></i>
                    </button>
                    <button class="queue-order-btn queue-move-down" data-action="down" title="Move Down" ${isLast ? 'disabled' : ''} draggable="false">
                        <i data-lucide="chevron-down" class="small-icon"></i>
                    </button>
                    <button class="remove-queue-btn" data-action="remove" title="Remove from Queue" draggable="false">
                        <i data-lucide="x" class="small-icon"></i>
                    </button>
                    <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-action="like" title="${isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}" draggable="false">
                        <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                    </button>
                    <button class="row-menu-btn" data-action="menu" title="More options" draggable="false">
                        <i data-lucide="more-horizontal" class="small-icon"></i>
                    </button>
                </td>
            `;

            // HTML5 Drag and Drop Events
            row.addEventListener('dragstart', (e) => {
                draggedUpcomingIndex = idx;
                row.classList.add('is-dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/plain', String(idx));
            });

            row.addEventListener('dragend', () => {
                document.querySelectorAll('.queue-table-row').forEach(r => {
                    r.classList.remove('is-dragging', 'drag-over-top', 'drag-over-bottom');
                });
                draggedUpcomingIndex = null;
            });

            row.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                const rect = row.getBoundingClientRect();
                const isTop = (e.clientY - rect.top) < rect.height / 2;
                row.classList.toggle('drag-over-top', isTop);
                row.classList.toggle('drag-over-bottom', !isTop);
            });

            row.addEventListener('dragleave', (e) => {
                if (!row.contains(e.relatedTarget)) {
                    row.classList.remove('drag-over-top', 'drag-over-bottom');
                }
            });

            row.addEventListener('drop', (e) => {
                e.preventDefault();
                row.classList.remove('drag-over-top', 'drag-over-bottom');
                const sourceIdx = parseInt(e.dataTransfer.getData('text/plain'), 10);
                if (isNaN(sourceIdx)) return;

                const rect = row.getBoundingClientRect();
                const isTop = (e.clientY - rect.top) < rect.height / 2;
                let targetIdx = isTop ? idx : idx + 1;
                if (sourceIdx < targetIdx) {
                    targetIdx--;
                }

                if (sourceIdx !== targetIdx) {
                    reorderUpcomingQueue(sourceIdx, targetIdx);
                }
            });

            // Click handling with delegation
            row.addEventListener('click', (e) => {
                const topBtn = e.target.closest('.queue-move-top');
                const upBtn = e.target.closest('.queue-move-up');
                const downBtn = e.target.closest('.queue-move-down');
                const removeBtn = e.target.closest('.remove-queue-btn');
                const likeBtn = e.target.closest('.row-action-btn');
                const menuBtn = e.target.closest('.row-menu-btn');
                const dragHandle = e.target.closest('.queue-drag-handle');

                if (dragHandle) return;

                if (topBtn) {
                    e.stopPropagation();
                    if (!isFirst) reorderUpcomingQueue(idx, 0);
                } else if (upBtn) {
                    e.stopPropagation();
                    if (!isFirst) reorderUpcomingQueue(idx, idx - 1);
                } else if (downBtn) {
                    e.stopPropagation();
                    if (!isLast) reorderUpcomingQueue(idx, idx + 1);
                } else if (removeBtn) {
                    e.stopPropagation();
                    const removed = currentQueue.splice(actualIndex, 1)[0];
                    renderQueueView();
                    showToast(`Removed "${removed ? removed.title : song.title}" from queue`);
                } else if (likeBtn) {
                    e.stopPropagation();
                    toggleLikeSong(song.id);
                } else if (menuBtn) {
                    e.stopPropagation();
                    showSongContextMenu(song.id, e.clientX, e.clientY, {
                        fromQueue: true,
                        upcomingIndex: idx,
                        actualIndex: actualIndex,
                        totalUpcoming: upcomingSongs.length
                    });
                } else {
                    playSongFromContext(actualIndex, currentQueue);
                    renderQueueView();
                }
            });

            // Context Menu right-click
            row.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showSongContextMenu(song.id, e.clientX, e.clientY, {
                    fromQueue: true,
                    upcomingIndex: idx,
                    actualIndex: actualIndex,
                    totalUpcoming: upcomingSongs.length
                });
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

        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showSongContextMenu(song.id, e.clientX, e.clientY);
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
            <button class="top-result-menu-btn" data-song-id="${topMatch.id}" title="More options for ${escapeHTML(topMatch.title)}">
                <i data-lucide="more-horizontal" class="small-icon"></i>
            </button>
            <div class="top-result-title">${escapeHTML(topMatch.title)}</div>
            <div class="top-result-meta">
                <span class="top-result-badge">Song</span>
                <span>${escapeHTML(topMatch.artist)}</span>
            </div>
            <button class="play-card-btn hover-reveal" title="Play ${escapeHTML(topMatch.title)}">
                <i data-lucide="play" class="play-card-icon"></i>
            </button>
        `;
        topResultCard.onclick = (e) => {
            const menuBtn = e.target.closest('.top-result-menu-btn');
            if (menuBtn) {
                e.stopPropagation();
                showSongContextMenu(topMatch.id, e.clientX, e.clientY);
                return;
            }
            if (topMatchIdx !== -1) playSongFromContext(topMatchIdx, songs);
        };
        topResultCard.oncontextmenu = (e) => {
            e.preventDefault();
            showSongContextMenu(topMatch.id, e.clientX, e.clientY);
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
                    <button class="row-action-btn ${isLiked ? 'liked' : ''}" data-song-id="${song.id}" title="${isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}">
                        <i data-lucide="heart" ${isLiked ? 'fill="var(--primary-green)" color="var(--primary-green)"' : ''} class="small-icon"></i>
                    </button>
                    <span>${song.duration}</span>
                    <button class="row-menu-btn" data-song-id="${song.id}" title="More options">
                        <i data-lucide="more-horizontal" class="small-icon"></i>
                    </button>
                </div>
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
                } else if (songIdx !== -1) {
                    playSongFromContext(songIdx, songs);
                }
            });

            row.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showSongContextMenu(song.id, e.clientX, e.clientY);
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
                    playSongFromContext(idx, filtered);
                }
            });

            row.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showSongContextMenu(song.id, e.clientX, e.clientY);
            });

            tableResultsBody.appendChild(row);
        });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    updateActiveRowHighlight();
}

// --- 12. Context Menu & Modal Logic ---
function showSongContextMenu(songId, x, y, context = null) {
    let menu = document.getElementById('song-context-menu');
    if (!menu) return;

    menu.innerHTML = '';
    const song = songs.find(s => s.id === songId);
    if (!song) return;

    const isLiked = likedSongIds.includes(songId);

    if (context && context.fromQueue) {
        // Queue specific context menu actions
        const itemPlay = document.createElement('div');
        itemPlay.className = 'context-menu-item';
        itemPlay.innerHTML = `<i data-lucide="play" style="width: 14px; height: 14px;"></i> <span>Play Now</span>`;
        itemPlay.addEventListener('click', () => {
            playSongFromContext(context.actualIndex, currentQueue);
            renderQueueView();
            menu.style.display = 'none';
        });
        menu.appendChild(itemPlay);

        if (context.upcomingIndex > 0) {
            const itemMoveTop = document.createElement('div');
            itemMoveTop.className = 'context-menu-item';
            itemMoveTop.innerHTML = `<i data-lucide="arrow-up-to-line" style="width: 14px; height: 14px;"></i> <span>Move to Top (Play Next)</span>`;
            itemMoveTop.addEventListener('click', () => {
                reorderUpcomingQueue(context.upcomingIndex, 0);
                menu.style.display = 'none';
            });
            menu.appendChild(itemMoveTop);

            const itemMoveUp = document.createElement('div');
            itemMoveUp.className = 'context-menu-item';
            itemMoveUp.innerHTML = `<i data-lucide="chevron-up" style="width: 14px; height: 14px;"></i> <span>Move Up</span>`;
            itemMoveUp.addEventListener('click', () => {
                reorderUpcomingQueue(context.upcomingIndex, context.upcomingIndex - 1);
                menu.style.display = 'none';
            });
            menu.appendChild(itemMoveUp);
        }

        if (context.upcomingIndex < context.totalUpcoming - 1) {
            const itemMoveDown = document.createElement('div');
            itemMoveDown.className = 'context-menu-item';
            itemMoveDown.innerHTML = `<i data-lucide="chevron-down" style="width: 14px; height: 14px;"></i> <span>Move Down</span>`;
            itemMoveDown.addEventListener('click', () => {
                reorderUpcomingQueue(context.upcomingIndex, context.upcomingIndex + 1);
                menu.style.display = 'none';
            });
            menu.appendChild(itemMoveDown);

            const itemMoveBottom = document.createElement('div');
            itemMoveBottom.className = 'context-menu-item';
            itemMoveBottom.innerHTML = `<i data-lucide="arrow-down-to-line" style="width: 14px; height: 14px;"></i> <span>Move to End of Queue</span>`;
            itemMoveBottom.addEventListener('click', () => {
                reorderUpcomingQueue(context.upcomingIndex, context.totalUpcoming - 1);
                menu.style.display = 'none';
            });
            menu.appendChild(itemMoveBottom);
        }

        const itemRemoveQueue = document.createElement('div');
        itemRemoveQueue.className = 'context-menu-item danger';
        itemRemoveQueue.innerHTML = `<i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> <span>Remove from Queue</span>`;
        itemRemoveQueue.addEventListener('click', () => {
            const removed = currentQueue.splice(context.actualIndex, 1)[0];
            renderQueueView();
            showToast(`Removed "${removed ? removed.title : song.title}" from queue`);
            menu.style.display = 'none';
        });
        menu.appendChild(itemRemoveQueue);
    } else {
        // Standard Context Menu
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

        const itemPlayNext = document.createElement('div');
        itemPlayNext.className = 'context-menu-item';
        itemPlayNext.innerHTML = `<i data-lucide="corner-down-right" style="width: 14px; height: 14px;"></i> <span>Play Next</span>`;
        itemPlayNext.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.style.display = 'none';
            const targetSong = songs.find(s => s.id === songId);
            if (targetSong) {
                currentQueue.splice(currentSongIndex + 1, 0, targetSong);
                if (currentView === 'queue') {
                    renderQueueView();
                }
                showToast(`"${targetSong.title}" will play next`);
            }
        });
        menu.appendChild(itemPlayNext);

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
                showToast(`Added "${targetSong.title}" to queue`);
            }
        });
        menu.appendChild(itemAddQueue);
    }

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
    itemAddPl.innerHTML = `<i data-lucide="plus-circle" style="width: 14px; height: 14px;"></i> <span>Add to Playlist</span><i data-lucide="chevron-right" style="width: 14px; height: 14px; margin-left: auto; opacity: 0.6;"></i>`;

    const submenu = document.createElement('div');
    submenu.className = 'context-submenu';

    let hasCustomPl = false;
    Object.keys(playlists).forEach(key => {
        if (key === 'liked') return;
        hasCustomPl = true;
        const pl = playlists[key];
        const subItem = document.createElement('div');
        subItem.className = 'context-menu-item';
        subItem.innerHTML = `<i data-lucide="list-music" style="width: 14px; height: 14px;"></i> <span>${escapeHTML(pl.name)}</span>`;
        subItem.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!pl.songs.includes(songId)) {
                pl.songs.push(songId);
                savePlaylists();
                showToast(`Added to "${pl.name}"`);
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
        removeItem.innerHTML = `<i data-lucide="trash-2" style="width: 14px; height: 14px;"></i> <span>Remove from Playlist</span>`;

        removeItem.addEventListener('click', () => {
            const pl = playlists[activePlaylistId];
            if (pl) {
                pl.songs = pl.songs.filter(id => id !== songId);
                savePlaylists();
                renderPlaylistView(activePlaylistId);
                showToast(`Removed from playlist`);
            }
            menu.style.display = 'none';
        });

        menu.appendChild(removeItem);
    }

    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    if (typeof lucide !== 'undefined') lucide.createIcons();

    const menuWidth = 210;
    const menuHeight = menu.offsetHeight || 180;

    let finalX = x;
    let finalY = y;
    if (x + menuWidth > window.innerWidth) {
        finalX = window.innerWidth - menuWidth - 12;
    }
    if (y + menuHeight > window.innerHeight) {
        finalY = window.innerHeight - menuHeight - 12;
    }

    if (finalX + menuWidth + 180 > window.innerWidth) {
        itemAddPl.classList.add('align-left');
    } else {
        itemAddPl.classList.remove('align-left');
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

    // Queue Customization Controls
    const queueAddBtn = document.getElementById('queue-add-songs-btn');
    if (queueAddBtn) {
        queueAddBtn.addEventListener('click', openQueueAddModal);
    }

    const queueEmptyAddBtn = document.getElementById('queue-empty-add-btn');
    if (queueEmptyAddBtn) {
        queueEmptyAddBtn.addEventListener('click', openQueueAddModal);
    }

    const queueShuffleBtn = document.getElementById('queue-shuffle-btn');
    if (queueShuffleBtn) {
        queueShuffleBtn.addEventListener('click', shuffleUpcomingQueue);
    }

    const queueModalClose = document.getElementById('queue-add-modal-close');
    if (queueModalClose) {
        queueModalClose.addEventListener('click', closeQueueAddModal);
    }

    const queueModalDone = document.getElementById('queue-add-modal-done');
    if (queueModalDone) {
        queueModalDone.addEventListener('click', closeQueueAddModal);
    }

    const queueAddModal = document.getElementById('queue-add-modal');
    if (queueAddModal) {
        queueAddModal.addEventListener('click', (e) => {
            if (e.target === queueAddModal) closeQueueAddModal();
        });
    }

    const queueSearchInput = document.getElementById('queue-add-search-input');
    if (queueSearchInput) {
        queueSearchInput.addEventListener('input', (e) => {
            renderQueueAddModalList(e.target.value);
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
        if (e.code === 'Escape') {
            closeQueueAddModal();
        }
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
