class MusicPlayer {
            constructor() {
                this.songs = [
                    { 
                        title: 'Jaane Na Dunga Kahin', 
                        artist: 'Armaan Malik', 
                        src: 'songs/1.mp3',
                        image: 'covers/1.jpg',
                        color: '#ff6b6b'
                    },
                    { 
                        title: 'Qayde se', 
                        artist: 'Arijit Singh', 
                        src: 'songs/2.mp3',
                        image: 'covers/2.jpg',
                        color: '#4ecdc4' 
                    },
                    { 
                        title: 'Tum Jo Aaye', 
                        artist: 'Rahat Fateh Ali Khan , Tulsi Kumar', 
                        src: 'songs/3.mp3',
                        image: 'covers/3.jpg',
                        color: '#45b7d1' 
                    },
                    { 
                        title: 'In Dino', 
                        artist: 'Soham , Pritam', 
                        src: 'songs/4.mp3',
                        image: 'covers/4.jpg',
                        color: '#96ceb4' 
                    },
                    { 
                        title: 'Humsafar', 
                        artist: 'Sachet Tandon, Parampara Tandon', 
                        src: 'songs/5.mp3',
                        image: 'covers/5.jpeg',
                        color: '#3db3c5ff' 
                    },
                       { 
                        title: 'Tumhare He Rahenge Hum', 
                        artist: 'Sachin-Jigar ,Shilpa Rao', 
                        src: 'songs/6.mp3',
                        image: 'covers/6.jpg',
                        color: '#b41c6dff' 
                    },
                       { 
                        title: 'Dil Kyun Yeh Mera', 
                        artist: 'KK', 
                        src: 'songs/7.mp3',
                        image: 'covers/7.jpg',
                        color: '#e216b2ff' 
                    },
                     { 
                        title: 'Chahu Main Ya Na', 
                        artist: 'Arijit Singh Palak Muchhal', 
                        src: 'songs/8.mp3',
                        image: 'covers/8.jpg',
                        color: '#e11c26ff' 
                    },
                     { 
                        title: 'Hey Shona', 
                        artist: 'Shaan Sunidhi Chauhan', 
                        src: 'songs/9.mp3',
                        image: 'covers/9.jpg',
                        color: '#6257a2ff' 
                    },
                     { 
                        title: 'Dil Leke Darde Dil', 
                        artist: 'Shaan', 
                        src: 'songs/10.mp3',
                        image: 'covers/10.jpg',
                        color: '#da6193ff' 
                    },
                     { 
                        title: 'Dil Vich Lagy', 
                        artist: 'Akriti Kakar, Sonu nigam', 
                        src: 'songs/11.mp3',
                        image: 'covers/11.jpg',
                        color: '#ffeaa7' 
                    },
                    
                     { 
                        title: 'Hum Tum', 
                        artist: 'Babul supriyo, Alka Yagnik', 
                        src: 'songs/12.mp3',
                        image: 'covers/12.jpg',
                        color: '#ba9fe8ff' 
                    },
                     { 
                        title: 'Dekho Na', 
                        artist: 'Sunidhi Chauhan, Sonu Nigam', 
                        src: 'songs/13.mp3',
                        image: 'covers/13.jpg',
                        color: '#e89090f8' 
                    },
                     { 
                        title: 'Mohabbat Ho Na Jaye', 
                        artist: 'Kumar Sanu, Alka Yagnik', 
                        src: 'songs/14.mp3',
                        image: 'covers/14.jpg',
                        color: '#a7e2ff52' 
                    },
                     { 
                        title: 'Kaho Naa Pyaar Hai', 
                        artist: 'Udit Narayan, Alka Yagnik', 
                        src: 'songs/15.mp3',
                        image: 'covers/15.jpg',
                        color: '#b3e716ff' 
                    }

                ];

                this.currentSongIndex = 0;
                this.isPlaying = false;
                this.volume = 0.5;
                this.isMuted = false;
                this.previousVolume = 0.5;

                this.initializeElements();
                this.initializeEventListeners();
                this.loadSong(this.currentSongIndex);
                this.updateDisplay();
            }

            initializeElements() {
                this.audio = document.getElementById('audioPlayer');
                this.playPauseBtn = document.getElementById('playPauseBtn');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.progressBar = document.getElementById('progressBar');
                this.progress = document.getElementById('progress');
                this.currentTimeDisplay = document.getElementById('currentTime');
                this.totalTimeDisplay = document.getElementById('totalTime');
                this.songTitle = document.getElementById('songTitle');
                this.artistName = document.getElementById('artistName');
                this.albumArt = document.getElementById('albumArt');
                this.volumeBar = document.getElementById('volumeBar');
                this.volumeProgress = document.getElementById('volumeProgress');
                this.volumeIcon = document.getElementById('volumeIcon');
                this.playlist = document.getElementById('playlist');
            }

