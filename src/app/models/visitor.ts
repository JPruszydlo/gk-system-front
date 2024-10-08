export type Localisation = {
  IPv4: string
  city: string
  country_code: string
  country_name: string
  latitude: number
  longitude: number
  postal: string
  state: string
}
export type Visitor = {
  fingerprint: string
  localisation: Localisation | undefined
}
