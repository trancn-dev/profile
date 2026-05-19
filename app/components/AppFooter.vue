<template>
  <footer>
    <div class="ftb">
      <span class="o">&lt;</span>trancn<span class="o">/&gt;</span>
      <span class="desc">— Backend Developer</span>
    </div>
    <div class="ftn">Built with PHP &amp; ❤️ · © 2026</div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--sf);
  border-top: 1px solid var(--br);
  padding: 28px var(--px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.ftb  { font-family: var(--fmo); font-weight: 700; font-size: .9rem; }
.ftb .o    { color: var(--p); }
.ftb .desc { color: var(--mt); font-weight: 400; margin-left: 8px; }
.ftn  { font-size: .78rem; color: var(--mt); }

@media (max-width: 900px) {
  footer { justify-content: center; text-align: center; }
}
</style>
