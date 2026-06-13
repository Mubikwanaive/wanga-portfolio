<script setup lang="ts">
const experiences = [
  {
    period: '2023 - Present',
    role: 'Software Developer',
    company: 'Innovation Hub',
    description: 'Developing and maintaining web applications using Vue 3 and Node.js. Implementing mechatronic monitoring systems for industrial automation.'
  },
  {
    period: '2021 - 2023',
    role: 'Graduate Mechatronics Engineer',
    company: 'Engineering Solutions Ltd',
    description: 'Designed and implemented control systems for automated manufacturing lines. Focused on efficiency and error reduction in PLC programming.'
  },
  {
    period: '2017 - 2021',
    role: 'Engineering Student',
    company: 'University of Technology',
    description: 'Completed a Bachelor of Science in Mechatronics Engineering. Specialized in Robotics and Embedded Systems.'
  }
]
</script>

<template>
  <section id="experience" class="py-24 px-6">
    <div class="max-w-7xl mx-auto">
      <div class="mb-16">
        <h2 class="text-3xl font-bold tracking-tight mb-4">Experience</h2>
        <div class="w-12 h-1 bg-accent rounded-full mb-8"></div>
      </div>

      <div class="space-y-12">
        <div 
          v-for="(exp, index) in experiences" 
          :key="index"
          class="relative pl-8 border-l border-neutral-800 pb-12 last:pb-0"
        >
          <!-- Timeline dot -->
          <div class="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-accent rounded-full border-2 border-neutral-950"></div>
          
          <div class="grid md:grid-cols-12 gap-4">
            <div class="md:col-span-3">
              <span class="text-sm font-bold text-neutral-500 uppercase tracking-wider">{{ exp.period }}</span>
            </div>
            <div class="md:col-span-9">
              <h3 class="text-xl font-bold text-neutral-100 mb-1">{{ exp.role }}</h3>
              <p class="text-accent font-medium mb-4">{{ exp.company }}</p>
              <p class="text-neutral-400 leading-relaxed max-w-3xl">
                {{ exp.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
