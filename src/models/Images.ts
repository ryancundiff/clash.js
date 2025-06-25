import { BuilderHallLevel, CapitalHallLevel, DistrictHallLevel, TownHallLevel } from '../types'

const townHallMap = new Map([
  [1, 'f/fd/Town_Hall1.png'],
  [2, '7/7d/Town_Hall2.png'],
  [3, 'd/dd/Town_Hall3.png'],
  [4, 'e/e7/Town_Hall4.png'],
  [5, 'a/a3/Town_Hall5.png'],
  [6, '5/52/Town_Hall6.png'],
  [7, '7/75/Town_Hall7.png'],
  [8, 'f/fa/Town_Hall8.png'],
  [9, 'e/e0/Town_Hall9.png'],
  [10, '5/5c/Town_Hall10.png'],
  [11, '9/96/Town_Hall11.png'],
  [12, 'c/c7/Town_Hall12-1.png'],
  [13, '9/98/Town_Hall13-1.png'],
  [14, 'e/e0/Town_Hall14-1.png'],
  [15, '5/5b/Town_Hall15-1.png'],
  [16, '5/53/Town_Hall16.png'],
  [17, '2/24/Town_Hall17-1.png']
])

const builderHallMap = new Map([
  [1, '1/19/Builder_Hall1.png'],
  [2, '0/03/Builder_Hall2.png'],
  [3, '3/38/Builder_Hall3.png'],
  [4, 'b/be/Builder_Hall4.png'],
  [5, '2/22/Builder_Hall5.png'],
  [6, '2/29/Builder_Hall6.png'],
  [7, '7/7f/Builder_Hall7.png'],
  [8, '0/0e/Builder_Hall8.png'],
  [9, '4/43/Builder_Hall9.png'],
  [10, '8/87/Builder_Hall10.png']
])

const capitalHallMap = new Map([
  [1, 'e/ed/Capital_Hall1.png'],
  [2, 'e/ea/Capital_Hall2.png'],
  [3, 'f/fb/Capital_Hall3.png'],
  [4, 'f/fa/Capital_Hall4.png'],
  [5, '8/86/Capital_Hall5.png'],
  [6, 'd/d2/Capital_Hall6.png'],
  [7, 'a/a5/Capital_Hall7.png'],
  [8, '1/14/Capital_Hall8.png'],
  [9, '4/46/Capital_Hall9.png'],
  [10, '2/2c/Capital_Hall10.png']
])

const districtHallMap = new Map([
  [1, 'd/dd/District_Hall1.png'],
  [2, '1/11/District_Hall2.png'],
  [3, 'c/ce/District_Hall3.png'],
  [4, '9/9c/District_Hall4.png'],
  [5, '3/32/District_Hall5.png']
])

export class Images {
  /**
   * Returns the URL of the town hall image for the given level.
   * @param level The level of the town hall.
  */
  public static getTownHall (level: TownHallLevel | null = 1) {
    return getImage(townHallMap, level)
  }

  /**
   * Returns the URL of the builder hall image for the given level.
   * @param level The level of the builder hall.
  */
  public static getBuilderHall (level: BuilderHallLevel | null = 1) {
    return getImage(builderHallMap, level)
  }

  /**
   * Returns the URL of the capital hall image for the given level.
   * @param level The level of the capital hall.
  */
  public static getCapitalHall (level: CapitalHallLevel | null = 1) {
    return getImage(capitalHallMap, level)
  }

  /**
   * Returns the URL of the district hall image for the given level.
   * @param level The level of the district hall.
  */
  public static getDistrictHall (level: DistrictHallLevel | null = 1) {
    return getImage(districtHallMap, level)
  }
}

function getImage (map: Map<number, string>, level: number | null) {
  level ??= 1

  if (map.has(level)) {
    return `https://static.wikia.nocookie.net/clashofclans/images/${map.get(level)}`
  }

  return null
}
