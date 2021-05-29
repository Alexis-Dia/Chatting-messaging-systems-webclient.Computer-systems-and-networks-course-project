import React, {Component} from 'react'
import {connect} from 'react-redux';
import {browserHistory} from 'react-router'

import SignUpForm from './signUp/SignUpForm'
import LogInForm from './logIn/LoginForm'
import {Modal, ModalBody} from 'reactstrap';
import {
    EN,
    RU,
    I18,
    LANGUAGE_DEFAULT,
    ROLE_DRIVER,
    ROLE_ADMIN,
    VIEW_ALL_DRIVERS_PAGE_PATH,
    VIEW_ALL_DRIVERS,
    VIEW_CHANNELS_PAGE_PATH,
    VIEW_CHANNELS_MANAGING_PAGE_PATH, CHANNELS_MANAGING, VIEW_REPORTS_PAGE_PATH, VIEW_HISTORY_REPORTS
} from '../../../properties/properties'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup, ToolbarSeparator} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './NavigationBarLayout.scss'
import {
    REGISTARATION_PAGE_PATH,
    EMPTY_PAGE_PATH,
    REPORTS_PAGE_PATH,
    ADD_REPORT_PAGE_PATH,
    INFORMATION,
    REPORTS,
    ADD_REPORT,
} from '../../../properties/properties';
import {DELETE_ALL_FLASH_MESSAGES} from '../../../api/flash/flashActions';
import {DELETE_CURRENT_USER} from '../../../api/login/loginActions'
import {GET_CHANNELS, SET_UP_CHOSEN_CHANNEL} from "../../../api/channel/channelActions";

class NavigationBarLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSignUp: false,
            modalLogIn: false,
            modalDrawer: false,
            language: LANGUAGE_DEFAULT,
            currentPage: INFORMATION,
            channel: {
                listOfChannels: []
            },
            topic: null
        };
    }

    componentDidMount() {
        this.props.getAllChannels({
            data: {},
            //credentials: {emailAddress: this.props.auth.user.emailAddress, password: this.props.auth.user.password}
            //credentials: {emailAddress: "joedow@gmail.com", password: "12345678"}
        });
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.channel !== this.props.channel) {
            if (nextprops.channel.list) {
                if (nextprops.channel.list && Array.isArray(nextprops.channel.list)) {
                    let newList = [];
                    nextprops.channel.list.map((ob) => {
                            if (!ob.deleted) {
                                newList.push(ob);
                            }
                        }
                    )
                    this.setState({
                        channel: {
                            ...this.state.channel, listOfChannels: newList
                        }
                    });
                }
            }
        }
    }

    toggleSignUp = () => {
        window.location = REGISTARATION_PAGE_PATH
    };

    toggleLogIn = () => {
        this.setState({
            modalLogIn: !this.state.modalLogIn
        });
    };

    toggleDrawer = () => {
        this.setState({
            modalDrawer: !this.state.modalDrawer
        });
    };

    onClickMyInformation = () => {
        const path = EMPTY_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: INFORMATION,
            topic: null,
        });
    };

    onClickByTopic = (topic) => {
        const path = VIEW_CHANNELS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            topic: topic,
        });
        this.props.setUpLastChosenChannel(topic);
    };

    onClickChannelsManaging = () => {
        const path = VIEW_CHANNELS_MANAGING_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: CHANNELS_MANAGING,
        });
    };

    onClickViewHistoryReports = () => {
        const path = VIEW_REPORTS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_HISTORY_REPORTS,
        });
    };


    onClickViewAllDrivers = () => {
        const path = VIEW_ALL_DRIVERS_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: VIEW_ALL_DRIVERS,
        });
    };

    onClickAllTasks = () => {
    };

    onClickFreeTasks = () => {
    };

    onClickCreateTask = () => {
    };

    onClickCreateCar = () => {
    };

    onClickViewCars = () => {
    };

    onClickViewAllReports = () => {
        const path = REPORTS_PAGE_PATH;
        browserHistory.push({pathname:path, state:'0'});
        this.toggleDrawer();
        this.setState({
            currentPage: REPORTS,
        });
    };

    onClickAddReport = () => {
        const path = ADD_REPORT_PAGE_PATH;
        browserHistory.push(path);
        this.toggleDrawer();
        this.setState({
            currentPage: ADD_REPORT,
        });
    };

    setLanguage = (event, child) => {
        localStorage.removeItem(I18);
        localStorage.setItem(I18, event.target.innerText);
        this.props.setLang(event.target.innerText);

        this.setState({
            language: event.target.innerText
        });
    };

    logout = () => {
        this.props.logout();
        this.props.deleteAllFlashMessages();
        browserHistory.push("/");
    };


    render = () => {

        const {isAuthenticated} = this.props.auth;
        let userIsDriver = false;
        let userIsAdmin = false;
        let userStatus = '';
        if (isAuthenticated) {
            let userRole = this.props.auth.user.userRole;
            userStatus = this.props.auth.user.userStatus;
            if (userRole === ROLE_DRIVER) {
                userIsDriver = true;
            } else if (userRole === ROLE_ADMIN) {
                userIsAdmin = true;
            }
        }

        const userAppBar = (
            <div>
                <MuiThemeProvider>

                    <AppBar
                        /*title={<img src={require('./img/navigationBarLayout/OrangeryLogo.png')}/>}
                        titleStyle={{color: '#000000', fontSize: '18px'}}*/
                        title='Messaging system'
                        style={{backgroundColor: '#ffffff', zIndex: 990}}
                        titleStyle={{color: '#02162c'}}
                        iconElementLeft={
                            <IconButton iconStyle={{fill: '#000000'}}>
                                <NavigationMenu/>
                            </IconButton>
                        }
                        onLeftIconButtonClick={this.toggleDrawer}
                        children={

                            <Toolbar style={{backgroundColor: '#ffffff'}}>
                                <ToolbarGroup>
                                    <ToolbarSeparator/>
                                    <IconButton iconStyle={{fill: '#000000'}} onClick={this.logout}>
                                        <ActionPowerSettingsNew/>
                                    </IconButton>
                                </ToolbarGroup>
                            </Toolbar>


                        }
                    >
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );

        const guestAppBar = (
            <MuiThemeProvider>
                <AppBar
                    //title={<img src={require('./img/navigationBarLayout/OrangeryLogo.png')}/>}
                    title='Chat-system'
                    style={{backgroundColor: '#ffffff', zIndex: 990}}
                    titleStyle={{color: '#02162c'}}
                    iconElementLeft={
                        <IconButton iconStyle={{fill: '#000000'}}>
                            <NavigationMenu/>
                        </IconButton>
                    }
                    onLeftIconButtonClick={this.toggleDrawer}
                    children={
                        <Toolbar style={{backgroundColor: '#ffffff'}}>
                            <ToolbarGroup>
                                <ToolbarSeparator/>
                                <IconMenu
                                    iconButtonElement={
                                        <IconButton>
                                            <NavigationMenu/>
                                        </IconButton>
                                    }
                                    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                    iconStyle={{fill: '#000000', marginTop: '2px'}}
                                >
                                    <MenuItem
                                        primaryText="Sign Up"
                                        onClick={this.toggleSignUp}/>
                                    <MenuItem
                                        primaryText="Log In"
                                        onClick={this.toggleLogIn}/>
                                </IconMenu>
                            </ToolbarGroup>
                        </Toolbar>
                    }
                >
                </AppBar>
            </MuiThemeProvider>
        );

        return (
            <div>
                <div className='appbar-main-1'>
                    {isAuthenticated ? userAppBar : guestAppBar}
                    <div className='drower-main-1'>

                        <Modal isOpen={this.state.modalSignUp} toggle={this.toggleSignUp}
                               className={this.props.className}>
                            <ModalBody>
                                <SignUpForm toogle={this.toggleSignUp}/>
                            </ModalBody>
                        </Modal>

                        <Modal isOpen={this.state.modalLogIn} toggle={this.toggleLogIn}
                               className={this.props.className}>
                            <ModalBody>
                                <LogInForm toggleLogIn={this.toggleLogIn}/>
                            </ModalBody>
                        </Modal>

                        <MuiThemeProvider>
                            <Drawer open={this.state.modalDrawer}
                                    docked={false}
                                    onRequestChange={this.toggleDrawer}
                                    overlayStyle={{zIndex: 0, opacity: 0.25}}
                                    containerStyle={{
                                        top: '1px',
                                        zIndex: 99,
                                        position: 'absolute',
                                        backgroundColor: '#ffffff',
                                        height: '1200px'
                                    }}
                            >
                                <div className='drower-main-2'>
                                    <nav
                                        className="navbar navbar-light navbar-expand justify-content-center">
                                        <div className="navbar-collapse collapse w-100" id="collapsingNavbar3">
                                            {isAuthenticated
                                                ?
                                                (userIsDriver ?
                                                        (
                                                            <Menu style={{backgroundColor: '#FFFBF7', width: '100%'}}>
                                                                {(!this.state.topic && this.props.location.pathname === EMPTY_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="My information"
                                                                                  onClick={this.onClickMyInformation}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="My information"
                                                                                  onClick={this.onClickMyInformation}/>
                                                                    )
                                                                }
                                                                {this.state.channel !== null && this.state.channel.listOfChannels !== null && (this.state.channel.listOfChannels.map((ob) =>
                                                                    /*<MenuItem primaryText={ob} onClick={this.onClickByTopic(ob)}/>*/
                                                                    (this.state.topic === ob.topic)
                                                                        ?
                                                                        (
                                                                            <MenuItem primaryText={ob.topic}
                                                                                      onClick={() => {this.onClickByTopic(ob.topic);}}
                                                                                      style={{backgroundColor: '#FF8F4F'}}
                                                                            />
                                                                        ) :
                                                                        (
                                                                            <MenuItem primaryText={ob.topic}
                                                                                      onClick={() => {this.onClickByTopic(ob.topic);}}
                                                                            />
                                                                        )
                                                                ))}
                                                            </Menu>
                                                        ) :
                                                        (
                                                            <Menu style={{backgroundColor: '#FFFBF7', width: '100%'}}>

                                                                {(this.props.location.pathname === EMPTY_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="My information"
                                                                                  onClick={this.onClickMyInformation}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="My information"
                                                                                  onClick={this.onClickMyInformation}/>
                                                                    )
                                                                }

                                                                {(this.props.location.pathname === VIEW_CHANNELS_MANAGING_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="Channels managing"
                                                                                  onClick={this.onClickChannelsManaging}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="Channels managing"
                                                                                  onClick={this.onClickChannelsManaging}/>
                                                                    )
                                                                }

                                                                {(this.props.location.pathname === VIEW_REPORTS_PAGE_PATH)
                                                                    ?
                                                                    (
                                                                        <MenuItem primaryText="View history reports"
                                                                                  onClick={this.onClickViewHistoryReports}
                                                                                  style={{backgroundColor: '#FF8F4F'}}/>
                                                                    ) :
                                                                    (
                                                                        <MenuItem primaryText="View history reports"
                                                                                  onClick={this.onClickViewHistoryReports}/>
                                                                    )
                                                                }

                                                            </Menu>
                                                        )
                                                )
                                                :
                                                (
                                                    <Menu style={{backgroundColor: '#FFFBF7', width: '100%'}}>

                                                        {(this.props.location.pathname === EMPTY_PAGE_PATH)
                                                            ?
                                                            (
                                                                <MenuItem primaryText="Main Page"
                                                                          onClick={this.onClickMyInformation}
                                                                          style={{backgroundColor: '#FF8F4F'}}/>
                                                            ) :
                                                            (
                                                                <MenuItem primaryText="Main Page"
                                                                          onClick={this.onClickMyInformation}/>
                                                            )
                                                        }
                                                    </Menu>
                                                )
                                            }
                                        </div>
                                    </nav>
                                </div>
                            </Drawer>
                        </MuiThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth,
        location:state.location,
        channel:state.channel
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteAllFlashMessages: (data) => dispatch({type: DELETE_ALL_FLASH_MESSAGES, data}),
        logout: (data) => dispatch({type: DELETE_CURRENT_USER, data}),
        getAllChannels: (data) => dispatch({type: GET_CHANNELS, data}),
        setUpLastChosenChannel: (topic) => dispatch({type: SET_UP_CHOSEN_CHANNEL, topic}),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarLayout);

/* https://stackoverflow.com/questions/19733447/bootstrap-navbar-with-left-center-or-right-aligned-items/20362024#20362024
https://github.com/mui-org/material-ui/issues/5358 */

