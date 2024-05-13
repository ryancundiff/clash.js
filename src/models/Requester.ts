import {
  get,
  post
} from '../helpers'

import {
  DEV_URL,
  statusCodeMap
} from '../shared'

export class Requester {
  private token?: string

  constructor (
    private email: string,
    private password: string
  ) {}

  public async get (url: string): Promise<any> {
    const data = await get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`
      },

      
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
      await this.handleToken()

      return await this.get(url)
    }

    return data.body
  }

  // Private interface:
  private handleStatus (status: number, expect: Set<number>) {
    if (!expect.has(status)) {
      throw new Error(`Received unexpected status code: ${status} ${statusCodeMap.get(status) ?? 'Unknown'}`)
    }
  }

  private async handleToken () {
    const ipAddress = (await get('https://api.ipify.org?format=json', {
      headers: {
        'Content-Type': 'application/json'
      }
    })).body?.ip

    const cookie = (await post(`${DEV_URL}/login`, {
      body: JSON.stringify({
        email: this.email,
        password: this.password
      }),

      headers: {
        'Content-Type': 'application/json'
      }
    })).headers.get('Set-Cookie')!

    this.token = await this.createToken(cookie, ipAddress)
  }

  private async getTokens (cookie: string) {
    const data = await post(`${DEV_URL}/apikey/list`, {
      headers: {
        'Content-Type': 'application/json',
        cookie
      }
    })

    return data.body.keys
  }

  private async createToken (cookie: string, ipAddress: string): Promise<string> {
    const data = await post(`${DEV_URL}/apikey/create`, {
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
      if (data.status == 403 && data.body?.error == 'too-many-keys') {
        const tokens = await this.getTokens(cookie)

        // Delete last token.
        this.deleteToken(cookie, tokens[0].id)

        return this.createToken(cookie, ipAddress)
      }

      throw new Error('Trouble processing internal request creating token')
    }

    return data.body.key.key
  }

  private async deleteToken (cookie: string, id: string) {
    const data = await post(`${DEV_URL}/apikey/revoke`, {
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
