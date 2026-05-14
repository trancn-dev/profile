/**
 * Observe all .rv / .rvl / .rvr / .rvs elements and add .vis when they enter
 * the viewport. Called once from pages/index.vue after all children mount.
 */
export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis')
            observer!.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )
    document.querySelectorAll('.rv, .rvl, .rvr, .rvs').forEach((el) => observer!.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
