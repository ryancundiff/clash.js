import {
  APICapitalLeague,
  CapitalLeagueName
} from '../types'

export class CapitalLeague {
  /** Name of capital league. */
  public readonly name: CapitalLeagueName

  /** ID of capital league. */
  public readonly id: number

  constructor (data: APICapitalLeague) {
    this.name = data.name as CapitalLeagueName
    this.id = data.id
  }
}
