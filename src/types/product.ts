export type SpecificationProps = {
  send_from: string
  products: number
  type_product: string
}

export type ColorsProps = string

export type TagsProps = string

export type SizesProps = {
  type: 'XL' | 'L' | 'M' | 'S' | number
  isReady: boolean
  stock: number
}

export interface ProductCreate {
  _id: string
  name: string
  price: number
  description?: string
  specification: SpecificationProps
  size: SizesProps[]
  colors: ColorsProps[]
  tags?: TagsProps[]
  solds: number
  favorites: number
  created_at: number
  updated_at: number
}
export interface ProductValidate {
  name: string
  price: number
  description?: string
  specification: SpecificationProps
  size: SizesProps[]
  colors: ColorsProps[]
  tags?: TagsProps[]
}
