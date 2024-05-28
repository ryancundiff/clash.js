import { villageMap } from '../shared'

import {
  APIPlayerItemLevel,
  SiegeMachineName,
  Village
} from '../types'

export class SiegeMachine {
  /** Name of siege machine. */
  public readonly name: SiegeMachineName

  /** Level of siege machine. */
  public readonly level: number

  /** Max level of siege machine. */
  public readonly maxLevel: number

  /** Which village siege machine belongs to. */
  public readonly village: Village

  constructor (data: APIPlayerItemLevel) {
    this.name = data.name as SiegeMachineName
    this.level = data.level
    this.maxLevel = data.maxLevel

    this.village = villageMap.has(data.village)
      ? villageMap.get(data.village) as Village
      : data.village as Village
  }

  /** If siege machine is max level. */
  public get isMaxLevel () {
    return this.level === this.maxLevel
  }
}
