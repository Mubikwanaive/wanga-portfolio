<script setup lang="ts">
import { Github, ExternalLink } from 'lucide-vue-next'
import { projects } from '../data/projects'
import { sectionHeadings } from '../data/content.ts'
</script>

<template>
  <section id="projects" class="py-24 px-6 bg-neutral-900/30">
    <div class="max-w-7xl mx-auto mb-16">
      <h2 class="text-3xl font-bold tracking-tight mb-4">{{ sectionHeadings.projectsTitle }}</h2>
      <div class="w-12 h-1 bg-accent rounded-full mb-8"></div>
    </div>

    <div class="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="group bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden flex flex-col hover:border-neutral-700 transition-all duration-500"
      >
        <!-- Project Image Placeholder -->
        <div class="aspect-video bg-neutral-900 relative overflow-hidden">
          <div class="absolute inset-0 flex items-center justify-center text-neutral-800 font-bold text-xl group-hover:scale-110 transition-transform duration-500">
            {{ project.title }}
          </div>
          <div class="absolute inset-0 bg-linear-to-t from-neutral-950/60 to-transparent"></div>
        </div>

        <!-- Project Info -->
        <div class="p-8 flex-1 flex flex-col">
          <h3 class="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
            {{ project.title }}
          </h3>
          <p class="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
            {{ project.description }}
          </p>

          <!-- Tech Stack -->
          <div class="flex flex-wrap gap-2 mb-8">
            <span 
              v-for="tech in project.techStack" 
              :key="tech"
              class="text-[10px] uppercase tracking-wider font-bold text-neutral-500 px-2 py-1 bg-neutral-900 rounded border border-neutral-800"
            >
              {{ tech }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-4">
            <a 
              :href="project.githubUrl" 
              target="_blank"
              class="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <Github class="w-4 h-4" /> Code
            </a>
            <a 
              v-if="project.liveUrl"
              :href="project.liveUrl" 
              target="_blank"
              class="flex items-center gap-2 text-sm font-medium text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              <ExternalLink class="w-4 h-4" /> Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
