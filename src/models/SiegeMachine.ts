import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  SiegeMachineName,
  Village
} from '../types'

export class SiegeMachine {
  /** Name of siege machine. */
  public name: SiegeMachineName

  /** Level of siege machine. */
  public level: number

  /** Max level of siege machine. */
  public maxLevel: number

  /** If level of siege machine is max level. */
  public isMaxLevel: boolean

  /** Which village siege machine belongs to. */
  public village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as SiegeMachineName
    this.level = data.level
    this.maxLevel = data.maxLevel
    this.isMaxLevel = data.level == data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }
}
