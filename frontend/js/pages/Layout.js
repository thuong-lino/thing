import React, { Component } from 'react';
import { connect } from 'react-redux';
import { creators } from '../store/auth';
import { withRouter, Redirect, Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/styles';

const MyAppBar = styled(AppBar)({
  //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  background: 'linear-gradient(to right bottom, #0c7142, #007f5e, #008c7a, #009a95, #04a6af)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  padding: '0 30px',
});
class Layout extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.authLogout();
  }
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    const { isAuthenticated } = this.props;
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <MyAppBar position="sticky">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" to="/" sx={{ flexGrow: 1 }}>
                Home
              </Typography>
              {isAuthenticated ? (
                <Button color="inherit" onClick={this.logout}>
                  <LogoutIcon /> Logout
                </Button>
              ) : (
                <Button color="inherit" component={Link} to="/login/">
                  <LoginIcon /> Login
                </Button>
              )}
            </Toolbar>
          </MyAppBar>
          {this.props.children}
        </Box>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    authLogout: () => dispatch(creators.authLogout()),
    onTryAutoSignup: () => dispatch(creators.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
