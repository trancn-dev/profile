<script setup lang="ts">
const formRef = ref<HTMLFormElement | null>(null)
type State = 'idle' | 'sending' | 'sent'
const state = ref<State>('idle')

const btnLabel = computed(() =>
  state.value === 'sending' ? 'Đang gửi...'
  : state.value === 'sent'  ? '✓ Đã gửi!'
  : 'Gửi tin nhắn →',
)
const btnStyle = computed(() =>
  state.value === 'sent' ? 'background:#22c55e' : '',
)

function handleSubmit() {
  state.value = 'sending'
  setTimeout(() => {
    state.value = 'sent'
    formRef.value?.reset()
    setTimeout(() => { state.value = 'idle' }, 3000)
  }, 1200)
}
</script>

<template>
  <section id="contact" class="sec">
    <div class="ct-in">
      <div class="ct-hd">
        <div class="eye rv">Liên hệ</div>
        <h2 class="h2 rv d1">Hãy <span class="acc">kết nối</span> với mình</h2>
        <p class="sub rv d2" style="margin:12px auto 0;text-align:center">
          Có ý tưởng thú vị hay cần tư vấn về backend? Hộp thư luôn mở!
        </p>
      </div>
      <div class="ct-g">
        <!-- Info cards -->
        <div class="ci-list">
          <div class="cic rv d1">
            <div class="cci">📧</div>
            <div><div class="ccl">Email</div><div class="ccv">trancn.dev@gmail.com</div></div>
          </div>
          <div class="cic rv d2">
            <div class="cci">📍</div>
            <div><div class="ccl">Location</div><div class="ccv">Vietnam 🇻🇳</div></div>
          </div>
          <div class="cic rv d3">
            <div class="cci">⏰</div>
            <div><div class="ccl">Availability</div><div class="ccv">Freelance / Full-time</div></div>
          </div>
          <div class="socs rv d4">
            <a href="https://github.com/" class="sob" title="GitHub" target="_blank" rel="noopener">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/" class="sob" title="LinkedIn" target="_blank" rel="noopener">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>
            <a href="mailto:trancn.dev@gmail.com" class="sob" title="Email">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Form -->
        <form ref="formRef" class="cf rvr d2" novalidate @submit.prevent="handleSubmit">
          <div>
            <label>Tên của bạn</label>
            <input type="text" placeholder="Nguyễn Văn A" required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" placeholder="email@example.com" required />
          </div>
          <div>
            <label>Tin nhắn</label>
            <textarea rows="5" placeholder="Mình có thể giúp gì cho bạn?" required />
          </div>
          <button type="submit" class="cfsub" :disabled="state !== 'idle'" :style="btnStyle">
            {{ btnLabel }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ct-in  { max-width: 880px; margin: 0 auto; }
.ct-hd  { text-align: center; margin-bottom: 56px; }
.ct-hd :deep(.eye) { justify-content: center; }
.ct-g   { display: grid; grid-template-columns: 1fr 1.3fr; gap: 50px; }
.ci-list{ display: flex; flex-direction: column; gap: 14px; }
.cic {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--cd);
  border: 1px solid var(--br);
  border-radius: 14px;
  padding: 18px;
  transition: border-color .2s;
}
.cic:hover { border-color: var(--bro); }
.cci {
  width: 42px; height: 42px;
  flex-shrink: 0;
  background: rgba(255,107,43,.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
}
.ccl { font-family: var(--fmo); font-size: .68rem; text-transform: uppercase; letter-spacing: .1em; color: var(--mt); margin-bottom: 3px; }
.ccv { font-weight: 500; font-size: .9rem; }
.socs { display: flex; gap: 10px; margin-top: 8px; }
.sob {
  width: 40px; height: 40px;
  background: var(--cd);
  border: 1px solid var(--br);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mt);
  transition: color .2s, border-color .2s, background .2s;
  cursor: pointer;
}
.sob:hover { color: var(--p); border-color: var(--bro); background: rgba(255,107,43,.07); }
.cf {
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: var(--cd);
  border: 1px solid var(--br);
  border-radius: 20px;
  padding: 32px;
}
.cf label {
  display: block;
  margin-bottom: 5px;
  font-family: var(--fmo);
  font-size: .7rem;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: var(--mt);
}
.cf input,
.cf textarea {
  width: 100%;
  background: var(--sf);
  border: 1px solid var(--br);
  border-radius: 10px;
  padding: 11px 14px;
  color: var(--tx);
  font-family: var(--fm);
  font-size: .9rem;
  outline: none;
  resize: none;
  transition: border-color .2s;
}
.cf input:focus,
.cf textarea:focus { border-color: rgba(255,107,43,.38); }
.cf input::placeholder,
.cf textarea::placeholder { color: var(--mt); opacity: .55; }
.cfsub {
  width: 100%;
  background: var(--p);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 13px;
  font-family: var(--fm);
  font-size: .9rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 4px;
  transition: box-shadow .2s, transform .2s, background .3s;
}
.cfsub:hover:not(:disabled) { box-shadow: 0 0 28px var(--glow); transform: translateY(-2px); }
.cfsub:disabled { opacity: .7; cursor: not-allowed; }

@media (max-width: 900px) {
  .ct-g { grid-template-columns: 1fr; gap: 36px; }
}
</style>
