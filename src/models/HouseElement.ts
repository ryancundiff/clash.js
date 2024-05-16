import {
  APIPlayerHouseElement,
  HouseElementType
} from '../types'

export class HouseElement {
  /** ID of house element. */
  public id: number

  /** Type of house element. */
  public type: HouseElementType

  constructor (data: APIPlayerHouseElement) {
    this.id = data.id
    this.type = data.type
  }
}
