<script setup lang="ts">
/* ── Name chars ── */
const nameChars = computed(() =>
  [...'Tran'].map((ch, i) => ({
    char: ch === ' ' ? '\u00A0' : ch,
    delay: 1800 + i * 75,
    orange: i >= 2,
  })),
)

/* ── Typewriter ── */
const roles = ['Backend Developer', 'PHP Specialist', 'Laravel Engineer', 'API Architect']
const currentRole = ref('')
let ri = 0, ci = 0, deleting = false
let typeTimer: ReturnType<typeof setTimeout> | null = null

function tick() {
  const cur = roles[ri]
  if (!deleting) {
    currentRole.value = cur.slice(0, ++ci)
    if (ci === cur.length) { deleting = true; typeTimer = setTimeout(tick, 1900); return }
    typeTimer = setTimeout(tick, 60)
  } else {
    currentRole.value = cur.slice(0, --ci)
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length }
    typeTimer = setTimeout(tick, 32)
  }
}

/* ── Canvas particles ── */
const canvasRef = ref<HTMLCanvasElement | null>(null)
let rafId: number | null = null

/* ── Blob parallax ── */
const blobRef = ref<HTMLDivElement | null>(null)
function handleMouseMove(e: MouseEvent) {
  if (!blobRef.value) return
  const rx = (e.clientX / window.innerWidth - 0.5) * 24
  const ry = (e.clientY / window.innerHeight - 0.5) * 24
  blobRef.value.style.transform = `translate(calc(-50% + ${rx}px), calc(-55% + ${ry}px))`
}

onMounted(() => {
  typeTimer = setTimeout(tick, 2300)

  // Particles
  const cvs = canvasRef.value!
  const ctx = cvs.getContext('2d')!
  let W = 0, H = 0
  const N = 70, LK = 130

  const pts = Array.from({ length: N }, () => ({
    x: Math.random() * 1920, y: Math.random() * 900,
    vx: (Math.random() - 0.5) * 0.38, vy: (Math.random() - 0.5) * 0.38,
    r: Math.random() * 1.4 + 0.4, a: Math.random() * 0.45 + 0.15,
  }))

  function resize() { W = cvs.width = cvs.offsetWidth; H = cvs.height = cvs.offsetHeight }
  resize()
  new ResizeObserver(resize).observe(cvs)

  function frame() {
    ctx.clearRect(0, 0, W, H)
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,107,43,${p.a})`; ctx.fill()
    }
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < LK) {
          ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y)
          ctx.strokeStyle = `rgba(255,107,43,${0.07 * (1 - d / LK)})`; ctx.lineWidth = 0.6; ctx.stroke()
        }
      }
    }
    rafId = requestAnimationFrame(frame)
  }
  frame()

  document.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (typeTimer) clearTimeout(typeTimer)
  if (rafId) cancelAnimationFrame(rafId)
  document.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section id="hero">
    <canvas ref="canvasRef" id="cvs" />
    <div ref="blobRef" class="blob" />
    <div class="hero-wrap">
      <div class="badge"><div class="bdot" /> Available for work</div>
      <h1 class="hname" aria-label="Tran">
        <span
          v-for="(item, i) in nameChars"
          :key="i"
          class="c"
          :class="{ co: item.orange }"
          :style="{ animationDelay: item.delay + 'ms' }"
        >{{ item.char }}</span>
      </h1>
      <div class="hrole"><span>{{ currentRole }}</span><span class="cur" /></div>
      <p class="hdesc">
        Backend Developer chuyên xây dựng hệ thống web hiệu năng cao bằng
        <strong>PHP</strong> &amp; <strong>Laravel</strong>.
        Tập trung vào clean code, kiến trúc mở rộng được và REST API chuẩn.
      </p>
      <div class="hbtns">
        <a href="#projects" class="btn bs">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Xem Projects
        </a>
        <a href="#contact" class="btn bg">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22,6 12,13 2,6" />
          </svg>
          Liên hệ ngay
        </a>
      </div>
    </div>
    <div class="scue"><span>scroll</span><div class="sline" /></div>
  </section>
</template>

<style scoped>
#hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-top: var(--nh);
}
#cvs {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .5;
}
.blob {
  position: absolute;
  width: 700px; height: 700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,107,43,.10) 0%, transparent 68%);
  top: 50%; left: 50%;
  transform: translate(-50%, -55%);
  pointer-events: none;
  transition: transform .12s ease-out;
}
.hero-wrap {
  position: relative;
  z-index: 2;
  padding: 60px var(--px);
  max-width: 900px;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,107,43,.1);
  border: 1px solid rgba(255,107,43,.3);
  border-radius: 50px;
  padding: 5px 16px;
  font-family: var(--fmo);
  font-size: .75rem;
  color: var(--p);
  margin-bottom: 26px;
  opacity: 0;
  animation: fadeUp .6s 1.7s ease forwards;
}
.bdot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--p);
  animation: bpulse 2s infinite;
}
@keyframes bpulse {
  0%,100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(.65); opacity: .4; }
}
.hname {
  font-size: clamp(3.8rem, 10vw, 8.5rem);
  font-weight: 700;
  line-height: .95;
  letter-spacing: -.03em;
  margin-bottom: 18px;
  overflow: hidden;
}
.hname .c {
  display: inline-block;
  transform: translateY(115%);
  animation: crise .65s ease forwards;
}
.hname .co { color: var(--p); }
@keyframes crise { to { transform: translateY(0); } }
.hrole {
  font-family: var(--fmo);
  font-size: clamp(.95rem, 2vw, 1.35rem);
  color: var(--mt);
  height: 1.8em;
  margin-bottom: 28px;
  opacity: 0;
  animation: fadeIn .5s 2.2s ease forwards;
}
.cur {
  display: inline-block;
  width: 2px; height: .9em;
  background: var(--p);
  margin-left: 2px;
  vertical-align: middle;
  animation: blink .85s infinite;
}
@keyframes blink { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }
.hdesc {
  font-size: 1rem;
  color: var(--mt);
  max-width: 480px;
  line-height: 1.8;
  margin-bottom: 40px;
  opacity: 0;
  animation: fadeUp .5s 2.4s ease forwards;
}
.hdesc strong { color: var(--tx); }
.hbtns {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeUp .5s 2.6s ease forwards;
}
.scue {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  opacity: 0;
  animation: fadeIn .5s 3.2s ease forwards;
}
.scue span {
  font-family: var(--fmo);
  font-size: .65rem;
  text-transform: uppercase;
  letter-spacing: .12em;
  color: var(--mt);
}
.sline {
  width: 1px; height: 48px;
  background: linear-gradient(to bottom, transparent, var(--p));
  animation: spulse 2s 3.2s ease-in-out infinite;
}
@keyframes spulse {
  0%  { transform: scaleY(0); transform-origin: top;    opacity: 0; }
  45% { transform: scaleY(1); transform-origin: top;    opacity: 1; }
  46% { transform-origin: bottom; }
  100%{ transform: scaleY(0); transform-origin: bottom; opacity: 0; }
}
@media (max-width: 640px) {
  .hero-wrap { padding: 50px var(--px) 80px; }
}
</style>
