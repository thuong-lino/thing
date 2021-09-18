import React, { Component } from 'react';
import { connect } from 'react-redux';
import { creators } from '../../store/auth';
import { Redirect } from 'react-router-dom';

//mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_teacher: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email = data.get('email');
    const password1 = data.get('password1');
    const password2 = data.get('password2');
    const is_teacher = data.get('user-type');

    this.props.signup(email, password1, password2, is_teacher);
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({
      is_teacher: e.target.value,
    });
  }
  render() {
    const { is_teacher } = this.state;
    return (
      <>
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type="password"
                      name="password1"
                      label="Password"
                      id="password1"
                      autoComplete="password1"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password2"
                      label="Confirm Your Password"
                      type="password"
                      id="password2"
                      autoComplete="password2"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="user-type">You are</InputLabel>
                      <Select
                        labelId="user-type"
                        name="user-type"
                        id="user-type"
                        value={is_teacher}
                        label="Age"
                        onChange={this.handleChange}
                      >
                        <MenuItem value={false}>Student</MenuItem>
                        <MenuItem value={true}>Teacher</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
        );
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    loading: state.auth.user,
    error: state.auth.error,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signup: (email, password1, password2, is_teacher) => {
      dispatch(creators.authSignup(email, password1, password2, is_teacher));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
