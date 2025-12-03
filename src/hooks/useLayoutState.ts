import { ref } from 'vue'

const isSidebarCollapsed = ref(false)
export const useLayoutState = () => {
  return { isSidebarCollapsed }
}
