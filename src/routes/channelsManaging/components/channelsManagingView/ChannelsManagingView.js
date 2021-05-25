import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from "moment";
import './ChannelsManagingView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import {DateTimePicker} from "material-ui-pickers";
import {
  VIEW_CARS_PAGE_PATH,
  UTC_FORMAT
} from "../../../../properties/properties";
import {ADD_NEW_MESSAGE, CREATE_NEW_CHANNEL, DELETE_CHANNEL} from "../../../../api/channel/channelActions.js";
import {browserHistory} from "react-router";
import Button from "@material-ui/core/Button";

import ReactTable from "react-table";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 20,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '10px',
  },
});

class ChannelsManagingView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      brandID: null,
      year: null,
      newChannelsName:null,
      dateOfReceipt: null,
      channel: this.props.channel,
      //data: this.props.channel.list,
      data: [],
    }
  }

  tableStyle = {
    border: "none",
    boxShadow: "none",
    width: "700px"
  };

  columns = [
    {
      Header: 'Channel',
      accessor: 'channel',
      getProps: (state, rowInfo, column) => {
        return {
          style: {
            width: '200px',
            border: 'none',
          },
        };
      },
      getTdProps: () => {
        return {
          style: {
            width: '200px',
            border: 'none',
          },
        };
      },
      Cell: ({row}) => (
          <div style={{
            width: '200px',
          }}>
            {row && row.channel && row.channel.topic && <div>{row.channel.topic}</div>}
          </div>
      )
    },
    {
      Header: '',
      accessor: '',
      getProps: (state, rowInfo, column) => {
        return {
          style: {
            width: '200px',
            border: 'none',
          },
        };
      },
      getTdProps: () => {
        return {
          style: {
            width: '200px',
            border: 'none',
          },
        };
      },
            Cell: ({row}) => (
                <div style={{
                  width: '200px',
                }}>
                  <Button variant="contained" color="secondary" onClick={() => {this.deleteChannel(row.channel.topic);}}>
                    Delete channel
                  </Button>
                </div>
            )
    },

  ];

  componentWillMount() {
  }

  componentWillUnmount() {
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    if (this.props.channel.list && Array.isArray(this.props.channel.list)) {
      let newList = [];
      this.props.channel.list.map((ob) => {
            if (!ob.deleted) {
              newList.push({channel: {topic: ob.topic, deleted: ob.deleted}});
            }
          }
      )
      //let map = newList.map(channel => ({ channel }));
      //console.log("map ", map)
      this.setState({data: newList});
    }
  }

  componentWillReceiveProps(nextprops) {
    if (nextprops.channel && nextprops.channel && nextprops.channel !== this.props.channel) {
      this.setState({channel: nextprops.channel});
      if (nextprops.channel.list && Array.isArray(nextprops.channel.list)) {
        let newList = [];
        nextprops.channel.list.map((ob) => {
              if (!ob.deleted) {
                newList.push({channel: {topic: ob.topic, deleted: ob.deleted}});
              }
            }
        )
        //let map = newList.map(channel => ({ channel }));
        console.log("newList === ", newList)
        this.setState({data: newList});
      }
    }
  }

  onChangeBrand  = (e) => {
  };

  onChangeYear  = (e) => {
    let year = new Date(e);
    let yearToUTC = moment(year).format(UTC_FORMAT);
    this.setState({year: yearToUTC});
  };

  onChangenNewChannelsName = (e) => {
    this.setState({newChannelsName: e.target.value});
  };

  onChangeDateOfReceipt  = (e) => {
    let departure = new Date(e);
    let departureToUTC = moment(departure).format(UTC_FORMAT);
    this.setState({dateOfReceipt: departureToUTC});
  };

  createNewChannel = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    let text = 'Channel was created by admin at ' + today;

    this.props.createNewTopic({
      data: {
        topic: this.state.newChannelsName,
        author: this.props.auth.user.name,
        text: text,
      },
      credentials: {emailAddress: this.props.auth.user.email, password: this.props.auth.user.password}
    });

    this.setState({newChannelsName: ''});
  };

  deleteChannel = (channel) => {
    this.props.deleteChannel({
      data: {
        topic: channel
      },
      credentials: {emailAddress: this.props.auth.user.email, password: this.props.auth.user.password}
    });

  };

  render = () => {
    const {classes, auth} = this.props;

    return (
      <div style={{height: '700px', marginLeft: '200px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated ?
              (
                  <div style={{width: '1200px', marginLeft: '100px', marginTop: '20px'}}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <div style={{textAlign: 'center', marginLeft: '-375px', marginBottom: '25px'}}><h4>Admin panel for work with channels</h4></div>
                      </Grid>
                      <ReactTable
                          data={this.state.data}
                          columns={this.columns}
                          style={this.tableStyle}
                          defaultPageSize={5}
                      />
                    </Grid>

                    <Grid container spacing={0} style={{marginTop: '25px;', marginLeft: '-80px'}}>
                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper} style={{marginTop: '15px'}}>Channel's name</div>
                      </Grid>
                      <Grid item xs={12} sm={3} style={{marginLeft: '-50px'}}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{marginTop: '0px', marginLeft: '0px'}}
                              onChange={this.onChangenNewChannelsName}
                              name='newChannelsName'
                              value={this.state.newChannelsName}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <div style={{marginTop: '25px', marginLeft: '0px'}}>
                          {this.state.newChannelsName &&
                          <Button variant="contained" color="primary" onClick={this.createNewChannel}>
                            Create channel
                          </Button>
                          }
                        </div>
                      </Grid>
                    </Grid>

                  </div>
              )
                  :
              (
                  <div></div>
              )
          }

        </MuiThemeProvider>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth || {},
    flashMessages: state.flashMessages || {},
    channel: state.channel
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createNewTopic: (data) => dispatch({type: CREATE_NEW_CHANNEL, data}),
    deleteChannel: (data) => dispatch({type: DELETE_CHANNEL, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ChannelsManagingView));
