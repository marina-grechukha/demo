<script setup lang="ts">
const props = defineProps<{
  items: UserMenuEntry[]
  show: boolean
}>()

const emit = defineEmits<{
  (event: 'click', item: UserMenuItem): void
  (event: 'update:show', state: boolean): void
}>()

const target = ref(null)
const closeMenu = () => emit('update:show', false)

const handleClick = (item: UserMenuItem) => {
  emit('click', item)
  closeMenu()
}

onClickOutside(target, () => setTimeout(closeMenu, 0))
</script>

<template>
  <ul
    v-if="show && props.items.length"
    ref="target"
    class="rounded-xl border shadow-md font-light p-1 bg-stone-100 border-stone-500 shadow-black/15"
  >
    <li
      v-if="$slots.header"
      class="flex cursor-default flex-col items-center justify-center whitespace-nowrap px-4 py-3 text-stone-900"
    >
      <slot name="header" />
    </li>

    <li v-if="$slots.header">
      <Divider class="my-1 w-full" />
    </li>

    <li
      v-for="(item, index) in props.items"
      :key="item.name || `slot-${index}`"
    >
      <div
        v-if="item.type === 'slot'"
        class="flex flex-col whitespace-nowrap text-stone-900 rounded-lg hover:bg-stone-300"
      >
        <slot :name="item.name || 'slot'" />
      </div>

      <NuxtLink
        v-if="item.type === 'item'"
        :to="item.to"
        class="flex w-full items-center gap-2 whitespace-nowrap px-4 py-3 cursor-pointer text-stone-900 rounded-lg hover:bg-stone-300"
        @click.stop.prevent="handleClick(item)"
      >
        <Icon
          v-if="item.icon"
          :name="item.icon"
          class="size-6"
        />
        {{ item.title }}
      </NuxtLink>
    </li>
  </ul>
</template>
