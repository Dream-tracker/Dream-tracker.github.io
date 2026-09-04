// mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); } });
}, {threshold:0.15});
reveals.forEach(el => io.observe(el));

// cursor-following parallax on the dot-grid background
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!prefersReducedMotion){
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  const range = 24;

  window.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * range;
    targetY = (e.clientY / window.innerHeight - 0.5) * range;
  });

  function followCursor(){
    curX += (targetX - curX) * 0.06;
    curY += (targetY - curY) * 0.06;
    document.body.style.backgroundPosition = `${curX}px ${curY}px`;
    requestAnimationFrame(followCursor);
  }
  requestAnimationFrame(followCursor);
}
