type NameProps = {
  first: string
  last: string
}

type RoleProps = 'BASIC' | 'VIP' | 'VVIP' | 'ADMIN'

export interface Register {
  _id: string
  email: string
  name: NameProps
  password: string
  role: RoleProps
  create_at: number
  update_at: number
}
export interface RegisterValidate {
  email: string
  name: NameProps
  password: string
  role: RoleProps
}
