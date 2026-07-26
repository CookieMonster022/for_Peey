// ---- Smooth chapter crossfade + responsive container sizing ----

const storyContainer = document.getElementById('mainContainer');
const allChapters = () => Array.from(document.querySelectorAll('.chapter'));

// Measures the natural height of a chapter (even while hidden) so the
// container can smoothly animate its height between chapters of different
// lengths, on any screen size.
function measureChapterHeight(chapterEl) {
  const clone = chapterEl.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.visibility = 'hidden';
  clone.style.pointerEvents = 'none';
  clone.style.opacity = '1';
  clone.style.transform = 'none';
  clone.style.transition = 'none';
  clone.style.width = chapterEl.offsetWidth ? `${chapterEl.offsetWidth}px` : '100%';
  clone.classList.add('active');
  storyContainer.appendChild(clone);
  const height = clone.offsetHeight;
  storyContainer.removeChild(clone);
  return height;
}

function setContainerHeightTo(chapterEl) {
  if (!storyContainer || !chapterEl) return;
  const height = measureChapterHeight(chapterEl);
  storyContainer.style.height = `${height}px`;
}

// Function to handle moving between story chapters
function nextChapter(chapterNumber) {
  const currentChapter = document.querySelector('.chapter.active');
  const targetChapter = document.getElementById(`chapter${chapterNumber}`);

  if (!targetChapter || targetChapter === currentChapter) return;

  // Resize the container to fit the incoming chapter smoothly
  setContainerHeightTo(targetChapter);

  // Crossfade: hide current, reveal next at the same time (no layout jump
  // because both chapters are absolutely stacked within the container)
  if (currentChapter) {
    currentChapter.classList.remove('active');
  }
  targetChapter.classList.add('active');
}

// Keep the container height in sync with the active chapter whenever the
// viewport changes (rotation, resizing the window, dev tools, etc.)
function syncHeightOnResize() {
  const active = document.querySelector('.chapter.active');
  if (active) {
    storyContainer.style.transition = 'none';
    setContainerHeightTo(active);
    // Re-enable the smooth transition on the next frame
    requestAnimationFrame(() => {
      storyContainer.style.transition = '';
    });
  }
}

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(syncHeightOnResize, 120);
});

// Initialize container height once fonts/layout are ready
window.addEventListener('DOMContentLoaded', () => {
  const active = document.querySelector('.chapter.active') || allChapters()[0];
  if (active) {
    setContainerHeightTo(active);
  }
});

// Fonts loading late can shift heights slightly - re-measure once ready
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(syncHeightOnResize);
}

// THE FINAL CELEBRATION INTERACTION
const celebrateBtn = document.getElementById('celebrateBtn');

celebrateBtn.addEventListener('click', () => {
  // Change the button text
  celebrateBtn.textContent = 'You are Loved! ❤️';

  // Recalculate height in case the new text wraps differently
  setContainerHeightTo(document.querySelector('.chapter.active'));

  // 1. Initial burst!
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff5e7e', '#ff9a9e', '#fecfef', '#ffffff'], // Personalized colors
  });

  // 2. Continuous beautiful cascade (lasts 5 seconds)
  var end = Date.now() + 5 * 1000;

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 }, // Shoots from left
      colors: ['#ff5e7e', '#ffffff'],
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 }, // Shoots from right
      colors: ['#fecfef', '#ffffff'],
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
});
