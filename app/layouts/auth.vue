<template>
  <div class="flex items-center justify-center w-full h-screen bg-akaroa-50">
    <div
      class="hidden md:block absolute inset h-full w-full bg-[url('/images/hero.jpg')] bg-cover"
    ></div>
    <div
      class="absolute inset h-full w-full bg-black/50 backdrop-blur-xs"
    ></div>
    <div
      class="relative z-10 flex flex-col gap-4 w-full md:w-auto h-full md:h-auto"
    >
      <div
        class="shadow-lg md:rounded-lg p-4 bg-white w-full h-full md:w-md overflow-hidden"
      >
        <UButton variant="ghost" size="sm" to="/" class="self-start">
          <template #leading>
            <UIcon name="i-lucide-arrow-left" class="size-5" />
          </template>
          Powrót do strony głównej
        </UButton>
        <div class="flex flex-col gap-1 items-center py-4 justify-center">
          <h1 class="text-4xl text-black">Restauracja Zodiak</h1>
          <p class="text-default">Panel Administracyjny</p>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>
