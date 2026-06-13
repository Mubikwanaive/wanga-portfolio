<script setup lang="ts">
import { ref } from 'vue'
import { Send, Mail, MapPin } from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))
  alert('Message sent successfully!')
  form.value = { name: '', email: '', message: '' }
  isSubmitting.value = false
}
</script>

<template>
  <section id="contact" class="py-24 px-6 bg-neutral-900/30">
    <div class="max-w-7xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Contact Info -->
        <div class="space-y-12">
          <div>
            <h2 class="text-3xl font-bold tracking-tight mb-4">Let's Connect</h2>
            <div class="w-12 h-1 bg-accent rounded-full mb-8"></div>
            <p class="text-neutral-400 text-lg leading-relaxed max-w-md">
              Whether you have a question about a project, want to discuss mechatronics, or just want to say hi, my inbox is always open.
            </p>
          </div>

          <div class="space-y-6">
            <div class="flex items-center gap-4 group">
              <div class="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-accent group-hover:border-accent/50 transition-colors">
                <Mail class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs font-bold text-neutral-500 uppercase tracking-widest">Email</p>
                <p class="text-neutral-200">contact@wanga.dev</p>
              </div>
            </div>

            <div class="flex items-center gap-4 group">
              <div class="w-12 h-12 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-accent group-hover:border-accent/50 transition-colors">
                <MapPin class="w-5 h-5" />
              </div>
              <div>
                <p class="text-xs font-bold text-neutral-500 uppercase tracking-widest">Location</p>
                <p class="text-neutral-200">South Africa</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 md:p-10">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <label for="name" class="text-sm font-medium text-neutral-400">Name</label>
              <input 
                id="name" 
                v-model="form.name"
                type="text" 
                required
                placeholder="John Doe"
                class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              />
            </div>

            <div class="space-y-2">
              <label for="email" class="text-sm font-medium text-neutral-400">Email</label>
              <input 
                id="email" 
                v-model="form.email"
                type="email" 
                required
                placeholder="john@example.com"
                class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all"
              />
            </div>

            <div class="space-y-2">
              <label for="message" class="text-sm font-medium text-neutral-400">Message</label>
              <textarea 
                id="message" 
                v-model="form.message"
                rows="4" 
                required
                placeholder="Tell me about your project..."
                class="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="w-full bg-neutral-100 text-neutral-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send v-if="!isSubmitting" class="w-4 h-4" />
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
