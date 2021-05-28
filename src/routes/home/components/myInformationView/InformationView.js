import React, {Component} from 'react'
import {connect} from 'react-redux'
import './InformationView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import {ADD_FLASH_MESSAGE, MESSAGE_LOG_IN_SUCCESSFULY} from "../../../../api/flash/flashActions";
import TextField from "@material-ui/core/TextField";
import {CHANGE_USER_NAME} from "../../../../api/login/loginActions";

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

class InformationView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      name: ''
    }
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
  }

  componentWillReceiveProps (nextprops) {
    if (nextprops.auth !== this.props.auth) {
      this.setState({auth: nextprops.auth.user});
      this.setState({name: nextprops.auth.user.name});
    }
  }

  onChangeMessage  = (e) => {
    this.setState({name: e.target.value});
  };

  changeUsername = () => {
    this.props.changeUserName({
/*      data: {
        name: this.state.name,
        email: this.props.auth.user.email,
        password: this.props.auth.user.password,
        userRole: this.props.auth.user.userRole,
      },*/
      data: {
        id: this.props.auth.user.id,
        name: this.state.name,
        email: this.props.auth.user.email,
        password: this.props.auth.user.password,
        userRole: this.props.auth.user.userRole
      },
      credentials: {emailAddress: this.props.auth.user.email, password: this.props.auth.user.password}
    });
    this.setState({message: ''});
  };

  render = () => {
    const {classes, auth} = this.props;

    return (
      <div style={{height: '700px', marginLeft: '200px', marginTop: '75px'}}>
        <MuiThemeProvider>
          {auth.isAuthenticated ?
              (
                  <Grid container spacing={0}>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>
                        Name
                      </Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>
                        {this.props.auth.user.userRole === 'DRIVER' ?
                          <TextField
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{}}
                              onChange={this.onChangeMessage}
                              name='addMessage'
                              value={this.state.name}
                          />
                            :
                            <div>{this.state.name}</div>
                        }
                      </Paper>
                    </Grid>

{/*                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Name</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.name}</Paper>
                    </Grid>*/}

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Id</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.id}</Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Email</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.email}</Paper>
                    </Grid>

                    <Grid item xs={12} sm={3}>
                      <Paper className={classes.paper}>Role</Paper>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>{auth.user.userRole === 'DRIVER' ? 'USER' : 'ADMIN'}</Paper>
                    </Grid>

                    {auth.user.userRole === 'USER' && (
                        <React.Fragment>

                          <Grid item xs={12} sm={3}>
                            <Paper className={classes.paper}>Status</Paper>
                          </Grid>
                          <Grid item xs={12} sm={9}>
                            <Paper className={classes.paper}>{auth.user.userStatus}</Paper>
                          </Grid>
                        </React.Fragment>
                      )
                    }
                    <Grid item xs={12} sm={3}>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <Paper className={classes.paper}>
                        {this.state.name !== this.props.auth.user.name &&
                        <Button variant="contained" color="primary" onClick={this.changeUsername}>
                          Change user data
                        </Button>}
                      </Paper>
                    </Grid>

                  </Grid>
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showFlashMessage: (data) => dispatch({type: ADD_FLASH_MESSAGE, data}),
    changeUserName: (data) => dispatch({type: CHANGE_USER_NAME, data})
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(InformationView));
