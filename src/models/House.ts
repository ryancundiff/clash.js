import { HouseElement } from './HouseElement'

import {
  APIPlayerHouse,
  HouseElementType
} from '../types'

export class House {
  /** Array of house elements. */
  public elements: Array<HouseElement>

  constructor (data: APIPlayerHouse) {
    this.elements = data.elements.map(data => new HouseElement(data))
  }

  /**
   * Check if house has element of given type.
   * @param elementType Type of element.
  */
  public hasElement (elementType: HouseElementType) {
    return this.elements.some(element => element.type == elementType)
  }

  /**
   * Get element of given type, if exists.
   * @param elementType Type of element.
  */
  public getElement (elementType: HouseElementType) {
    return this.elements.find(element => element.type == elementType) ?? null
  }
}
