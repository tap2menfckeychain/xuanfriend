// =====================================================
// LẤY CÁC PHẦN TỬ
// =====================================================

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const musicDisc = document.getElementById("musicDisc");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

const volumeBtn = document.getElementById("volumeBtn");

// =====================================================
// ÂM LƯỢNG BAN ĐẦU
// =====================================================

audio.volume = 0.75;

// =====================================================
// NÚT PLAY / PAUSE
// =====================================================

playBtn.addEventListener("click", async function () {
  if (audio.paused) {
    try {
      await audio.play();
    } catch (error) {
      console.error(error);

      alert(
        "Không phát được nhạc. Bạn hãy kiểm tra file music.mp3 có nằm cùng thư mục với index.html không nhé!",
      );
    }
  } else {
    audio.pause();
  }
});

// =====================================================
// KHI NHẠC ĐANG CHẠY
// =====================================================

audio.addEventListener("play", function () {
  playBtn.textContent = "Ⅱ";

  musicDisc.classList.add("playing");
});

// =====================================================
// KHI NHẠC DỪNG
// =====================================================

audio.addEventListener("pause", function () {
  playBtn.textContent = "▶";

  musicDisc.classList.remove("playing");
});

// =====================================================
// KHI FILE NHẠC LOAD XONG
// =====================================================

audio.addEventListener("loadedmetadata", function () {
  progress.max = audio.duration;

  duration.textContent = formatTime(audio.duration);
});

// =====================================================
// CẬP NHẬT THANH NHẠC
// =====================================================

audio.addEventListener("timeupdate", function () {
  progress.value = audio.currentTime;

  currentTime.textContent = formatTime(audio.currentTime);
});

// =====================================================
// KÉO THANH NHẠC
// =====================================================

progress.addEventListener("input", function () {
  audio.currentTime = Number(progress.value);
});

// =====================================================
// ÂM LƯỢNG
// =====================================================

volume.addEventListener("input", function () {
  audio.volume = Number(volume.value);

  updateVolumeIcon();
});

// =====================================================
// MUTE
// =====================================================

volumeBtn.addEventListener("click", function () {
  if (audio.volume > 0) {
    audio.dataset.oldVolume = audio.volume;

    audio.volume = 0;

    volume.value = 0;
  } else {
    const oldVolume = Number(audio.dataset.oldVolume) || 0.75;

    audio.volume = oldVolume;

    volume.value = oldVolume;
  }

  updateVolumeIcon();
});

// =====================================================
// ICON ÂM LƯỢNG
// =====================================================

function updateVolumeIcon() {
  if (audio.volume === 0) {
    volumeBtn.textContent = "🔇";
  } else if (audio.volume < 0.5) {
    volumeBtn.textContent = "🔉";
  } else {
    volumeBtn.textContent = "🔊";
  }
}

// =====================================================
// ĐỊNH DẠNG THỜI GIAN
// =====================================================

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);

  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

// =====================================================
// KHI BÀI HÁT KẾT THÚC
// =====================================================

audio.addEventListener("ended", function () {
  playBtn.textContent = "▶";

  musicDisc.classList.remove("playing");

  progress.value = 0;

  currentTime.textContent = "0:00";
});
