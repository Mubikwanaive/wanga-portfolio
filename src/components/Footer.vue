<template>
  <footer class="py-12 px-6 border-t border-neutral-900 bg-neutral-950">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <!-- Logo & Copyright -->
      <div class="text-center md:text-left">
        <p class="text-xl font-bold tracking-tighter mb-2">{{ footerContent.logo }}</p>
        <p class="text-sm text-neutral-500">
          © {{ currentYear }} {{ footerContent.name }}. <br class="md:hidden" /> {{ footerContent.rightsText }}
        </p>
      </div>

      <!-- Links -->
      <div class="flex items-center gap-8">
        <a 
          v-for="social in socialLinks" 
          :key="social.label" 
          :href="social.href"
          target="_blank"
          class="text-neutral-500 hover:text-neutral-100 transition-colors"
          :aria-label="social.label"
        >
          <component :is="social.icon" class="w-5 h-5" />
        </a>
      </div>

      <!-- Built with -->
      <div class="text-sm text-neutral-500 text-center md:text-right">
        Built with <span class="text-neutral-300">Vue 3</span>, <span class="text-neutral-300">TypeScript</span> & <span class="text-neutral-300">Tailwind</span>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next'
import { footerContent, footerSocialLinks } from '../data/content.ts'

const currentYear = new Date().getFullYear()

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

const socialLinks = footerSocialLinks.map((social) => ({
  ...social,
  icon: socialIcons[social.icon],
}))
</script>
