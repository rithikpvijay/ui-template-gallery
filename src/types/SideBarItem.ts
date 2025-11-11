interface listItem {
  text: string
  navigateTo?: string
}

export interface SideBarItem {
  title: string
  lists: listItem[]
  icon: string
}
