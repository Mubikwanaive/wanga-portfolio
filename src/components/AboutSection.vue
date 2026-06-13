<script setup lang="ts">
import { GraduationCap, Briefcase, Cpu } from 'lucide-vue-next'
</script>

<template>
  <section id="about" class="py-24 px-6 bg-neutral-900/30">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-12 gap-12">
        <!-- Header -->
        <div class="md:col-span-4">
          <h2 class="text-3xl font-bold tracking-tight mb-4">About Me</h2>
          <div class="w-12 h-1 bg-accent rounded-full mb-8"></div>
          <p class="text-neutral-400 leading-relaxed">
            I am a Software Developer with a background in Mechatronics Engineering. This unique combination allows me to bridge the gap between complex hardware systems and elegant software solutions.
          </p>
        </div>

        <!-- Details -->
        <div class="md:col-span-8 space-y-12">
          <div class="prose prose-invert max-w-none">
            <p class="text-xl text-neutral-300 leading-relaxed">
              My journey started with a fascination for how things work, leading me to pursue a degree in Mechatronics. Along the way, I discovered my passion for software engineering—the ultimate tool for problem-solving and creation. 
            </p>
          </div>

          <!-- Highlights Grid -->
          <div class="grid sm:grid-cols-3 gap-8">
            <div class="space-y-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                <GraduationCap class="w-6 h-6" />
              </div>
              <h3 class="font-bold">Education</h3>
              <p class="text-sm text-neutral-400">
                BSc in Mechatronics Engineering. Specialized in automation and control systems.
              </p>
            </div>

            <div class="space-y-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                <Cpu class="w-6 h-6" />
              </div>
              <h3 class="font-bold">Interests</h3>
              <p class="text-sm text-neutral-400">
                Embedded systems, IoT, and high-performance web applications.
              </p>
            </div>

            <div class="space-y-4 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors">
              <div class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
                <Briefcase class="w-6 h-6" />
              </div>
              <h3 class="font-bold">Philosophy</h3>
              <p class="text-sm text-neutral-400">
                Building practical, user-centric solutions that solve real-world engineering problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
