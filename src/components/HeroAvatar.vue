<template>
  <div class="relative hidden md:block animate-in fade-in zoom-in duration-1000 delay-200">
    <div class="aspect-square relative z-10 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group">
      <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" aria-hidden="true"></canvas>

      <img
        v-if="showImageFallback"
        :src="imageSrc"
        :alt="imageAlt"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        v-else-if="showInitialsFallback"
        class="absolute inset-0 flex items-center justify-center text-neutral-800 text-9xl font-bold select-none"
      >
        WT
      </div>

      <div class="absolute inset-0 bg-linear-to-tr from-accent/10 to-transparent pointer-events-none"></div>
    </div>

    <div class="mt-3 flex items-center gap-2">
      <label class="text-xs text-neutral-400" for="hero-avatar-animation">Motion</label>
      <select
        id="hero-avatar-animation"
        class="text-xs px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
        :value="busyId ?? activeId"
        :disabled="isBusy"
        @change="onSelectAnimation"
      >
        <option v-for="option in animationOptions" :key="option.id" :value="option.id">
          {{ option.label }}
        </option>
      </select>
      <button
        type="button"
        class="text-xs px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 disabled:opacity-50"
        :disabled="busyId === null"
        @click="stopAnimation"
      >
        Stop
      </button>
      <button
        type="button"
        class="text-xs px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
        @click="autoAnimationsEnabled = !autoAnimationsEnabled"
      >
        Auto: {{ autoAnimationsEnabled ? 'On' : 'Off' }}
      </button>
    </div>

    <div class="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0"></div>
    <div class="absolute -bottom-10 -left-10 w-64 h-64 bg-neutral-800/50 rounded-full blur-3xl -z-0"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

const props = withDefaults(
  defineProps<{
    imageSrc?: string
    imageAlt?: string
  }>(),
  {
    imageSrc: '',
    imageAlt: 'Hero avatar',
  },
)

type AnimationId =
  | 'idle'
  | 'watch'
  | 'dance'
  | 'dance2'
  | 'backflip'
  | 'fighting'
  | 'kungfu'
  | 'sideflip'
  | 'landing'

type AnimationOption = {
  id: AnimationId
  label: string
  file?: string
}

const PREFERRED_MODEL_URL = `${import.meta.env.BASE_URL}models/wanga-avatar-idle.glb`
const FALLBACK_MODEL_URL = `${import.meta.env.BASE_URL}models/wanga-avatar.glb`
const MODEL_BASE_URL = `${import.meta.env.BASE_URL}models/`
const AUTO_ANIMATION_DELAY_MS = 30_000

const animationOptions: AnimationOption[] = [
  { id: 'idle', label: 'Idle' },
  { id: 'watch', label: 'Watch', file: 'wanga-avatar-looking-at-watch.glb' },
  { id: 'dance', label: 'Dance', file: 'wanga-avatar-dance.glb' },
  { id: 'dance2', label: 'Dance 2', file: 'wanga-avatar-dance-2.glb' },
  { id: 'backflip', label: 'Backflip', file: 'wanga-avatar-backflip.glb' },
  { id: 'fighting', label: 'Fighting', file: 'wanga-avatar-fighting.glb' },
  { id: 'kungfu', label: 'Kungfu', file: 'wanga-avatar-kungfu-pose.glb' },
  { id: 'sideflip', label: 'Side Flip', file: 'wanga-avatar-side-flip.glb' },
  { id: 'landing', label: 'Landing', file: 'wanga-avatar-superman-landing.glb' },
]

const randomAnimationIds: Exclude<AnimationId, 'idle'>[] = [
  'watch',
  'dance',
  'dance2',
  'backflip',
  'fighting',
  'kungfu',
  'sideflip',
  'landing',
]

const canvasRef = ref<HTMLCanvasElement | null>(null)
const activeId = ref<AnimationId>('idle')
const busyId = ref<AnimationId | null>(null)
const autoAnimationsEnabled = ref(true)
const isBusy = computed(() => busyId.value !== null)
const showImageFallback = ref(false)
const showInitialsFallback = ref(false)

