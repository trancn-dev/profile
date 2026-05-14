<script setup lang="ts">
const projects = [
  {
    emoji: '🛒',
    tags:  ['Laravel', 'MySQL', 'Stripe'],
    title: 'E-Commerce Platform',
    desc:  'Nền tảng thương mại điện tử đầy đủ: quản lý sản phẩm, giỏ hàng, thanh toán Stripe và admin dashboard real-time.',
  },
  {
    emoji: '📊',
    tags:  ['Laravel', 'Redis', 'Queue'],
    title: 'Analytics Dashboard',
    desc:  'Dashboard phân tích real-time, xử lý hàng nghìn sự kiện/giây qua job queue với báo cáo tự động theo lịch.',
  },
  {
    emoji: '🔐',
    tags:  ['PHP', 'JWT', 'OAuth 2.0'],
    title: 'Auth Microservice',
    desc:  'Dịch vụ xác thực độc lập: JWT, OAuth 2.0, refresh token, phân quyền RBAC và audit log chi tiết.',
  },
]
</script>

<template>
  <section id="projects" class="sec sec-alt">
    <div class="container">
      <div class="prj-top rv">
        <div>
          <div class="eye">Portfolio</div>
          <h2 class="h2">Dự án <span class="acc">nổi bật</span></h2>
        </div>
        <a href="mailto:trancn.dev@gmail.com" class="btn bg" style="flex-shrink:0">
          Hợp tác cùng mình →
        </a>
      </div>
      <div class="prj-g">
        <div v-for="(p, i) in projects" :key="p.title" class="pc rv" :class="`d${i + 1}`">
          <div class="pt">
            <span class="pemi">{{ p.emoji }}</span>
            <div class="pov"><button class="pob">Chi tiết</button></div>
          </div>
          <div class="pb">
            <div class="ptags">
              <span v-for="tag in p.tags" :key="tag" class="ptag">{{ tag }}</span>
            </div>
            <h3 class="ptit">{{ p.title }}</h3>
            <p class="pds">{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.prj-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 46px;
}
.prj-g {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 22px;
}
.pc {
  background: var(--cd);
  border: 1px solid var(--br);
  border-radius: 22px;
  overflow: hidden;
  transition: transform .3s, box-shadow .3s, border-color .3s;
}
.pc:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 64px rgba(0,0,0,.45);
  border-color: rgba(255,107,43,.22);
}
.pt {
  height: 190px;
  background: var(--bg);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pt::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,107,43,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,107,43,.06) 1px, transparent 1px);
  background-size: 32px 32px;
}
.pemi { font-size: 3rem; position: relative; z-index: 1; filter: drop-shadow(0 0 14px var(--glow)); }
.pov {
  position: absolute;
  inset: 0;
  background: rgba(255,107,43,.07);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity .3s;
}
.pc:hover .pov { opacity: 1; }
.pob {
  background: var(--p);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 18px;
  font-weight: 600;
  font-size: .8rem;
  font-family: var(--fm);
  cursor: pointer;
  transform: translateY(8px);
  transition: transform .28s;
}
.pc:hover .pob { transform: translateY(0); }
.pb    { padding: 22px; }
.ptags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.ptag  {
  font-family: var(--fmo);
  font-size: .68rem;
  color: var(--p);
  background: rgba(255,107,43,.1);
  border: 1px solid rgba(255,107,43,.2);
  padding: 2px 10px;
  border-radius: 50px;
}
.ptit { font-weight: 600; font-size: 1.05rem; margin-bottom: 7px; }
.pds  { font-size: .83rem; color: var(--mt); line-height: 1.65; }

@media (max-width: 900px) {
  .prj-top { flex-direction: column; align-items: flex-start; gap: 16px; }
}
</style>
