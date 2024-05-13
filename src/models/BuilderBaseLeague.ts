import { APIBuilderBaseLeague } from '../types'

export class BuilderBaseLeague {
  /** Name of builder base league. */
  public name: string

  /** ID of builder base league. */
  public id: number

  constructor (data: APIBuilderBaseLeague) {
    this.name = data.name
    this.id = data.id
  }
}
