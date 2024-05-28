import { APILanguage } from '../types'

export class Language {
  /** Name of language. */
  public readonly name: string

  /** ID of lanugage. */
  public readonly id: number

  /** Language code of language. */
  public readonly code: string | null

  constructor (data: APILanguage) {
    this.id = data.id
    this.name = data.name
    this.code = data.languageCode
  }
}
