import {
  APIWarLeague,
  WarLeagueName
} from '../types'

export class WarLeague {
  /** Name of war league. */
  public name: WarLeagueName

  /** ID of war league. */
  public id: number

  constructor (data: APIWarLeague) {
    this.name = data.name as WarLeagueName
    this.id = data.id
  }
}
