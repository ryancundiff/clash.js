import { Client } from './models/Client'
import { Images } from './models/Images'
import { Clans } from './models/Clans'
import { Players } from './models/Players'
import { ArmyLink } from './models/ArmyLink'

import {
  isValidTag,
  resolveTag
} from './helpers'

export default Client

export {
  Client,
  Images,
  Clans,
  Players,
  ArmyLink,
  isValidTag,
  resolveTag
}
