<script setup lang="ts">
interface Skill {
  name: string
  pct:  number
  icon: string
  desc: string
}

const skills: Skill[] = [
  { name: 'PHP 8.x',        pct: 90, icon: '🐘', desc: 'OOP, PSR standards, Composer, Fibers, Named arguments.' },
  { name: 'Laravel',        pct: 88, icon: '🔴', desc: 'Eloquent, Queues, Events, Policies, Sail, Horizon, Livewire.' },
  { name: 'MySQL / Redis',  pct: 82, icon: '🗄️', desc: 'Query optimization, indexing, migrations, caching strategies.' },
  { name: 'REST API',       pct: 86, icon: '🔌', desc: 'API Resources, versioning, Sanctum / Passport, OpenAPI docs.' },
  { name: 'Docker / DevOps',pct: 72, icon: '🐳', desc: 'Docker Compose, GitHub Actions CI/CD, Linux server basics.' },
  { name: 'JavaScript',     pct: 60, icon: '⚡', desc: 'Alpine.js, Axios, basic Vue / React for frontend integration.' },
]

const cardRefs = ref<HTMLElement[]>([])
const filled   = ref<boolean[]>(new Array(skills.length).fill(false))

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = cardRefs.value.indexOf(entry.target as HTMLElement)
        if (idx !== -1) filled.value[idx] = true
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.25 })

  cardRefs.value.forEach(el => observer.observe(el))
})
</script>

<template>
  <section id="skills" class="sec">
    <div class="container">
      <div class="sk-top">
        <div>
          <div class="eye rv">Tech Stack</div>
          <h2 class="h2 rv d1">Công nghệ<br><span class="acc">tôi sử dụng</span></h2>
        </div>
        <p class="sub rv d2">
          Chuyên sâu về <strong style="color:var(--tx)">PHP / Laravel</strong>—từ REST API đến hệ
          thống queue phức tạp, luôn chú trọng performance và clean architecture.
        </p>
      </div>
      <div class="sk-grid">
        <div
          v-for="(skill, i) in skills"
          :key="skill.name"
          ref="cardRefs"
          class="skc rv"
          :class="`d${(i % 3) + 1}`"
        >
          <div class="sk-ico">{{ skill.icon }}</div>
          <div class="sk-hd">
            <span class="sk-nm">{{ skill.name }}</span>
            <span class="sk-pc">{{ skill.pct }}%</span>
          </div>
          <div class="sk-ds">{{ skill.desc }}</div>
          <div class="sk-tr">
            <div class="sk-fl" :style="{ width: filled[i] ? skill.pct + '%' : '0%' }" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sk-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 60px;
  align-items: end;
  margin-bottom: 52px;
}
.sk-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 18px;
}
.skc {
  background: var(--cd);
  border: 1px solid var(--br);
  border-radius: 18px;
  padding: 26px;
  transition: border-color .3s, transform .3s, box-shadow .3s;
  position: relative;
  overflow: hidden;
}
.skc::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 100%, rgba(255,107,43,.04), transparent 60%);
  opacity: 0;
  transition: opacity .3s;
}
.skc:hover { border-color: var(--bro); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,.35); }
.skc:hover::after { opacity: 1; }
.sk-ico {
  width: 42px; height: 42px;
  background: rgba(255,107,43,.10);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-bottom: 15px;
}
.sk-hd  { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
.sk-nm  { font-weight: 600; font-size: .98rem; }
.sk-pc  { font-family: var(--fmo); font-size: .82rem; color: var(--p); }
.sk-ds  { font-size: .81rem; color: var(--mt); line-height: 1.65; margin-bottom: 15px; }
.sk-tr  { height: 3px; background: var(--br); border-radius: 3px; overflow: hidden; }
.sk-fl  {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--p), var(--p2));
  transition: width 1.3s cubic-bezier(.4, 0, .2, 1);
}

@media (max-width: 900px) {
  .sk-top { grid-template-columns: 1fr; gap: 20px; }
}
</style>
