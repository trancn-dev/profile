<script setup lang="ts">
const isSticky    = ref(false)
const isMenuOpen  = ref(false)
const activeSection = ref('')

function handleScroll() {
  isSticky.value = window.scrollY > 10

  // update progress bar
  const pgbar = document.getElementById('pgbar')
  if (pgbar) {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100
    pgbar.style.width = pct + '%'
  }

  // active nav section
  const sections = ['hero', 'about', 'skills', 'projects', 'contact']
  for (const id of sections) {
    const el = document.getElementById(id)
    if (!el) continue
    const r = el.getBoundingClientRect()
    if (r.top <= 90 && r.bottom >= 90) {
      activeSection.value = id
      break
    }
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
function closeMenu() {
  isMenuOpen.value = false
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header id="hdr" :class="{ stk: isSticky }">
    <a href="#hero" class="brand">
      <span class="o">&lt;</span>trancn<span class="o">/&gt;</span>
    </a>
    <ul class="nav-ul">
      <li><a href="#about"    :class="['nl', { act: activeSection === 'about'    }]">About</a></li>
      <li><a href="#skills"   :class="['nl', { act: activeSection === 'skills'   }]">Skills</a></li>
      <li><a href="#projects" :class="['nl', { act: activeSection === 'projects' }]">Projects</a></li>
      <li><a href="#contact"  class="nl ncta">Liên hệ</a></li>
    </ul>
    <button class="ham" :class="{ open: isMenuOpen }" aria-label="Menu" @click="toggleMenu">
      <span /><span /><span />
    </button>
  </header>

  <nav id="mnav" :class="{ open: isMenuOpen }">
    <a href="#about"    class="ml" @click="closeMenu">About</a>
    <a href="#skills"   class="ml" @click="closeMenu">Skills</a>
    <a href="#projects" class="ml" @click="closeMenu">Projects</a>
    <a href="#contact"  class="ml" @click="closeMenu">Liên hệ</a>
  </nav>
</template>

<style scoped>
#hdr {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  height: var(--nh);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--px);
  transition: background .3s, border-color .3s, backdrop-filter .3s;
  border-bottom: 1px solid transparent;
  transform: translateY(-100%);
  animation: slideDown .6s 1.5s ease forwards;
}
@keyframes slideDown { to { transform: translateY(0); } }
#hdr.stk {
  background: rgba(9, 9, 15, .82);
  backdrop-filter: blur(16px);
  border-color: var(--br);
}

.brand {
  font-family: var(--fmo);
  font-weight: 700;
  font-size: 1.15rem;
  letter-spacing: .05em;
  display: flex;
  align-items: center;
  gap: 2px;
}
.brand .o { color: var(--p); }

.nav-ul {
  display: flex;
  align-items: center;
  gap: 2px;
  list-style: none;
}
.nav-ul a {
  position: relative;
  font-size: .85rem;
  font-weight: 500;
  color: var(--mt);
  padding: 7px 14px;
  border-radius: 8px;
  transition: color .2s, background .2s;
}
.nav-ul a:hover,
.nav-ul a.act {
  color: var(--tx);
  background: rgba(255, 255, 255, .05);
}
.nav-ul a.act::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--p);
}
.ncta {
  background: var(--p) !important;
  color: #fff !important;
  border-radius: 8px;
  font-weight: 600;
  transition: box-shadow .2s, transform .2s !important;
}
.ncta:hover {
  box-shadow: 0 0 22px var(--glow) !important;
  transform: translateY(-1px);
}

.ham {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 6px;
  border: none;
  background: none;
}
.ham span {
  display: block;
  width: 22px;
  height: 2px;
  background: var(--tx);
  border-radius: 2px;
  transition: transform .28s, opacity .28s;
}
.ham.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.ham.open span:nth-child(2) { opacity: 0; }
.ham.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

#mnav {
  display: none;
  position: fixed;
  top: var(--nh);
  left: 0; right: 0;
  z-index: 190;
  background: rgba(9, 9, 15, .96);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--br);
  padding: 20px var(--px) 28px;
  flex-direction: column;
  gap: 4px;
  transform: translateY(-10px);
  opacity: 0;
  transition: transform .28s, opacity .28s;
}
#mnav.open {
  display: flex;
  transform: translateY(0);
  opacity: 1;
}
#mnav a {
  font-size: 1rem;
  font-weight: 500;
  color: var(--mt);
  padding: 12px 0;
  border-bottom: 1px solid var(--br);
  transition: color .2s;
}
#mnav a:hover { color: var(--tx); }

@media (max-width: 640px) {
  .nav-ul { display: none; }
  .ham    { display: flex; }
}
</style>