            initializeEventListeners() {
                this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
                this.prevBtn.addEventListener('click', () => this.previousSong());
                this.nextBtn.addEventListener('click', () => this.nextSong());
                
                this.progressBar.addEventListener('click', (e) => this.setProgress(e));
                this.volumeBar.addEventListener('click', (e) => this.setVolume(e));
                this.volumeIcon.addEventListener('click', () => this.toggleMute());

                // Audio event listeners
                this.audio.addEventListener('loadedmetadata', () => this.onAudioLoaded());
                this.audio.addEventListener('timeupdate', () => this.onTimeUpdate());
                this.audio.addEventListener('ended', () => this.onSongEnd());
                this.audio.addEventListener('play', () => this.onPlay());
                this.audio.addEventListener('pause', () => this.onPause());

                // Playlist event listeners
                this.playlist.addEventListener('click', (e) => {
                    const playlistItem = e.target.closest('.playlist-item');
                    if (playlistItem) {
                        const songIndex = parseInt(playlistItem.dataset.song);
                        this.selectSong(songIndex);
                    }
                });

                // Keyboard shortcuts
                document.addEventListener('keydown', (e) => {
                    if (e.code === 'Space') {
                        e.preventDefault();
                        this.togglePlayPause();
                    } else if (e.code === 'ArrowRight') {
                        this.nextSong();
                    } else if (e.code === 'ArrowLeft') {
                        this.previousSong();
                    }
                });
            }

            loadSong(index) {
                const song = this.songs[index];
                this.audio.src = song.src;
                this.audio.volume = this.volume;
                this.updateDisplay();
            }

            onAudioLoaded() {
                this.totalTimeDisplay.textContent = this.formatTime(this.audio.duration);
                this.updateProgressBar();
            }

            onTimeUpdate() {
                this.updateProgressBar();
            }

            onSongEnd() {
                this.nextSong();
            }

            onPlay() {
                this.isPlaying = true;
                this.playPauseBtn.textContent = '⏸';
                this.playPauseBtn.style.animation = 'pulse 1s infinite';
            }

            onPause() {
                this.isPlaying = false;
                this.playPauseBtn.textContent = '▶';
                this.playPauseBtn.style.animation = 'none';
            }

            togglePlayPause() {
                if (this.isPlaying) {
                    this.audio.pause();
                } else {
                    this.audio.play().catch(e => {
                        console.log('Error playing audio:', e);
                        alert('Unable to play audio. Please check if the audio file exists and is accessible.');
                    });
                }
            }

            previousSong() {
                this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length;
                this.loadSong(this.currentSongIndex);
                if (this.isPlaying) {
                    this.audio.play();
                }
            }

            nextSong() {
                this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
                this.loadSong(this.currentSongIndex);
                if (this.isPlaying) {
                    this.audio.play();
                }
            }

            selectSong(index) {
                this.currentSongIndex = index;
                this.loadSong(this.currentSongIndex);
                this.audio.play().catch(e => {
                    console.log('Error playing audio:', e);
                });
            }

            setProgress(e) {
                if (this.audio.duration) {
                    const rect = this.progressBar.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = clickX / rect.width;
                    this.audio.currentTime = percentage * this.audio.duration;
                }
            }

            setVolume(e) {
                const rect = this.volumeBar.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                this.volume = Math.max(0, Math.min(1, clickX / rect.width));
                this.audio.volume = this.volume;
                this.updateVolumeBar();
                this.updateVolumeIcon();
            }

            toggleMute() {
                if (this.isMuted) {
                    this.volume = this.previousVolume;
                    this.isMuted = false;
                } else {
                    this.previousVolume = this.volume;
                    this.volume = 0;
                    this.isMuted = true;
                }
                this.audio.volume = this.volume;
                this.updateVolumeBar();
                this.updateVolumeIcon();
            }

            updateDisplay() {
                const currentSong = this.songs[this.currentSongIndex];
                this.songTitle.textContent = currentSong.title;
                this.artistName.textContent = currentSong.artist;
                
                // Update album art
                if (currentSong.image) {
                    this.albumArt.innerHTML = `<img src="${currentSong.image}" alt="${currentSong.title}" onerror="this.style.display='none'">`;
                    this.albumArt.classList.remove('no-image');
                } else {
                    this.albumArt.innerHTML = '';
                    this.albumArt.classList.add('no-image');
                }
                
                // Update album art background color
                this.albumArt.style.background = `linear-gradient(45deg, ${currentSong.color}, ${this.adjustColor(currentSong.color, -20)})`;
                
                // Update playlist active state
                document.querySelectorAll('.playlist-item').forEach((item, index) => {
                    item.classList.toggle('active', index === this.currentSongIndex);
                });
            }

            updateProgressBar() {
                if (this.audio.duration) {
                    const percentage = (this.audio.currentTime / this.audio.duration) * 100;
                    this.progress.style.width = `${percentage}%`;
                    this.currentTimeDisplay.textContent = this.formatTime(this.audio.currentTime);
                }
            }

            updateVolumeBar() {
                this.volumeProgress.style.width = `${this.volume * 100}%`;
            }

            updateVolumeIcon() {
                if (this.volume === 0 || this.isMuted) {
                    this.volumeIcon.textContent = '🔇';
                } else if (this.volume < 0.5) {
                    this.volumeIcon.textContent = '🔉';
                } else {
                    this.volumeIcon.textContent = '🔊';
                }
            }

            formatTime(seconds) {
                if (isNaN(seconds)) return '0:00';
                const minutes = Math.floor(seconds / 60);
                const secs = Math.floor(seconds % 60);
                return `${minutes}:${secs.toString().padStart(2, '0')}`;
            }

            adjustColor(color, amount) {
                const num = parseInt(color.slice(1), 16);
                const r = Math.max(0, Math.min(255, (num >> 16) + amount));
                const g = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amount));
                const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
                return `#${(0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            }
        }

        // Initialize the music player
        const musicPlayer = new MusicPlayer();