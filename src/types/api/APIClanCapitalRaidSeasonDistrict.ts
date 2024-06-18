import { APIClanCapitalRaidSeasonAttack } from './APIClanCapitalRaidSeasonAttack'

export interface APIClanCapitalRaidSeasonDistrict {
  stars: number,
  name: string,
  id: number,
  destructionPercent: number,
  attackCount: number,
  totalLooted: number,
  attacks: Array<APIClanCapitalRaidSeasonAttack>,
  districtHallLevel: number
}
