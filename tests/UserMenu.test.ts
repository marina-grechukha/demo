import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import UserMenu from '@/components/UserMenu.vue'

describe('UserMenu.vue', () => {
  const items: UserMenuEntry[] = [
    {
      type: 'item',
      title: 'Profile',
      name: 'profile',
      icon: 'user-icon',
      to: '/profile',
    },
    {
      type: 'slot',
      name: 'custom-slot',
    },
    {
      type: 'item',
      title: 'Sign out',
      name: 'sign-out',
      icon: 'sign-out-icon',
    },
  ]

  it('renders menu items when show is true', async () => {
    const wrapper = await mountSuspended(UserMenu, {
      props: {
        items,
        show: true,
      },
    })

    expect(wrapper.text()).toContain('Profile')
    expect(wrapper.text()).toContain('Sign out')
  })

  it('is not rendered when show is false', async () => {
    const wrapper = await mountSuspended(UserMenu, {
      props: {
        items,
        show: false,
      },
    })

    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('closes when menu item is clicked', async () => {
    const wrapper = await mountSuspended(UserMenu, {
      props: {
        items,
        show: true,
      },
    })

    await wrapper.find('a').trigger('click')

    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('update:show')).toBeTruthy()
    expect(wrapper.emitted('update:show')![0][0]).toBe(false)

    await wrapper.setProps({ show: false })

    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('renders the header slot with divider', async () => {
    const wrapper = await mountSuspended(UserMenu, {
      props: {
        items,
        show: true,
      },
      slots: {
        header: () => h('p', 'Test Header'),
      },
    })

    expect(wrapper.find('p').text()).toBe('Test Header')
    expect(wrapper.find('hr').exists()).toBe(true)
  })

  it('renders a slot with provided name', async () => {
    const wrapper = await mountSuspended(UserMenu, {
      props: {
        items,
        show: true,
      },
      slots: {
        'custom-slot': () => h('div', 'Some Content'),
      },
    })

    expect(Object.keys(wrapper.vm.$slots)).toContain('custom-slot')
    expect(wrapper.find('div').text()).toBe('Some Content')
  })

  it('renders nothing when items list is empty', async () => {
    const wrapper = await mountSuspended(UserMenu, {
      props: {
        items: [],
        show: true,
      },
    })

    expect(wrapper.find('ul').exists()).toBe(false)
  })
})
