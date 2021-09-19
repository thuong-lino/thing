import React, { Component } from 'react';
import { connect } from 'react-redux';
import { creators } from '../store/auth';
import { authSuccess } from '../store/auth';
import { withRouter, Redirect, Link } from 'react-router-dom';

import { Container, Divider, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.logout = this.logout.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    //console.log(this.props.onTryAutoSignup());
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === undefined || user === null) {
      this.props.authLogout();
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        this.props.authLogout();
      } else {
        this.props.authSuccess(user);
      }
    }
  }
  logout() {
    this.props.authLogout();
  }
  toggleDrawer() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { authenticated, is_teacher, userID, authLogin, authLogout } = this.props;
    const { open } = this.state;
    return (
      <>
        <Menu inverted>
          <Container>
            <Link to="/">
              <Menu.Item header>Home</Menu.Item>
            </Link>
            <Link to={`/assignments/`}>
              <Menu.Item header>Assignment</Menu.Item>
            </Link>

            {is_teacher && authenticated ? (
              <React.Fragment>
                <Link to={`/profile/${userID}`}>
                  <Menu.Item header>Profile</Menu.Item>
                </Link>
                <Link to={`/create/`}>
                  <Menu.Item header>Create</Menu.Item>
                </Link>
              </React.Fragment>
            ) : !is_teacher && authenticated ? (
              <Link to={`/profile/${userID}`}>
                <Menu.Item header>Profile</Menu.Item>
              </Link>
            ) : null}
            <Menu.Menu position="right">
              {authenticated ? (
                <Menu.Item header onClick={() => authLogout()}>
                  Logout
                </Menu.Item>
              ) : (
                <React.Fragment>
                  <Link to="/login">
                    <Menu.Item header>Login</Menu.Item>
                  </Link>
                  <Link to="/signup">
                    <Menu.Item header>Signup</Menu.Item>
                  </Link>
                </React.Fragment>
              )}
            </Menu.Menu>
          </Container>
        </Menu>
        {this.props.children}

        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
          <Container textAlign="center">
            <Grid divided inverted stackable>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 1" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 2" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Group 3" />
                <List link inverted>
                  <List.Item as="a">Link One</List.Item>
                  <List.Item as="a">Link Two</List.Item>
                  <List.Item as="a">Link Three</List.Item>
                  <List.Item as="a">Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header inverted as="h4" content="Footer Header" />
                <p>
                  Extra space for a call to action inside the footer that could help re-engage
                  users.
                </p>
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            {/* <Image centered size="mini" src="/logo.png" /> */}
            <List horizontal inverted divided link size="small">
              <List.Item as="a" href="#">
                Site Map
              </List.Item>
              <List.Item as="a" href="#">
                Contact Us
              </List.Item>
              <List.Item as="a" href="#">
                Terms and Conditions
              </List.Item>
              <List.Item as="a" href="#">
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
    userID: state.auth.userID,
    is_teacher: state.auth.is_teacher,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => dispatch(creators.authLogout()),
    authSuccess: (user) => dispatch(authSuccess(user)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
