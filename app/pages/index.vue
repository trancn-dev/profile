<script setup lang="ts">
useScrollReveal()
</script>

<template>
  <div>
    <AppPreloader />
    <div id="pgbar" />
    <AppHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
  </div>
</template>
