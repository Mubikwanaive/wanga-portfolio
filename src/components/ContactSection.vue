<script setup lang="ts">
import { Mail, MapPin } from 'lucide-vue-next'
import { contactContent, contactInfoItems } from '../data/content.ts'

const contactIcons = {
  mail: Mail,
  'map-pin': MapPin,
}
</script>

<template>
  <section id="contact" class="py-24 px-6 bg-neutral-900/30">
    <div class="max-w-7xl mx-auto">
      <div class="space-y-12">
        <div>
          <h2 class="text-3xl font-bold tracking-tight mb-4">{{ contactContent.title }}</h2>
          <div class="w-12 h-1 bg-accent rounded-full mb-8"></div>
          <p class="text-neutral-400 text-lg leading-relaxed max-w-md">
            {{ contactContent.description }}
          </p>
        </div>

        <div class="space-y-6">
          <div v-for="item in contactInfoItems" :key="item.label" class="flex items-center gap-4 group">
            <div class="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-accent group-hover:border-accent/50 transition-colors">
              <component :is="contactIcons[item.icon]" class="w-5 h-5" />
            </div>
            <div>
              <p class="text-xs font-bold text-neutral-500 uppercase tracking-widest">{{ item.label }}</p>
              <p class="text-neutral-200">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
