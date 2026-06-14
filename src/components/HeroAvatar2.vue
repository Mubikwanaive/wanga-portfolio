<template>
  <div class="relative hidden md:block animate-in fade-in zoom-in duration-1000 delay-200">
    <div class="aspect-square relative z-10 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 p-3">
      <canvas
        ref="canvasRef"
        width="520"
        height="520"
        class="w-full h-full rounded-xl bg-neutral-950"
        @mousemove="onMouseMove"
      ></canvas>

      <div class="absolute top-5 left-6 text-xs text-neutral-300 font-medium">Score: {{ score }}</div>
      <div class="absolute top-5 right-6 text-xs text-neutral-300 font-medium">Lives: {{ lives }}</div>

      <div
        v-if="gameOver"
        class="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-3 text-neutral-100"
      >
        <p class="text-xl font-bold">Game Over</p>
        <p class="text-sm text-neutral-300">Final Score: {{ score }}</p>
        <button
          type="button"
          class="text-xs px-3 py-1.5 rounded bg-neutral-100 text-neutral-900 font-medium hover:bg-neutral-200 transition-colors"
          @click="restartGame"
        >
          Restart
        </button>
      </div>
    </div>

    <div class="mt-3 flex items-center gap-2">
      <button
        type="button"
        class="text-xs px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
        @click="togglePause"
      >
        {{ paused ? 'Resume' : 'Pause' }}
      </button>
      <button
        type="button"
        class="text-xs px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-neutral-200"
        @click="restartGame"
      >
        Restart
      </button>
    </div>

    <div class="pointer-events-none absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
    <div class="pointer-events-none absolute -bottom-10 -left-10 w-64 h-64 bg-neutral-800/50 rounded-full blur-3xl -z-10"></div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)
const score = ref(0)
const lives = ref(3)
const paused = ref(false)
const gameOver = ref(false)

const CANVAS_SIZE = 520
const ROWS = 6
const COLS = 8
const BRICK_WIDTH = 54
const BRICK_HEIGHT = 18
const BRICK_PADDING = 8
const BRICK_OFFSET_TOP = 56
const BRICK_OFFSET_LEFT = 12

type Brick = {
  x: number
  y: number
  alive: boolean
}

const paddle = {
  width: 96,
  height: 12,
  x: (CANVAS_SIZE - 96) / 2,
  speed: 8,
}

const ball = {
  x: CANVAS_SIZE / 2,
  y: CANVAS_SIZE - 60,
  radius: 8,
  dx: 3,
  dy: -3,
}

const bricks: Brick[] = []
let rafId: number | null = null

function initBricks() {
  bricks.length = 0
  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      bricks.push({
        x: BRICK_OFFSET_LEFT + col * (BRICK_WIDTH + BRICK_PADDING),
        y: BRICK_OFFSET_TOP + row * (BRICK_HEIGHT + BRICK_PADDING),
        alive: true,
      })
    }
  }
}

function draw(ctx: CanvasRenderingContext2D) {
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)

  ctx.fillStyle = '#f5f5f5'
  ctx.fillRect(paddle.x, CANVAS_SIZE - 28, paddle.width, paddle.height)

  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fillStyle = '#9ca3af'
  ctx.fill()
  ctx.closePath()

  for (const brick of bricks) {
    if (!brick.alive) continue
    ctx.fillStyle = '#e5e7eb'
    ctx.fillRect(brick.x, brick.y, BRICK_WIDTH, BRICK_HEIGHT)
  }
}

function resetBall() {
  ball.x = CANVAS_SIZE / 2
  ball.y = CANVAS_SIZE - 60
  ball.dx = 3 * (Math.random() > 0.5 ? 1 : -1)
  ball.dy = -3
  paddle.x = (CANVAS_SIZE - paddle.width) / 2
}

function updatePhysics() {
  if (paused.value || gameOver.value) return

  ball.x += ball.dx
  ball.y += ball.dy

  if (ball.x + ball.radius > CANVAS_SIZE || ball.x - ball.radius < 0) ball.dx = -ball.dx
  if (ball.y - ball.radius < 0) ball.dy = -ball.dy

  const paddleTop = CANVAS_SIZE - 28
  const paddleBottom = paddleTop + paddle.height
  const paddleLeft = paddle.x
  const paddleRight = paddle.x + paddle.width

  if (
    ball.y + ball.radius >= paddleTop &&
    ball.y - ball.radius <= paddleBottom &&
    ball.x >= paddleLeft &&
    ball.x <= paddleRight &&
    ball.dy > 0
  ) {
    const hit = (ball.x - paddle.x) / paddle.width
    ball.dx = (hit - 0.5) * 8
    ball.dy = -Math.abs(ball.dy)
  }

  for (const brick of bricks) {
    if (!brick.alive) continue

    if (
      ball.x + ball.radius >= brick.x &&
      ball.x - ball.radius <= brick.x + BRICK_WIDTH &&
      ball.y + ball.radius >= brick.y &&
      ball.y - ball.radius <= brick.y + BRICK_HEIGHT
    ) {
      brick.alive = false
      score.value += 10
      ball.dy = -ball.dy
      break
    }
  }

  if (ball.y - ball.radius > CANVAS_SIZE) {
    lives.value -= 1
    if (lives.value <= 0) {
      gameOver.value = true
      return
    }
    resetBall()
  }

  if (bricks.every((brick) => !brick.alive)) {
    initBricks()
    ball.dy = -Math.abs(ball.dy)
  }
}

function gameLoop() {
  const canvas = canvasRef.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  updatePhysics()
  draw(ctx)

  if (!paused.value && !gameOver.value) {
    rafId = window.requestAnimationFrame(gameLoop)
  } else {
    rafId = null
  }
}

function onMouseMove(event: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return

  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const nextX = (event.clientX - rect.left) * scaleX - paddle.width / 2
  paddle.x = Math.max(0, Math.min(CANVAS_SIZE - paddle.width, nextX))
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    paddle.x = Math.max(0, paddle.x - paddle.speed * 2)
  } else if (event.key === 'ArrowRight') {
    paddle.x = Math.min(CANVAS_SIZE - paddle.width, paddle.x + paddle.speed * 2)
  } else if (event.key === ' ') {
    event.preventDefault()
    togglePause()
  }
}

function restartGame() {
  score.value = 0
  lives.value = 3
  gameOver.value = false
  paused.value = false
  initBricks()
  resetBall()

  if (rafId === null) {
    rafId = window.requestAnimationFrame(gameLoop)
  }
}

function togglePause() {
  if (gameOver.value) return
  paused.value = !paused.value

  if (paused.value) {
    if (rafId !== null) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
    return
  }

  if (rafId === null) {
    rafId = window.requestAnimationFrame(gameLoop)
  }
}

onMounted(() => {
  initBricks()
  resetBall()
  window.addEventListener('keydown', onKeyDown)
  rafId = window.requestAnimationFrame(gameLoop)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  if (rafId !== null) window.cancelAnimationFrame(rafId)
})
</script>