import React, { Component } from 'react'
import ChannelsManagingView from './channelsManagingView/ChannelsManagingView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <ChannelsManagingView />
          <FooterView />
        </div>
      </div>
    )
  }

}
