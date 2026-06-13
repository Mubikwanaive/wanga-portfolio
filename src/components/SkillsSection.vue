<script setup lang="ts">
import { skillCategories } from '../data/skills'
</script>

<template>
  <section id="skills" class="py-24 px-6">
    <div class="max-w-7xl mx-auto text-center mb-16">
      <h2 class="text-3xl font-bold tracking-tight mb-4">Technical Skills</h2>
      <div class="w-12 h-1 bg-accent rounded-full mx-auto mb-8"></div>
      <p class="text-neutral-400 max-w-2xl mx-auto">
        A diverse toolkit ranging from high-level frontend frameworks to low-level engineering and assembly.
      </p>
    </div>

    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      <div 
        v-for="category in skillCategories" 
        :key="category.title"
        class="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 hover:border-accent/50 transition-colors duration-500 group"
      >
        <h3 class="text-xl font-bold mb-6 text-neutral-100 group-hover:text-accent transition-colors">
          {{ category.title }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <span 
            v-for="skill in category.skills" 
            :key="skill.name"
            class="px-4 py-2 bg-neutral-950 border border-neutral-800 rounded-full text-sm text-neutral-400 hover:text-neutral-100 hover:border-neutral-700 transition-all cursor-default"
          >
            {{ skill.name }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
