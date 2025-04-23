export { }

declare global {

  interface UserMenuItem {
    type: 'item'
    name: string
    icon: string
    title: string
    to?: string
  }

  interface UserMenuSlot {
    type: 'slot'
    name?: string
  }

  type UserMenuEntry = UserMenuItem | UserMenuSlot
}