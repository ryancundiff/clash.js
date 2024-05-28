import { APILocation } from '../types'

export class Location {
  /** Name of location. */
  public readonly name: string

  /** ID of location. */
  public readonly id: number

  /** Localized name of location. */
  public readonly localizedName: string | null

  /** Country code of location, if has one. */
  public readonly countryCode: string | null

  /** If location is a country. */
  public readonly isCountry: boolean

  constructor (data: APILocation) {
    this.id = data.id
    this.name = data.name
    this.localizedName = data.localizedName ?? null
    this.countryCode = data.countryCode ?? null
    this.isCountry = data.isCountry
  }
}
