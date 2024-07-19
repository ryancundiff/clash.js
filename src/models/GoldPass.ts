import { resolveDate } from '../helpers'
import { APIGoldPass } from '../types'

export class GoldPass {
  /** Date of when the gold pass starts. */
  public readonly startDate: Date

  /** Date of when the gold pass ends. */
  public readonly endDate: Date

  constructor (data: APIGoldPass) {
    console.log(data)

    this.startDate = resolveDate(data.startTime)
    this.endDate = resolveDate(data.endTime)
  }
}
