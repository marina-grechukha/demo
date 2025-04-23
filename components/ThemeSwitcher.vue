<script setup lang="ts">
const [isLightTheme, toggleTheme] = useToggle(false)

</script>

<template>
  <div
    class="flex w-full items-center gap-2 whitespace-nowrap px-4 py-3 cursor-pointer text-stone-900"
    @click="toggleTheme()"
  >
    <Icon
      :name="isLightTheme ? 'mingcute:sun-line' : 'mingcute:moon-line'"
      class="size-6"
    />
    {{ isLightTheme ? 'Light' : 'Dark' }}
  </div>
</template>