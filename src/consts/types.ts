export interface TypeUser {
  firstName: string
  lastName: string
  gender: string
  email: string
  phone: string
  uuid: string
  location: TypeLocation
  picture: string
}

interface TypeLocation {
  city: string
  coordinates: {}
  country: string
  postcode: number
  state: string
  street: {}
  timezone: {}
}
