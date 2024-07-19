import EventEmitter from 'events'
import { Client } from './Client'
import { Clan } from './Clan'

export class Clans extends EventEmitter {
  private interval: NodeJS.Timeout | null = null
  private tags: string[] = []
  private clans: Clan[] = []
  private events: ClanEvent[] = []

  constructor (
    private client: Client,
    private timeout = 1000
  ) {
    super()

    this.start(timeout)
  }

  /**
   * Start the poller.
   * @param timeout Timeout for poller.
  */
  public start (timeout = this.timeout) {
    if (this.interval !== null) {
      clearInterval(this.interval)
    }
    
    this.interval = setInterval(async () => {
      if (this.tags.length > 0) {
        let clans = await Promise.all(this.tags.map(tag => this.client.getClan(tag))) as Clan[]
        clans = clans.filter(clan => clan !== null)

        if (this.clans.length === 0) {
          this.clans = clans
        } else {
          for (let i = 0; i < clans.length; i++) {
            const newClan = clans[i]
            const oldClan = this.clans.find(clan => clan.tag === newClan.tag)

            if (oldClan) {
              for (const event of this.events) {
                if (event.callback(oldClan, newClan)) {
                  this.emit(event.name, oldClan, newClan)
                  this.clans[i] = newClan
                }
              }
            } else {
              this.clans.push(newClan)
            }
          }
        }
      }
    }, timeout)
  }

  /** Stop the poller. */
  public stop () {
    if (this.interval !== null) {
      clearInterval(this.interval)

      this.interval = null
    }
  }

  /**
   * Add a clan tag to the poller.
   * @param tag Tag of clan.
  */
  public add (clanTag: string) {
    this.tags.push(clanTag)

    return this
  }

  /**
   * Remove a clan tag from the poller.
   * @param tag Tag of clan.
  */
  public remove (clanTag: string) {
    this.tags = this.tags.filter(tag => tag !== clanTag)

    return this
  }

  /**
   * Add an event to the poller.
   * @param name Name of event.
   * @param callback Callback for event.
  */
  public set (name: string, callback: ClanCallback) {
    this.events.push({ name, callback })

    return this
  }
} 

interface ClanEvent {
  name: string,
  callback: ClanCallback
}

type ClanCallback = (oldClan: Clan, newClan: Clan) => boolean
