import { combineReducers } from 'redux';
import logoReducer from './LogoReducer/logoRducer';
import { reducer as jPlayers } from 'react-jplayer';

export default combineReducers({
	logoReducer,
	jPlayers
});
