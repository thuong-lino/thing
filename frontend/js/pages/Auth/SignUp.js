import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { creators } from '../../store/auth';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password1: '',
      password2: '',
      firstname: '',
      lastname: '',
      is_teacher: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { firstname, lastname, email, password1, password2, is_teacher } = this.state;
    this.props.signup(firstname, lastname, email, password1, password2, is_teacher);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSelectChange(e, { value }) {
    let is_teacher = this.state.is_teacher;
    if (value === 'student') {
      is_teacher = false;
    } else {
      is_teacher = true;
    }
    this.setState({ is_teacher });
  }

  render() {
    const { firstname, lastname, email, password1, password2 } = this.state;
    const { error, loading, token } = this.props;
    if (token) {
      return <Redirect to="/" />;
    }
    return (
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Signup to your account
          </Header>
          {error && <p>{error.message}</p>}

          <React.Fragment>
            <Form size="large" onSubmit={this.handleSubmit}>
              <Segment stacked>
                <Form.Input
                  onChange={this.handleChange}
                  value={lastname}
                  name="lastname"
                  fluid
                  icon="address card"
                  iconPosition="left"
                  placeholder="Họ và tên đệm"
                />
                <Form.Input
                  onChange={this.handleChange}
                  value={firstname}
                  name="firstname"
                  fluid
                  icon="address card"
                  iconPosition="left"
                  placeholder="Tên"
                />

                <Form.Input
                  onChange={this.handleChange}
                  value={email}
                  name="email"
                  fluid
                  icon="mail"
                  iconPosition="left"
                  placeholder="E-mail address"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password1}
                  name="password1"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />
                <Form.Input
                  onChange={this.handleChange}
                  fluid
                  value={password2}
                  name="password2"
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm password"
                  type="password"
                />
                <Form.Select
                  fluid
                  onChange={this.handleSelectChange}
                  placeholder="Bạn là"
                  options={[
                    { value: 'student', text: 'Hoc sinh' },
                    { value: 'teacher', text: 'Giảng viên' },
                  ]}
                  required={true}
                />

                <Button color="teal" fluid size="large" loading={loading} disabled={loading}>
                  Signup
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <NavLink to="/login">Login</NavLink>
            </Message>
          </React.Fragment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (firstname, lastname, username, email, password1, password2, is_teacher) =>
      dispatch(
        creators.authSignup(firstname, lastname, username, email, password1, password2, is_teacher)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
