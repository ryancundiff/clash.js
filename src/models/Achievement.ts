import { villageMap } from '../shared'

import {
  APIPlayerAchievementProgress,
  Village
} from '../types'

export class Achievement {
    /** Name of achievement. */
    public name: string

    /** Amount of stars earned. */
    public stars: number

    /** Current value of achievement. */
    public value: number

    /** Target value of achievement. */
    public target: number

    /** Information about achievement. */
    public info: string

    /** Information about completion of achievement. */
    public completion: string

    /** Village of achievement. */
    public village: string

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
