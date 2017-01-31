import currentUser from './user/reducer';
import events from './events/reducer';
import sponsors from './sponsors/reducer';
import sidemenu from './sidemenu/reducer';
import contacts from './contacts/reducer';
import feeds from './feeds/reducer';

import { combineReducers } from "redux"

export default root = combineReducers({
  currentUser,
  events,
  sponsors,
  sidemenu,
  contacts,
  feeds
});
