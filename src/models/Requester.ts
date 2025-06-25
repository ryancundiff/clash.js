import {
  fetch,
  Agent,
  RequestInit
} from 'undici'

import {
  DEV_URL,
  statusCodeMap
} from '../shared'

const dispatcher = new Agent({
  pipelining: 0
})

export class Requester {
  private token?: string
  private loggedIn = false

  constructor (
    private email: string,
    private password: string
  ) {}

  private async _get (url: string, requestInit: RequestInit) {
    const response = await fetch(url, {
      dispatcher,
      ...requestInit
    })

    const responseBody = await response.json()

    return {
      status: response.status,
      body: responseBody
    }
  }

  private async _post (url: string, requestInit: RequestInit) {
    const response = await fetch(url, {
      dispatcher,
      method: 'POST',
      ...requestInit
    })

    const responseBody = await response.json()

    return {
      status: response.status,
      headers: response.headers,
      body: responseBody 
    }
  }

  public async get (url: string): Promise<any> {
    const data = await this._get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    })

    this.handleStatus(
      data.status,

      new Set([
        200,
        403,
        404
      ])
    )

    if (data.status == 404) {
      return null
    } else if (data.status == 403) {
      await this.login()

      return await this.get(url)
    }

    return data.body
  }

  public async post (url: string, body: Record<any, any>): Promise<any> {
    const data = await this._post(url, {
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      }
    })

    this.handleStatus(
      data.status,

      new Set([
        200,
        403,
        404
      ])
    )

    if (data.status == 404) {
      return null
    } else if (data.status == 403) {
      await this.login()

      return await this.post(url, body)
    }

    return data.body
  }

  private handleStatus (status: number, expect: Set<number>) {
    if (!expect.has(status)) {
      throw new Error(`Received unexpected status code: ${status} ${statusCodeMap.get(status) ?? 'Unknown'}`)
    }
  }

  private async login () {
    const ipAddress = (await this._get('https://api.ipify.org?format=json', {
      headers: {
        'Content-Type': 'application/json'
      } // @ts-ignore
    })).body?.ip

    const cookie = (await this._post(`${DEV_URL}/login`, {
      body: JSON.stringify({
        email: this.email,
        password: this.password
      }),

      headers: {
        'Content-Type': 'application/json'
      }
    })).headers.get('Set-Cookie')!

    if (!this.loggedIn) {
      const tokens = await this.getTokens(cookie)
      const matchingToken = tokens.find((token) => token.cidrRanges.includes(ipAddress))

      this.token = matchingToken ? matchingToken.key : await this.createToken(cookie, ipAddress)

      this.loggedIn = true
    } else {
      this.token = await this.createToken(cookie, ipAddress)
    }
  }

  private async getTokens (cookie: string): Promise<Token[]> {
    const data = await this._post(`${DEV_URL}/apikey/list`, {
      headers: {
        'Content-Type': 'application/json',
        cookie
      }
    })

    return (data.body as { keys: Token[] }).keys
  }

  private async createToken (cookie: string, ipAddress: string): Promise<string> {
    const data = await this._post(`${DEV_URL}/apikey/create`, {
      body: JSON.stringify({
        cidrRanges: [ipAddress],
        name: 'Key',
        description: 'Key created by clash.js.'
      }),

      headers: {
        'Content-Type': 'application/json',
        cookie
      }
    })

    if (data.status != 200) {
      if (data.status == 403 && (data.body as { error?: string })?.error == 'too-many-keys') {
        const tokens = await this.getTokens(cookie)

        // Delete last token.
        await this.deleteToken(cookie, tokens[0].id)

        return this.createToken(cookie, ipAddress)
      }

      throw new Error('Trouble processing internal request creating token')
    }

    return (data.body as { key: { key: string } }).key.key
  }

  private async deleteToken (cookie: string, id: string) {
    const data = await this._post(`${DEV_URL}/apikey/revoke`, {
      body: JSON.stringify({
        id
      }),

      headers: {
        'Content-Type': 'application/json',
        cookie
      }
    })

    return data.status == 200
  }
}

interface Token {
  id: string,
  developerId: string,
  tier: string,
  name: string,
  description: string,
  origins: null,
  scopes: string[],
  cidrRanges: string[],
  validUntil: null,
  key: string
}
