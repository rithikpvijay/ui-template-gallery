import { RoutePath } from '@/types/RoutePath'

export const routeBuilder = {
  contactDetails: (id: string | number) => RoutePath.CONTACT_DETAILS.replace(':id', String(id)),
}
