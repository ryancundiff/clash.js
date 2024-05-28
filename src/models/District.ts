import {
  APIClanDistrict,
  DistrictName
} from '../types'

export class District {
  /** Name of district. */
  public readonly name: DistrictName

  /** ID of district. */
  public readonly id: number

  /** Level of district hall. */
  public readonly level: number
  
  constructor (data: APIClanDistrict) {
    this.name = data.name as DistrictName
    this.id = data.id
    this.level = data.districtHallLevel
  }
}
