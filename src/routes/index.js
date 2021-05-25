import CoreLayout from '../layouts/pageLayout/PageLayout'
import Home from './home'

import Channels from './channels'
import ChannelsManaging from './channelsManaging'
import SignUp from './signUp'

import {
     EMPTY_PAGE_PATH,
     VIEW_CHANNELS_MANAGING_PAGE_PATH,
     VIEW_CHANNELS_PAGE_PATH
} from "../properties/properties";

export const createRoutes = (store) => ({
        childRoutes: [
            {
                path: EMPTY_PAGE_PATH,
                component: CoreLayout,
                indexRoute: Home,
                childRoutes: []
            },

            {
                path        : VIEW_CHANNELS_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : Channels,
                childRoutes : [
                ]
            },

            {
                path        : VIEW_CHANNELS_MANAGING_PAGE_PATH,
                component   : CoreLayout,
                indexRoute  : ChannelsManaging,
                childRoutes : [
                ]
            },

            {
                path        : '/signUp',
                component   : CoreLayout,
                indexRoute  : SignUp,
                childRoutes : [
                ]
            },
        ]
    }
);

export default createRoutes
