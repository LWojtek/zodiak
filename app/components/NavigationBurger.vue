<template>
  <button
    @click="open = !open"
    :class="[
      'relative z-20 ml-4 h-10 w-10 cursor-pointer overflow-hidden bg-transparent outline-none border-none text-white self-center',
      'lg:hidden',
      open && 'active',
    ]"
    aria-label="Przełącz menu"
    tabindex="0"
  >
    <svg
      viewBox="25 25 50 50"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      class="h-full w-full"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="50%" stop-color="var(--brand-green)" />
          <stop offset="100%" stop-color="var(--brand-yellow)" />
        </linearGradient>
      </defs>

      <!-- LINE 1 -->
      <path
        d="M0 38h63c10 0 4 28-2 23L34 32"
        :class="[
          'fill-none stroke-white stroke-3',
          '[stroke-linecap:round] [stroke-linejoin:round]',
          '[--length:24] [--offset:-38] [--total-length:134.64183044433594]',
          '[stroke-dasharray:var(--length)_var(--total-length)]',
          '[stroke-dashoffset:var(--offset)]',
          '[transition:all_750ms_cubic-bezier(0.645,0.045,0.355,1),stroke_300ms_ease-in-out]',
          open && '[--length:31] [--offset:-92.5] ',
        ]"
      />

      <!-- LINE 2 -->
      <path
        d="M0 50h70"
        :class="[
          'fill-none stroke-white stroke-3',
          '[stroke-linecap:round] [stroke-linejoin:round]',
          '[--length:24] [--offset:-38] [--total-length:70]',
          '[stroke-dasharray:var(--length)_var(--total-length)]',
          '[stroke-dashoffset:var(--offset)]',
          '[transition:all_750ms_cubic-bezier(0.645,0.045,0.355,1),stroke_300ms_ease-in-out]',
          open && '[--length:0] opacity-0 [--offset:-50]',
        ]"
      />

      <!-- LINE 3 -->
      <path
        d="M0 62h63c10 0 4-28-2-23L35 65"
        :class="[
          'fill-none stroke-white stroke-3',
          '[stroke-linecap:round] [stroke-linejoin:round]',
          '[--length:24] [--offset:-38] [--total-length:134.64183044433594]',
          '[stroke-dasharray:var(--length)_var(--total-length)]',
          '[stroke-dashoffset:var(--offset)]',
          '[transition:all_750ms_cubic-bezier(0.645,0.045,0.355,1),stroke_300ms_ease-in-out]',
          open && '[--length:31] [--offset:-92.5] ',
        ]"
      />
    </svg>
  </button>
</template>

<script setup>
const open = defineModel("open");
</script>