const animationClipPromises = new Map<AnimationId, Promise<THREE.AnimationClip | null>>()
const clock = new THREE.Clock()
let renderer: THREE.WebGLRenderer | null = null
let camera: THREE.PerspectiveCamera | null = null
let scene: THREE.Scene | null = null
let avatarRoot: THREE.Group | null = null
let modelScene: THREE.Object3D | null = null
let mixer: THREE.AnimationMixer | null = null
let idleAction: THREE.AnimationAction | null = null
let currentAction: THREE.AnimationAction | null = null
let rafId: number | null = null
let cleanupTimer: number | null = null
let autoTimer: number | null = null
let disposed = false
const pointer = { x: 0, y: 0 }
const onPointerMove = (event: MouseEvent) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
}
const onPointerLeave = () => {
  pointer.x = 0
  pointer.y = 0
}

function keepAvatarFramed(clip: THREE.AnimationClip) {
  for (const track of clip.tracks) {
    if (track.name !== 'Hips.position' || track.ValueTypeName !== 'vector') continue
    const values = track.values
    const x = values[0] ?? 0
    const z = values[2] ?? 0
    for (let i = 0; i < values.length; i += 3) {
      values[i] = x
      values[i + 2] = z
    }
  }
}

function findIdleClip(clips: THREE.AnimationClip[]) {
  if (clips.length === 0) return null
  for (const pattern of [/idle/i, /stand/i, /breath/i, /neutral/i, /default/i]) {
    const match = clips.find((clip) => pattern.test(clip.name))
    if (match) return match
  }
  return clips[0]
}

function loadAnimationClip(option: AnimationOption) {
  if (!option.file) return Promise.resolve<THREE.AnimationClip | null>(null)
  const cached = animationClipPromises.get(option.id)
  if (cached) return cached

  const loader = new GLTFLoader()
  const promise = loader
    .loadAsync(`${MODEL_BASE_URL}${option.file}`)
    .then((gltf: GLTF) => {
      const source = gltf.animations[0]
      if (!source) return null
      const clip = source.clone()
      clip.name = option.label
      keepAvatarFramed(clip)
      clip.optimize()
      return clip
    })
    .catch(() => null)

  animationClipPromises.set(option.id, promise)
  return promise
}

function clearCleanupTimer() {
  if (cleanupTimer !== null) {
    window.clearTimeout(cleanupTimer)
    cleanupTimer = null
  }
}

function clearAutoTimer() {
  if (autoTimer !== null) {
    window.clearTimeout(autoTimer)
    autoTimer = null
  }
}

function requestAutoAnimation() {
  clearAutoTimer()
  if (!autoAnimationsEnabled.value || busyId.value !== null || activeId.value !== 'idle') return
  autoTimer = window.setTimeout(() => {
    autoTimer = null
    const id = randomAnimationIds[Math.floor(Math.random() * randomAnimationIds.length)]
    void playAnimation(id)
  }, AUTO_ANIMATION_DELAY_MS)
}

function returnToIdle(fadeDuration = 0.4) {
  if (!mixer) return
  clearCleanupTimer()
  if (!currentAction) {
    activeId.value = 'idle'
    busyId.value = null
    requestAutoAnimation()
    return
  }

  if (idleAction) {
    idleAction.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(fadeDuration).play()
    currentAction.crossFadeTo(idleAction, fadeDuration, false)
  } else {
    currentAction.fadeOut(Math.min(fadeDuration, 0.25))
  }

  const finished = currentAction
  cleanupTimer = window.setTimeout(() => {
    finished.stop()
    if (currentAction === finished) currentAction = null
    activeId.value = 'idle'
    busyId.value = null
    requestAutoAnimation()
    cleanupTimer = null
  }, fadeDuration * 1000 + 80)
}

async function playAnimation(id: AnimationId) {
  clearAutoTimer()
  if (!mixer || !avatarRoot || !modelScene) return
  if (id === 'idle') {
    returnToIdle(0.25)
    return
  }
  if (currentAction?.isRunning()) return

  const option = animationOptions.find((item) => item.id === id)
  if (!option) return

  busyId.value = id
  activeId.value = id
  const clip = await loadAnimationClip(option)
  if (!clip || disposed) {
    returnToIdle(0.25)
    return
  }

  const action = mixer.clipAction(clip, avatarRoot)
  action.reset()
  action.enabled = true
  action.clampWhenFinished = true
  action.setLoop(THREE.LoopOnce, 1)
  action.fadeIn(0.35).play()
  idleAction?.crossFadeTo(action, 0.35, false)
  currentAction = action
}

