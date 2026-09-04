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

// hero loss-curve animation (signature element)
const path = document.getElementById('lossPath');
const dot = document.getElementById('lossDot');
const epochEl = document.getElementById('epoch-val');
const lossEl = document.getElementById('loss-val');
const len = path.getTotalLength();
path.style.strokeDasharray = len;
path.style.strokeDashoffset = len;

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const duration = prefersReduced ? 0 : 2400;
let start = null;

function animate(ts){
  if(!start) start = ts;
  const progress = Math.min((ts - start) / duration, 1);
  const drawLen = len * progress;
  path.style.strokeDashoffset = len - drawLen;

  const pt = path.getPointAtLength(drawLen);
  dot.setAttribute('cx', pt.x);
  dot.setAttribute('cy', pt.y);

  epochEl.textContent = String(Math.floor(2024 + progress * 2));
  lossEl.textContent = Math.round(progress * 92) + '%';

  if(progress < 1) requestAnimationFrame(animate);
}
if(prefersReduced){
  path.style.strokeDashoffset = 0;
  const pt = path.getPointAtLength(len);
  dot.setAttribute('cx', pt.x); dot.setAttribute('cy', pt.y);
  epochEl.textContent = '2026'; lossEl.textContent = '92%';
} else {
  requestAnimationFrame(animate);
}
