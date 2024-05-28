import { villageMap } from '../shared'

import {
  APIPlayerAchievementProgress,
  Village
} from '../types'

export class Achievement {
    /** Name of achievement. */
    public readonly name: string

    /** Amount of stars earned. */
    public readonly stars: number

    /** Current value of achievement. */
    public readonly value: number

    /** Target value of achievement. */
    public readonly target: number

    /** Information about achievement. */
    public readonly info: string

    /** Information about completion of achievement. */
    public readonly completion: string

    /** Village of achievement. */
    public readonly village: Village

    constructor (data: APIPlayerAchievementProgress) {
        this.stars = data.stars
        this.value = data.value
        this.name = data.name
        this.target = data.target
        this.info = data.info
        this.completion = data.completionInfo
        
        this.village = villageMap.has(data.village)
          ? villageMap.get(data.village) as Village
          : data.village as Village
    }
}
