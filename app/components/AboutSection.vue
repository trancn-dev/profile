<script setup lang="ts">
const containerRef = ref<HTMLElement | null>(null)

const chipVal = ref(0)
const stats = reactive([
  { val: 0, to: 20, suffix: '+', label: 'Projects' },
  { val: 0, to: 3,  suffix: '+', label: 'Years exp' },
  { val: 0, to: 100,suffix: '%', label: 'Dedicated' },
])

function animateNum(setter: (v: number) => void, to: number) {
  let v = 0
  const timer = setInterval(() => {
    v = Math.min(v + to / 55, to)
    setter(Math.floor(v))
    if (v >= to) clearInterval(timer)
  }, 18)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animateNum(v => { chipVal.value = v }, 3)
        stats.forEach(s => animateNum(v => { s.val = v }, s.to))
        observer.disconnect()
      }
    },
    { threshold: 0.3 },
  )
  if (containerRef.value) observer.observe(containerRef.value)
})
</script>

<template>
  <section id="about" class="sec sec-alt">
    <div ref="containerRef" class="container about-g">
      <!-- Avatar -->
      <div class="av-box rvl">
        <div class="av-frame">
          <div class="avph">
            <svg width="88" height="88" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
            <span>your photo</span>
          </div>
        </div>
        <div class="av-chip">
          <strong>{{ chipVal }}</strong>Năm<br>kinh nghiệm
        </div>
      </div>

      <!-- Bio -->
      <div>
        <div class="eye rv">Về mình</div>
        <h2 class="h2 rv d1" style="margin-bottom:20px">
          Đam mê xây dựng<br><span class="acc">backend vững chắc</span>
        </h2>
        <p class="atp rv d2">
          Mình là <strong>Backend Developer</strong> với kinh nghiệm phát triển ứng dụng web dùng
          <strong>PHP</strong> và <strong>Laravel</strong>. Mình thích tạo ra API sạch, hệ thống CSDL
          tối ưu và pipeline CI/CD chạy trơn tru từ đầu đến cuối.
        </p>
        <p class="atp rv d3">
          Mỗi dòng code đều hướng đến khả năng bảo trì, testability và scalability—vì code hôm nay
          là nền tảng cho sản phẩm ngày mai.
        </p>
        <div class="stats">
          <div v-for="(s, i) in stats" :key="s.label" class="sc rvs" :class="`d${i + 2}`">
            <div class="sn"><span>{{ s.val }}</span><sup>{{ s.suffix }}</sup></div>
            <div class="sl">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-g {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 80px;
  align-items: center;
}
.av-box { position: relative; }
.av-frame {
  width: 100%;
  aspect-ratio: 3/4;
  border-radius: 24px;
  background: var(--cd);
  border: 1px solid var(--br);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
.av-frame::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 25px;
  background: linear-gradient(140deg, var(--p) 0%, transparent 45%, transparent 55%, rgba(255,107,43,.4) 100%);
  z-index: -1;
}
.avph {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--mt);
  font-size: .83rem;
  font-family: var(--fmo);
}
.avph svg { opacity: .25; }
.av-chip {
  position: absolute;
  bottom: -18px; right: -18px;
  background: var(--p);
  color: #fff;
  border-radius: 14px;
  padding: 14px 18px;
  font-weight: 700;
  font-size: .85rem;
  line-height: 1.2;
  box-shadow: 0 10px 28px var(--glow);
  text-align: center;
}
.av-chip strong { display: block; font-size: 2rem; line-height: 1; }
.atp { color: var(--mt); line-height: 1.85; margin-bottom: 16px; font-size: .98rem; }
.atp strong { color: var(--tx); }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 36px; }
.sc {
  background: var(--cd);
  border: 1px solid var(--br);
  border-radius: 14px;
  padding: 20px 16px;
  text-align: center;
  transition: border-color .25s, transform .25s;
}
.sc:hover { border-color: var(--bro); transform: translateY(-3px); }
.sn {
  font-family: var(--fmo);
  font-size: 2.1rem;
  font-weight: 700;
  color: var(--p);
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 1px;
}
.sn sup { font-size: 1rem; }
.sl { margin-top: 4px; font-size: .72rem; text-transform: uppercase; letter-spacing: .08em; color: var(--mt); }

@media (max-width: 900px) {
  .about-g { grid-template-columns: 1fr; gap: 50px; }
  .av-box  { max-width: 280px; margin: 0 auto; }
}
@media (max-width: 640px) {
  .stats { gap: 10px; }
  .sn    { font-size: 1.5rem; }
}
</style>
