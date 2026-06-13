<script setup lang="ts">
import { Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-vue-next'

const socialLinks = [
  { icon: Github, href: 'https://github.com/WangaTshikombedze', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/wangatshikombedze', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:contact@wanga.dev', label: 'Email' },
]
</script>

<template>
  <section class="min-h-screen flex flex-col justify-center pt-20 px-6">
    <div class="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
      
      <!-- Content -->
      <div class="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
        <div class="space-y-4">
          <h2 class="text-accent font-medium tracking-wide uppercase text-sm">Welcome to my portfolio</h2>
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight">
            Wanga <br />
            <span class="text-neutral-500">Tshikombedze</span>
          </h1>
          <p class="text-xl text-neutral-400 max-w-lg leading-relaxed">
            Software Developer & Mechatronics Graduate. <br />
            Building practical digital solutions with an engineering mindset.
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap gap-4">
          <a
            href="#projects"
            class="px-8 py-3 bg-neutral-100 text-neutral-900 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-200 transition-colors"
          >
            View Projects <ArrowRight class="w-4 h-4" />
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            class="px-8 py-3 bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-full font-medium flex items-center gap-2 hover:bg-neutral-800 transition-colors"
          >
            Download CV <Download class="w-4 h-4" />
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

      <!-- Hero Image / Placeholder -->
      <div class="relative hidden md:block animate-in fade-in zoom-in duration-1000 delay-200">
        <div class="aspect-square relative z-10 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group">
           <!-- Placeholder for Profile Image -->
           <div class="absolute inset-0 flex items-center justify-center text-neutral-800 text-9xl font-bold select-none group-hover:scale-105 transition-transform duration-500">
             WT
           </div>
           <!-- Optional: Add a subtle gradient overlay -->
           <div class="absolute inset-0 bg-linear-to-tr from-accent/10 to-transparent"></div>
        </div>
        <!-- Decorative blobs -->
        <div class="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
        <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-neutral-800/50 rounded-full blur-3xl -z-0"></div>
      </div>
    </div>
  </section>
</template>
