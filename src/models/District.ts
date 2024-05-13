import {
  APIClanDistrict,
  DistrictName
} from '../types'

export class District {
  /** Name of district. */
  public name: DistrictName

  /** ID of district. */
  public id: number

  /** Level of district hall. */
  public level: number
  
  constructor (data: APIClanDistrict) {
    this.name = data.name as DistrictName
    this.id = data.id
    this.level = data.districtHallLevel
  }
}
