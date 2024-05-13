import { APILanguage } from '../types'

export class Language {
  /** Name of language. */
  public name: string

  /** ID of lanugage. */
  public id: number

  /** Language code of language. */
  public languageCode: string | null

  constructor (data: APILanguage) {
    this.id = data.id
    this.name = data.name
    this.languageCode = data.languageCode
  }
}
