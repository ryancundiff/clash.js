import {
  achievementMap,
  villageMap
} from '../shared'

import {
  AchievementName,
  APIPlayerAchievementProgress,
  Village
} from '../types'

export class Achievement {
    /** Name of achievement. */
    public readonly name: AchievementName

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
        
        this.name = achievementMap.has(data.name)
          ? achievementMap.get(data.name) as AchievementName
          : data.name as AchievementName

        this.target = data.target
        this.info = data.info
        this.completion = data.completionInfo
        
        this.village = villageMap.has(data.village)
          ? villageMap.get(data.village) as Village
          : data.village as Village
    }
}