function stopAnimation() {
  if (!busyId.value) return
  returnToIdle(0.2)
}

async function loadModel() {
  const loader = new GLTFLoader()
  let gltf
  try {
    gltf = await loader.loadAsync(PREFERRED_MODEL_URL)
  } catch {
    try {
      gltf = await loader.loadAsync(FALLBACK_MODEL_URL)
    } catch {
      showImageFallback.value = Boolean(props.imageSrc)
      showInitialsFallback.value = !showImageFallback.value
      return
    }
  }

  if (!scene || !avatarRoot || disposed) return
  modelScene = gltf.scene
  avatarRoot.add(modelScene)
  modelScene.position.set(-0.18, -1.46, 0)
  modelScene.rotation.y = THREE.MathUtils.degToRad(12)
  modelScene.scale.setScalar(1.85)

  mixer = new THREE.AnimationMixer(avatarRoot)
  const idle = findIdleClip(gltf.animations)
  if (idle && mixer) {
    idleAction = mixer.clipAction(idle, avatarRoot)
    idleAction.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play()
  }

  mixer.addEventListener('finished', (event: { action: THREE.AnimationAction }) => {
    if (event.action === currentAction) returnToIdle()
  })

  requestAutoAnimation()
}

function onSelectAnimation(event: Event) {
  const value = (event.target as HTMLSelectElement).value as AnimationId
  void playAnimation(value)
}

function resizeRenderer() {
  if (!renderer || !canvasRef.value || !camera) return
  const rect = canvasRef.value.getBoundingClientRect()
  const width = Math.max(rect.width, 1)
  const height = Math.max(rect.height, 1)
  renderer.setSize(width, height, false)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
}

function animateFrame() {
  if (!renderer || !scene || !camera || disposed) return
  const delta = Math.min(clock.getDelta(), 0.05)
  const elapsed = clock.elapsedTime

  mixer?.update(delta)
  if (avatarRoot) {
    avatarRoot.position.y = Math.sin(elapsed * 1.1) * 0.03
    avatarRoot.rotation.y = THREE.MathUtils.damp(avatarRoot.rotation.y, pointer.x * 0.04, 3, delta)
    avatarRoot.rotation.x = THREE.MathUtils.damp(avatarRoot.rotation.x, -pointer.y * 0.08, 3, delta)
  }

  renderer.render(scene, camera)
  rafId = window.requestAnimationFrame(animateFrame)
}

onMounted(async () => {
  if (!canvasRef.value) return

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(30, 1, 0.1, 20)
  camera.position.set(0, 0, 2.85)

  const ambient = new THREE.AmbientLight('#ffffff', 0.55)
  const key = new THREE.DirectionalLight('#dfe9ff', 2.1)
  key.position.set(1.5, 2.5, 2.5)
  const rimA = new THREE.DirectionalLight('#4d8af0', 1.5)
  rimA.position.set(-2.5, 1.8, -2)
  const rimB = new THREE.DirectionalLight('#2563eb', 0.9)
  rimB.position.set(2.2, 0.8, -1.6)
  const fill = new THREE.DirectionalLight('#8ab2ff', 0.3)
  fill.position.set(0, -1.5, 2.5)
  scene.add(ambient, key, rimA, rimB, fill)

  avatarRoot = new THREE.Group()
  scene.add(avatarRoot)

  window.addEventListener('mousemove', onPointerMove)
  document.documentElement.addEventListener('mouseleave', onPointerLeave)
  window.addEventListener('resize', resizeRenderer)

  await loadModel()
  resizeRenderer()
  animateFrame()
})

watch(autoAnimationsEnabled, () => {
  requestAutoAnimation()
})

onBeforeUnmount(() => {
  disposed = true
  clearCleanupTimer()
  clearAutoTimer()
  if (rafId !== null) window.cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', onPointerMove)
  document.documentElement.removeEventListener('mouseleave', onPointerLeave)
  window.removeEventListener('resize', resizeRenderer)
  currentAction?.stop()
  idleAction?.stop()
  mixer?.stopAllAction()
  scene?.clear()
  renderer?.dispose()
})
</script>