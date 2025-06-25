import { District } from './District'

import { getWithNameFromSet } from '../helpers'
import { districtNameSet } from '../shared'

import {
  APIClanCapital,
  CapitalHallLevel,
  DistrictName
} from '../types'

export class Capital {
  /** Level of capital hall. */
  public readonly level: CapitalHallLevel

  /** Array of districts in capital, if any. */
  public readonly districts: Array<District> | null

  constructor (data: APIClanCapital) {
    this.level = data.capitalHallLevel as CapitalHallLevel
    this.districts = getWithNameFromSet(data.districts, districtNameSet)?.map(data => new District(data)) ?? null
  }

  /**
   * Check if capital has a specific district unlocked.
   * @param districtName Name of district.
  */
  public hasDistrict (districtName: DistrictName) {
    if (this.districts) {
      for (const district of this.districts) {
        if (district.name == districtName) {
          return true
        }
      }
    }

    return false
  }

  /**
   * Get district of given name from capital, if unlocked.
   * @param troopName Name of district.
  */
  public getDistrict (districtName: DistrictName) {
    if (this.districts) {
      for (const district of this.districts) {
        if (district.name == districtName) {
          return district
        }
      }
    }

    return null
  }
}
