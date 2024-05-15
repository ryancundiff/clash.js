import { APIClanWarAttack } from './APIClanWarAttack'

export interface APIClanWarMember {
  tag: string,
  name: string,
  mapPosition: number,
  townhallLevel: number,
  opponentAttacks: number,
  bestOpponentAttack: APIClanWarAttack,
  attacks: Array<APIClanWarAttack>
}
