<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X } from 'lucide-vue-next'

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
]

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
      isScrolled 
        ? 'bg-neutral-950/80 backdrop-blur-md border-neutral-800 py-3' 
        : 'bg-transparent border-transparent py-5'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo -->
      <a href="#" class="text-2xl font-bold tracking-tighter hover:text-accent transition-colors">
        WT
      </a>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center space-x-8">
        <a
          v-for="link in navLinks"
          :key="link.name"
          :href="link.href"
          class="text-sm font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
        >
          {{ link.name }}
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button 
        class="md:hidden p-2 text-neutral-400 hover:text-neutral-100 focus:outline-none"
        @click="toggleMobileMenu"
      >
        <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 right-0 bg-neutral-950 border-b border-neutral-800 py-6 px-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300"
    >
      <a
        v-for="link in navLinks"
        :key="link.name"
        :href="link.href"
        class="block text-lg font-medium text-neutral-400 hover:text-neutral-100 transition-colors"
        @click="isMobileMenuOpen = false"
      >
        {{ link.name }}
      </a>
    </div>
  </nav>
</template>
