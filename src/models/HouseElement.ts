import {
  APIPlayerHouseElement,
  HouseElementType
} from '../types'

export class HouseElement {
  /** ID of house element. */
  public readonly id: number

  /** Type of house element. */
  public readonly type: HouseElementType

  constructor (data: APIPlayerHouseElement) {
    this.id = data.id
    this.type = data.type
  }
}
