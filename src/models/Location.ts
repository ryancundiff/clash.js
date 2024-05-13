import { APILocation } from '../types'

export class Location {
  /** Name of location. */
  public name: string

  /** ID of location. */
  public id: number

  /** Localized name of location. */
  public localizedName: string | null

  /** Country code of location, if has one. */
  public countryCode: string | null

  /** If location is a country. */
  public isCountry: boolean

  constructor (data: APILocation) {
    this.id = data.id
    this.name = data.name
    this.localizedName = data.localizedName ?? null
    this.countryCode = data.countryCode ?? null
    this.isCountry = data.isCountry
  }
}
