import React, {Component} from 'react'
import {connect} from 'react-redux'
import './SignUpView.scss'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import {
  DATE_FORMAT_DEFAULT, DATE_MASK,
  DATE_TIME_FORMAT_DEFAULT,
  DATE_TIME_MASK, EMPTY_PAGE_PATH,
  UTC_FORMAT,
} from "../../../../properties/properties";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {browserHistory} from "react-router";
import {DateTimePicker} from "material-ui-pickers";
import moment from "moment";
import {SIGN_UP, USER_WAS_SUCCESSFULLY_CREATED} from "../../../../api/login/loginActions";

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

class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      patronymic: null,
      birthday: null,
      login: null,
      password: null,
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

  componentWillReceiveProps(nextprops) {
    if (nextprops.flashMessages !== this.props.flashMessages) {
        nextprops.flashMessages.map((msg) => {if (msg.text === USER_WAS_SUCCESSFULLY_CREATED) {
        browserHistory.push(EMPTY_PAGE_PATH)}});
    }
  }

  onChangeFirstname  = (e) => {
    this.setState({firstname: e.target.value});
  };

  onChangeLastname  = (e) => {
    this.setState({lastname: e.target.value});
  };

  onChangePatronymic  = (e) => {
    this.setState({patronymic: e.target.value});
  };

  onChangeBirthday  = (e) => {
    let birthday = new Date(e);
    let birthdayToUTC = moment(birthday).format(UTC_FORMAT);
    this.setState({birthday: birthdayToUTC});
  };

  onChangeLogin  = (e) => {
    this.setState({login: e.target.value});
  };

  onChangePassword  = (e) => {
    this.setState({password: e.target.value});
  };

  saveUser = () => {
    this.props.createUser({
      data: {
        name: this.state.firstname,
        email: this.state.login,
        password: this.state.password,
      },
      credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
    });
  };

  render = () => {
    const {classes, auth} = this.props;

    return (
      <div style={{height: '700px', marginLeft: '200px'}}>
        <MuiThemeProvider>
          {!auth.isAuthenticated ?
              (
                  <div style={{width: '800px'}}>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <div style={{textAlign: 'center', marginLeft: '-100px'}}> <h4>Sign Up</h4></div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Nickname</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                              onChange={this.onChangeFirstname}
                              name='Lastname'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Email</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                              onChange={this.onChangeLogin}
                              name='Login'
                          />
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <div className={classes.paper}>Password</div>
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <div className={classes.paper} style={{borderColor: '#43434'}}>
                          <TextField
                              type="password"
                              underlineStyle={{borderColor: '#1eb1da', color: '#1eb1da'}}
                              style={{width: '200px', marginTop: '-10px', marginLeft: '-300px'}}
                              onChange={this.onChangePassword}
                              name='Password'
                          />
                        </div>
                      </Grid>

                    </Grid>
                    <div style={{marginLeft: '175px', marginTop: '30px'}}>
                      {this.state.firstname  && this.state.login && this.state.password &&
                      <Button variant="contained" color="primary" onClick={this.saveUser}>
                        Sign up
                      </Button>
                      }
                    </div>
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
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createUser: (data) => dispatch({type: SIGN_UP, data}),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SignUpView));
