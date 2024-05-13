export interface APIPlayerItemLevel {
  level: number,
  name: string,
  maxLevel: number,
  village: 'HOME_VILLIAGE' | 'BUILDER_BASE' | 'CLAN_CAPITAL',
  superTroopIsActive: boolean,
  equipment: Array<APIPlayerItemLevel>
}
