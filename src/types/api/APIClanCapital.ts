import { APIClanDistrict } from './APIClanDistrict'

export interface APIClanCapital {
  capitalHallLevel: number,
  districts: Array<APIClanDistrict>
}
