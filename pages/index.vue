<script setup lang="ts">
const [isUserMenuShown, UserMenuToggle] = useToggle(false)

const UserMenuItems: UserMenuEntry[] = [
  {
    type: 'item',
    name: 'profile',
    icon: 'mingcute:profile-line',
    title: 'Profile',
    to: '/profile',
  },
  {
    type: 'item',
    name: 'settings',
    icon: 'mingcute:settings-6-line',
    title: 'Settings',
    to: '/settings',
  },
  {
    type: 'slot',
  },
  {
    type: 'item',
    name: 'sign-out',
    icon: 'mingcute:exit-door-line',
    title: 'Sign out',
  },
]

const handleUserMenuClick = (item: UserMenuItem) => {
  if (item.name === 'sign-out') alert('sign out')
}
</script>

<template>
  <nav class="w-full bg-white shadow flex items-center px-6 h-16">
    <div class="flex-1">
      <h1 class="text-xl font-bold">My App</h1>
    </div>

    <div class="relative">
      <button
        class="p-2 rounded-xl size-10 cursor-pointer hover:bg-stone-100 focus:outline-none"
        @click="UserMenuToggle()"
      >
        <Icon
          name="mingcute:user-3-line"
          class="size-8 text-stone-700"
        />
      </button>

      <UserMenu
        v-model:show="isUserMenuShown"
        class="absolute right-0 mt-2 w-48"
        :items="UserMenuItems"
        @click="handleUserMenuClick"
      >
        <template #header>
          <p class="font-semibold">username</p>
        </template>

        <template #slot>
          <ThemeSwitcher class="px-4 py-3" />
        </template>
      </UserMenu>
    </div>
  </nav>
</template>
