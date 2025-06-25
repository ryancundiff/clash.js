import { Client } from './models/Client'
import { Images } from './models/Images'
import { Clans } from './models/Clans'
import { Players } from './models/Players'

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
  isValidTag,
  resolveTag
}
