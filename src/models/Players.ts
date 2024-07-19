import EventEmitter from 'events'
import { Client } from './Client'
import { Player } from './Player'

export class Players extends EventEmitter {
  private interval: NodeJS.Timeout | null = null
  private tags: string[] = []
  private players: Player[] = []
  private events: PlayerEvent[] = []

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
        let players = await Promise.all(this.tags.map(tag => this.client.getPlayer(tag))) as Player[]
        players = players.filter(player => player !== null)

        if (this.players.length === 0) {
          this.players = players
        } else {
          for (let i = 0; i < players.length; i++) {
            const newPlayer = players[i]
            const oldPlayer = this.players.find(player => player.tag === newPlayer.tag)

            if (oldPlayer) {
              for (const event of this.events) {
                if (event.callback(oldPlayer, newPlayer)) {
                  this.emit(event.name, oldPlayer, newPlayer)
                  this.players[i] = newPlayer
                }
              }
            } else {
              this.players.push(newPlayer)
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
   * Add a player tag to the poller.
   * @param tag Tag of player.
  */
  public add (...playerTags: string[]) {
    this.tags.push(...playerTags)

    return this
  }

  /**
   * Remove a player tag from the poller.
   * @param tag Tag of player.
  */
  public remove (...playerTags: string[]) {
    this.tags = this.tags.filter(tag => !playerTags.includes(tag))

    return this
  }

  /**
   * Add an event to the poller.
   * @param name Name of event.
   * @param callback Callback for event.
  */
  public set (name: string, callback: PlayerCallback) {
    this.events.push({ name, callback })

    return this
  }
}

interface PlayerEvent {
  name: string,
  callback: PlayerCallback
}

type PlayerCallback = (oldPlayer: Player, newPlayer: Player) => boolean
