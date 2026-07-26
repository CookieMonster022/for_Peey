// Function to handle moving between story chapters
function nextChapter(chapterNumber) {
  // 1. Find the currently active chapter
  const currentChapter = document.querySelector('.chapter.active');
  
  // 2. Hide current chapter (starts fade-out)
  if (currentChapter) {
    currentChapter.classList.remove('active');
  }
  
  // 3. Find and show the next chapter
  const nextChapterId = `chapter${chapterNumber}`;
  const nextChapter = document.getElementById(nextChapterId);
  
  // A tiny delay ensures smooth transition timing
  setTimeout(() => {
    if (nextChapter) {
      nextChapter.classList.add('active');
    }
  }, 50); // Matches the start of the fade
}

// THE FINAL CELEBRATION INTERACTION
const celebrateBtn = document.getElementById("celebrateBtn");

celebrateBtn.addEventListener("click", () => {
  // Change the button text
  celebrateBtn.textContent = "You are Loved! ❤️";
  
  // 1. Initial burst!
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff5e7e', '#ff9a9e', '#fecfef', '#ffffff'] // Personalized colors
  });

  // 2. Continuous beautiful cascade (lasts 5 seconds)
  var end = Date.now() + (5 * 1000);

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 }, // Shoots from left
      colors: ['#ff5e7e', '#ffffff']
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 }, // Shoots from right
      colors: ['#fecfef', '#ffffff']
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
});
