import React, { Component } from 'react';
import { connect } from 'react-redux';
import { creators } from '../store/auth';
import { authSuccess } from '../store/auth';
import { withRouter, Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import {
  Container,
  Button,
  Grid,
  Header,
  List,
  Menu,
  Segment,
  Visibility,
  Icon,
} from 'semantic-ui-react';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.hideFixedMenu = this.hideFixedMenu.bind(this);
    this.showFixedMenu = this.showFixedMenu.bind(this);
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
  hideFixedMenu() {
    this.setState({ fixed: false });
  }
  showFixedMenu() {
    this.setState({ fixed: true });
  }
  render() {
    const { authenticated, is_teacher, userID, authLogout, children, name } = this.props;
    const { push, pathname } = this.props;
    const { fixed } = this.state;
    return (
      <>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        ></Visibility>
        <Segment
          inverted
          textAlign="center"
          style={{ padding: '0.5em 0em', minHeight: pathname == '/' ? 700 : 0 }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : null}
            inverted={!fixed}
            pointing={!fixed}
            secondary={!fixed}
            size="large"
          >
            <Container>
              <Menu.Item
                as="a"
                active={pathname === '/'}
                onClick={() => {
                  push('/');
                }}
              >
                Home
              </Menu.Item>
              <Menu.Item
                as="a"
                active={pathname === '/assignments/'}
                onClick={() => {
                  push('/assignments/');
                }}
              >
                Assignments
              </Menu.Item>

              {is_teacher && authenticated ? (
                <React.Fragment>
                  <Menu.Item
                    as="a"
                    active={pathname === `/assignments/create/`}
                    onClick={() => {
                      push(`/assignments/create/`);
                    }}
                  >
                    Create
                  </Menu.Item>
                </React.Fragment>
              ) : !is_teacher && authenticated ? (
                <Link to={`/profile/${userID}`}>
                  <Menu.Item header>Profile</Menu.Item>
                </Link>
              ) : null}
              <Menu.Menu position="right">
                {authenticated ? (
                  <>
                    <Menu.Item name={`Hi ${name}`} />

                    <Button
                      as="a"
                      inverted={!fixed}
                      content={`Log Out`}
                      style={{ margin: '5px 0px 5px 5px' }}
                      labelPosition="right"
                      icon="log out"
                      fitted="true"
                      onClick={() => {
                        authLogout();
                        push('/');
                      }}
                    />
                  </>
                ) : (
                  <React.Fragment>
                    <Button
                      as="a"
                      inverted={!fixed}
                      onClick={() => push('/login/')}
                      content={`Sign In`}
                      labelPosition="left"
                      icon="log out"
                      fitted="true"
                      style={{ margin: '5px 0px 5px 5px' }}
                    />

                    <Button
                      as="a"
                      inverted={!fixed}
                      primary={fixed}
                      onClick={() => push('/signup/')}
                      content={`Sign up`}
                      style={{ margin: '5px 0px 5px 5px' }}
                      labelPosition="right"
                      icon="signup"
                      fitted="true"
                    />
                  </React.Fragment>
                )}
              </Menu.Menu>
            </Container>
          </Menu>
          {pathname == '/' ? (
            <Container text>
              <Header
                as="h1"
                content="This is an image"
                inverted
                style={{
                  fontSize: '4em',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '3em',
                }}
              />
              <Button primary size="huge" onClick={() => push('/assignments/')}>
                Assignment
                <Icon name="right arrow" />
              </Button>
            </Container>
          ) : null}
        </Segment>
        {children}

        <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Sitemap</List.Item>
                    <List.Item as="a">Contact Us</List.Item>
                    <List.Item as="a">Religious Ceremonies</List.Item>
                    <List.Item as="a">Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">Banana Pre-Order</List.Item>
                    <List.Item as="a">DNA FAQ</List.Item>
                    <List.Item as="a">How To Access</List.Item>
                    <List.Item as="a">Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Footer Header
                  </Header>
                  <p>
                    Extra space for a call to action inside the footer that could help re-engage
                    users.
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.token !== null,
    name: state.auth.firstname,
    userID: state.auth.userID,
    is_teacher: state.auth.is_teacher,
    pathname: state.router.location.pathname,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => dispatch(creators.authLogout()),
    authSuccess: (user) => dispatch(authSuccess(user)),
    push: (path) => {
      dispatch(push(path));
    },
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
