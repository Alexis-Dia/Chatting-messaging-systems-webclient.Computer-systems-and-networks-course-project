import React, { Component } from 'react'
import ChannelsView from './channelsView/ChannelsView'
import FooterView from './footerView/FooterView'
import './MainView.scss'

export default class MainView extends Component {

  render = () => {
    return (
      <div>
        <div className='main-header'>
          <ChannelsView />
          <FooterView />
        </div>
      </div>
    )
  }

}
