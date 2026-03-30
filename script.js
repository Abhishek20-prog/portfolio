var cur = document.getElementById('cursor');
var dot = cur.querySelector('.cursor-dot');
var ring = cur.querySelector('.cursor-ring');
var mx=0, my=0, rx=0, ry=0;
document.addEventListener('mousemove', function(e){ mx=e.clientX; my=e.clientY; });
(function tick(){
  dot.style.left  = mx+'px'; dot.style.top  = my+'px';
  rx += (mx-rx)*0.12;        ry += (my-ry)*0.12;
  ring.style.left = rx+'px'; ring.style.top = ry+'px';
  requestAnimationFrame(tick);
})();

/* ── NAV ── */
var nav = document.getElementById('nav');
window.addEventListener('scroll', function(){ nav.classList.toggle('scrolled', window.scrollY > 60); });

/* ── REVEAL ── */
var ro = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('visible'); }); }, {threshold:0.08});
document.querySelectorAll('.reveal').forEach(function(r){ ro.observe(r); });

/* ── SKILL BARS ── */
var bo = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('animate'); }); }, {threshold:0.2});
document.querySelectorAll('.skill-bar').forEach(function(b){ bo.observe(b); });

/* ── VIDEO UPLOAD ── */
function loadVid(inputId, placeholderId, videoId){
  var file = document.getElementById(inputId).files[0];
  if(!file) return;
  var vid = document.getElementById(videoId);
  var ph  = document.getElementById(placeholderId);
  vid.src = URL.createObjectURL(file);
  vid.style.display = 'block';
  ph.style.display  = 'none';
  vid.play().catch(function(){});
}

/* ── BEFORE / AFTER ── */
var baWrap   = document.getElementById('baWrap');
var baBefore = document.getElementById('baBefore');
var baDivider= document.getElementById('baDivider');
var drag = false;

function moveBA(x){
  var r   = baWrap.getBoundingClientRect();
  var pct = Math.max(5, Math.min(95, ((x - r.left) / r.width) * 100));
  baDivider.style.left    = pct + '%';
  baBefore.style.clipPath = 'inset(0 ' + (100-pct) + '% 0 0)';
}

baDivider.addEventListener('mousedown',  function(e){ drag=true; e.preventDefault(); });
window.addEventListener   ('mousemove',  function(e){ if(drag) moveBA(e.clientX); });
window.addEventListener   ('mouseup',    function(){ drag=false; });
baDivider.addEventListener('touchstart', function(){ drag=true; }, {passive:true});
baWrap.addEventListener   ('touchmove',  function(e){ if(drag) moveBA(e.touches[0].clientX); }, {passive:true});
window.addEventListener   ('touchend',   function(){ drag=false; });

/* ── FORM ── */
document.getElementById('formBtn').addEventListener('click', function(){
  var btn = this;
  btn.textContent = 'Sent!';
  btn.style.background   = 'var(--accent)';
  btn.style.borderColor  = 'var(--accent)';
  btn.style.color        = '#0a0a0a';
  setTimeout(function(){
    btn.textContent      = 'Send Message';
    btn.style.background = '';
    btn.style.borderColor= '';
    btn.style.color      = '';
  }, 3000);
});
var video = document.querySelector(".vid-el");
var playBtn = document.querySelector(".play-btn");
var muteBtn = document.querySelector(".mute-btn");
var progressFill = document.querySelector(".progress-fill");
var progressBar = document.querySelector(".progress-bar");

/* ▶ Play / Pause */
document.querySelectorAll(".video-wrap").forEach(function(wrapper) {

  var video = wrapper.querySelector(".vid-el");
  var playBtn = wrapper.querySelector(".play-btn");
  var muteBtn = wrapper.querySelector(".mute-btn");
  var progressFill = wrapper.querySelector(".progress-fill");
  var progressBar = wrapper.querySelector(".progress-bar");

  /* ▶ Play / Pause */
  playBtn.addEventListener("click", function () {
    if (video.paused) {
      video.play();
      playBtn.textContent = "⏸";
    } else {
      video.pause();
      playBtn.textContent = "▶";
    }
  });

  /* 🔊 Mute */
  muteBtn.addEventListener("click", function () {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? "🔇" : "🔊";
  });

  /* 📊 Progress update */
  video.addEventListener("timeupdate", function () {
    var percent = (video.currentTime / video.duration) * 100;
    progressFill.style.width = percent + "%";
  });

  /* ⏩ Seek */
  progressBar.addEventListener("click", function (e) {
    var rect = progressBar.getBoundingClientRect();
    var clickX = e.clientX - rect.left;
    var percent = clickX / rect.width;
    video.currentTime = percent * video.duration;
  });

  /* 🔥 Click video to play */
  video.addEventListener("click", function () {
    playBtn.click();
  });

});