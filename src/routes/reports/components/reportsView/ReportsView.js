import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './ReportsView.scss'
import {ADD_FLASH_MESSAGE} from "../../../../api/flash/flashActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {ADD_NEW_MESSAGE} from "../../../../api/channel/channelActions";

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



class ReportsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cars: [],
      data: [],
      lastChosenChannel: '',
      message: '',
      count: 0,
    }
  }

  tableStyle = {
    border: "none",
    boxShadow: "none"
  };

  columns = [
    {
      Header: 'Method',
      accessor: 'method',
      getProps: (state, rowInfo, column) => {
        return {
          style: {
            width: '100px',
            border: 'none',
            maxWidth: '100px !important',
            fontSize: '12px',
          },
        };
      },
      getTdProps: () => {
        return {
          style: {
            border: 'none',
            maxWidth: '100px',
          },
        };
      },
      getTrProps: () => {
        return {
          style: {
            border: 'none',
            maxWidth: '100px',
          },
        };
      },
    },
    {
      Header: 'Url',
      accessor: 'url',
      getProps: (state, rowInfo, column) => {
        return {
          style: {
            width: '50px',
            border: 'none',
            fontSize: '12px',
          },
        };
      },
      getTdProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
      getTrProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
    },
    {
      Header: 'Code',
      accessor: 'code',
      getProps: (state, rowInfo, column) => {

        return {
          style: {
            //background:(rowInfo && rowInfo.row && rowInfo.row.author && rowInfo.row.author === this.props.auth.user.name ? '#6363ff' : 'grey'),
            borderRadius: '25px',
            border: 'none',
            marginTop: '0px',
      },
        };
      },
      getTdProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
      getTrProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
    },

    {
      Header: 'Users Name',
      accessor: 'userName',
      getProps: (state, rowInfo, column) => {

        return {
          style: {
            //background:(rowInfo && rowInfo.row && rowInfo.row.author && rowInfo.row.author === this.props.auth.user.name ? '#6363ff' : 'grey'),
            borderRadius: '25px',
            border: 'none',
            marginTop: '0px',
          },
        };
      },
      getTdProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
      getTrProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
    },

    {
      Header: 'Datetime',
      accessor: 'localDateTime',
      getProps: (state, rowInfo, column) => {

        return {
          style: {
            //background:(rowInfo && rowInfo.row && rowInfo.row.author && rowInfo.row.author === this.props.auth.user.name ? '#6363ff' : 'grey'),
            borderRadius: '25px',
            border: 'none',
            marginTop: '0px',
          },
        };
      },
      getTdProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
      getTrProps: () => {
        return {
          style: {
            border: 'none',
          },
        };
      },
    },
  ];

  deleteQnA(row) {
  }

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
/*    this.setState({lastChosenChannel: this.props.channel.lastChosenChannel});
    this.subscribe(this.props.channel.lastChosenChannel);*/
    let count = this.state.count + 1;
    this.setState({count: count});
    if (count < 2) {
      this.subscribe("nextprops.channel.lastChosenChannel");
    }
  }

  componentWillReceiveProps(nextprops) {

  }

  subscribe = async (lastChosenChannel) => {
    let url = 'http://localhost:8080/reports/';
    const events = new EventSource(url);
    events.onmessage = event => {
      const parsedData = JSON.parse(event.data);
      this.setState({data: [parsedData, ...this.state.data]});
    }
  };

  onChangeMessage  = (e) => {
    this.setState({message: e.target.value});
  };

  sendMassage = () => {
    this.props.addNewMessage({
      data: {
        topic: this.state.lastChosenChannel,
        author: this.props.auth.user.name,
        text: this.state.message,
      },
      credentials: {emailAddress: this.props.auth.user.email, password: this.props.auth.user.password}
    });
    this.setState({message: ''});
  };

  render = () => {
    const {classes, auth} = this.props;

    return (
      <div style={{height: '700px', marginLeft: '200px', marginTop: '15px'}}>


                    <h4 style={{marginTop: '0px'}}>{this.state.lastChosenChannel}</h4>
                    <ReactTable
                        data={this.state.data}
                        columns={this.columns}
                        style={this.tableStyle}
                        defaultPageSize={10}
                        style={{marginTop: '0px', border: '0px'}}
                    />
{/*                    <div style={{display: 'flex', justifyContent: 'space-between', width: '350px', marginTop: '20px', marginBottom: '20px'}}>
                        <TextField
                          underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                          style={{}}
                          onChange={this.onChangeMessage}
                          name='addMessage'
                          value={this.state.message}
                        />
                      <div>
                        {(this.state.message ?
                        <Button variant="contained" color="primary" onClick={this.sendMassage}>
                          Send message
                        </Button>
                        :
                        '')}
                      </div>
                    </div>*/}



      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth || {},
    channel: state.channel || []
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
    addNewMessage: (data) => dispatch({type: ADD_NEW_MESSAGE, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportsView);
