import { APIBuilderBaseLeague } from '../types'

export class BuilderBaseLeague {
  /** Name of builder base league. */
  public readonly name: string

  /** ID of builder base league. */
  public readonly id: number

  constructor (data: APIBuilderBaseLeague) {
    this.name = data.name
    this.id = data.id
  }
}
