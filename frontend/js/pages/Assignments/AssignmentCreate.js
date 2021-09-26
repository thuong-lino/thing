import React from 'react';
import { Form, Button, Segment, Container, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import update from 'react-addons-update';
import { creators } from '../../store/assignments';
import api from '../../store/api';
import Hoc from '../../Hoc';
import QuestionForm from './QuestionForm';
import MultipleSelection from '../../components/MultipleSelection';
class AssignmentCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      formCount: 1,
      title: '',
      questions: [{ order: 1, question: '', choices: ['', '', '', ''], answer: '' }],
      options: [],
      students: [],
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleStudentChange = this.handleStudentChange.bind(this);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.success !== prevState.success) {
      // <- this is setState equivalent
      return {
        success: nextProps.success,
        formCount: 1,
        title: '',
        questions: [{ order: 1, question: '', choices: ['', '', '', ''], answer: '' }],
      };
    }
    return null;
  }
  componentDidMount() {
    let options = [];
    api
      .get('/api/students/')
      .then((res) => res.data.results)
      .then((data) => {
        data.map((d, index) => {
          options.push({ key: index, value: d.email, text: d.email });
        });
        this.setState({ options });
      })
      .catch((error) => this.setState({ error }));
  }
  onSubmit(e) {
    const { students, questions } = this.state;
    const { userID, createASNT, token } = this.props;
    const title = e.target['0-title'].value;
    const asnt = {
      title,
      teacher: userID,
      questions,
      student: students,
    };
    createASNT(token, asnt);
    // this.setState({
    //   questions: [{ order: 1, question: '', choices: ['', '', '', ''], answer: '' }],
    //   title: '',
    //   students: [],
    // });
  }
  add() {
    const { formCount } = this.state;
    let question = '';
    let choices = ['', '', '', ''];
    let answer = '';
    let order = 0; // set in backend
    this.setState((prevState) => ({
      questions: [...prevState.questions, { order, question, choices, answer }],
      formCount: formCount + 1,
    }));
  }
  remove(e) {
    const { formCount } = this.state;
    let questions = this.state.questions;
    const index = e.target.id;
    questions.splice(index, 1);

    this.setState({ formCount: formCount - 1 });
  }

  onChange(e) {
    let arr = e.target.id.split('-');
    const id = arr[0] - 1;
    const target = arr[1];
    var value;
    if (target !== 'title') {
      if (target !== 'choice') {
        value = e.target.value;
        this.setState({
          questions: update(this.state.questions, {
            [id]: {
              [target]: { $set: value },
            },
          }),
        });
      } else {
        // value = choices
        value = e.target.value;
        const type = arr[2];
        this.setState({
          questions: update(this.state.questions, {
            [id]: {
              choices: {
                [type]: { $set: value },
              },
            },
          }),
        });
      }
    } else {
      this.setState({ title: e.target.value });
    }
  }
  handleStudentChange(e, { value }) {
    this.setState({ students: value });
  }
  render() {
    const { formCount, questions, options } = this.state;
    const { token } = this.props;
    const qns = [];
    for (let i = 1; i <= formCount; i++) {
      qns.push(
        <Hoc key={i}>
          <Segment>
            <Header as="h3">Question {i}</Header>
            <QuestionForm id={i} question={questions[i - 1]} />
            {questions.length > 1 ? (
              <Form.Field>
                <Button type="button" color="red" id={i - 1} onClick={this.remove}>
                  Remove this question
                </Button>
              </Form.Field>
            ) : null}
          </Segment>
        </Hoc>
      );
    }
    return (
      <Hoc>
        {this.props.token !== null && this.props.token !== undefined ? (
          <Container style={{ padding: '3em 0em' }} text>
            <Segment>
              <h2>Create an Assignment</h2>
            </Segment>
            <Form onSubmit={this.onSubmit} onChange={this.onChange}>
              <Segment.Group style={{ padding: '1em 2em' }}>
                <Form.Field>
                  <Form.Input
                    required
                    fluid
                    label="Assignment Title"
                    placeholder="Title"
                    id="0-title"
                  ></Form.Input>
                </Form.Field>

                <Segment.Group style={{ padding: '0em 1em', margin: '0em 3em' }}>
                  {qns}
                  <Segment>
                    <Button type="button" color="blue" onClick={this.add}>
                      Add new question
                    </Button>
                  </Segment>
                </Segment.Group>
              </Segment.Group>

              <MultipleSelection
                id="student-selection"
                placeholder="Student"
                options={options}
                style={{ padding: '5px 10px' }}
                onChange={this.handleStudentChange}
              />
              <Form.Button
                type="submit"
                color="green"
                style={{ marginTop: '1em', marginBottom: '0em' }}
              >
                Create
              </Form.Button>
            </Form>
          </Container>
        ) : null}
      </Hoc>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    Loading: state.assignments.loading,
    userID: state.auth.userID,
    success: state.assignments.success,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    createASNT: (token, asnt) => {
      dispatch(creators.createASNT(token, asnt));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AssignmentCreate);
