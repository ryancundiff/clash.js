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

  /** Check if house has element of given type. */
  public hasElement (type: HouseElementType) {
    return this.elements.some(element => element.type === type)
  }

  /** Get element of given type, if exists. */
  public getElement (type: HouseElementType) {
    return this.elements.find(element => element.type === type) ?? null
  }
}
