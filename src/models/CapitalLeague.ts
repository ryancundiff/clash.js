import {
  APICapitalLeague,
  CapitalLeagueName
} from '../types'

export class CapitalLeague {
  /** Name of capital league. */
  public name: CapitalLeagueName

  /** ID of capital league. */
  public id: number

  constructor (data: APICapitalLeague) {
    this.name = data.name as CapitalLeagueName
    this.id = data.id
  }
}
