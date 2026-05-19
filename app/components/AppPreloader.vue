<script setup lang="ts">
const visible = ref(true)

onMounted(() => {
  const hide = () => setTimeout(() => { visible.value = false }, 1500)
  if (document.readyState === 'complete') {
    hide()
  } else {
    window.addEventListener('load', hide, { once: true })
  }
})
</script>

<template>
  <div id="pre" :class="{ gone: !visible }">
    <div class="pre-logo">&lt;trancn/&gt;</div>
    <div class="pre-track">
      <div class="pre-fill" />
    </div>
  </div>
</template>

<style scoped>
#pre {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  transition: opacity .5s .1s, visibility .5s .1s;
}
#pre.gone {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}
.pre-logo {
  font-family: var(--fmo);
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--p);
  letter-spacing: .1em;
  opacity: 0;
  animation: fadeIn .4s .2s ease forwards;
}
.pre-track {
  width: 180px;
  height: 2px;
  background: var(--br);
  border-radius: 2px;
  overflow: hidden;
}
.pre-fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--p), var(--p2));
  border-radius: 2px;
  animation: loadBar 1.3s .3s cubic-bezier(.4, 0, .2, 1) forwards;
}
@keyframes loadBar { to { width: 100%; } }
</style>
