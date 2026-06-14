<template>
  <section class="min-h-screen flex flex-col justify-center pt-20 px-6">
    <div class="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
      
      <!-- Content -->
      <div class="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
        <div class="space-y-4">
          <h2 class="text-accent font-medium tracking-wide uppercase text-sm">{{ heroContent.badge }}</h2>
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight">
            {{ heroContent.firstName }} <br />
            <span class="text-neutral-500">{{ heroContent.lastName }}</span>
          </h1>
          <p class="text-xl text-neutral-400 max-w-lg leading-relaxed">
            {{ heroContent.descriptionLineOne }} <br />
            {{ heroContent.descriptionLineTwo }}
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4">
          <a
            :href="heroContent.projectsCtaHref"
            class="px-8 py-3 bg-neutral-100 text-neutral-900 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-200 transition-colors"
          >
            {{ heroContent.projectsCtaLabel }} <ArrowRight class="w-4 h-4" />
          </a>
          <a
            :href="heroContent.cvCtaHref"
            target="_blank"
            class="px-8 py-3 bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-800 transition-colors"
          >
            {{ heroContent.cvCtaLabel }} <Download class="w-4 h-4" />
          </a>
        </div>

        <!-- Social Links -->
        <div class="flex items-center gap-6 pt-4">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            target="_blank"
            class="text-neutral-500 hover:text-neutral-100 transition-colors"
            :aria-label="social.label"
          >
            <component :is="social.icon" class="w-6 h-6" />
          </a>
        </div>
      </div>

      <HeroAvatar />
    </div>
  </section>
</template>
<script setup lang="ts">
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-vue-next'
import { heroContent, heroSocialLinks } from '../data/content.ts'
import HeroAvatar from './HeroAvatar.vue'

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

const socialLinks = heroSocialLinks.map((social) => ({
  ...social,
  icon: socialIcons[social.icon],
}))
</script>
