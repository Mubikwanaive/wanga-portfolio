<script setup lang="ts">
import { GraduationCap, Briefcase, Cpu } from 'lucide-vue-next'
import { aboutContent, aboutHighlights } from '../data/content.ts'
</script>

<template>
  <section id="about" class="py-24 px-6 bg-neutral-900/30">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-12 gap-12">
        <!-- Header -->
        <div class="md:col-span-4">
          <h2 class="text-3xl font-bold tracking-tight mb-4">{{ aboutContent.title }}</h2>
          <div class="w-12 h-1 bg-accent rounded-full mb-8"></div>
          <p class="text-neutral-400 leading-relaxed">
            {{ aboutContent.summary }}
          </p>
        </div>

        <!-- Details -->
        <div class="md:col-span-8 space-y-12">
          <div class="prose prose-invert max-w-none">
            <p class="text-xl text-neutral-300 leading-relaxed">
              {{ aboutContent.journey }}
            </p>
          </div>

          <!-- Highlights Grid -->
          <div class="grid sm:grid-cols-3 gap-8">
            <div class="space-y-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                <GraduationCap class="w-6 h-6" />
              </div>
              <h3 class="font-bold">{{ aboutHighlights[0].title }}</h3>
              <p class="text-sm text-neutral-400">
                {{ aboutHighlights[0].description }}
              </p>
            </div>

            <div class="space-y-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                <Cpu class="w-6 h-6" />
              </div>
              <h3 class="font-bold">{{ aboutHighlights[1].title }}</h3>
              <p class="text-sm text-neutral-400">
                {{ aboutHighlights[1].description }}
              </p>
            </div>

            <div class="space-y-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                <Briefcase class="w-6 h-6" />
              </div>
              <h3 class="font-bold">{{ aboutHighlights[2].title }}</h3>
              <p class="text-sm text-neutral-400">
                {{ aboutHighlights[2].description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
