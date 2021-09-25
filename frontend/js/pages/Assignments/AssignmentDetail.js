import React, { Component, Fragment } from 'react';
import { Card, Container, Header, Segment, Button, Label, Icon, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Hoc from '../../Hoc';
import api from '../../store/api';

import Question from './Question';
import Choice from './Choice';

class AssignmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      assignment: {},
      userAnswers: {},
      isSRQsOpen: false,
      isCRQsOpen: false,
      grade: [],
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchGrade = this.fetchGrade.bind(this);
  }
  componentDidMount() {
    const { pathname, userID } = this.props;

    api
      .get(`/api${pathname}`)
      .then((res) => {
        this.setState({ assignment: res.data });
      })
      .catch((error) => {
        this.setState({ error });
      });
    if (userID) {
      this.fetchGrade(userID);
    }
  }
  componentDidUpdate(prevProps) {
    const { userID } = this.props;
    if (userID !== prevProps.userID && userID !== null) {
      this.fetchGrade(userID);
    }
  }

  fetchGrade(userID) {
    const assignmentID = this.props.match.params.id;
    api
      .get('/api/grade-assignment/', { params: { userID, assignmentID } })
      .then((res) => res.data.results)
      .then((grade) => {
        this.setState({ grade });
      })
      .catch((error) => {
        this.setState({ error });
      });
  }
  onChange(e, qId) {
    const { userAnswers } = this.state;
    userAnswers[qId] = e.target.innerHTML;
    this.setState({ userAnswers });
  }
  onSubmit(e) {
    e.preventDefault();
    const { userID, match } = this.props;
    const { userAnswers } = this.state;
    const asntId = match.params.id;
    const submitAnswers = {
      userAnswers,
      userID,
      asntId,
    };
    api.post('/api/grade-assignment/submit/', submitAnswers);
    this.setState({ userAnswers: {}, isSRQsOpen: false });
  }

  render() {
    const { assignment, userAnswers, isSRQsOpen, isCRQsOpen, grade } = this.state;
    const { questions, CRQs } = assignment;
    const lenQuestions = questions !== null && questions !== undefined ? questions.length : null;
    const allowSubmit = lenQuestions === Object.keys(userAnswers).length ? true : false;
    return (
      <>
        <Container>
          {' '}
          <Hoc>
            {Object.keys(assignment).length > 1 ? (
              <Fragment>
                <Header as="h2">{assignment.title}</Header>
                {!isSRQsOpen && !isCRQsOpen ? (
                  <Fragment>
                    <Segment
                      as={Button}
                      onClick={() => {
                        this.setState({ isSRQsOpen: true });
                      }}
                    >
                      {' Selected Response Questions '}
                      {grade[0] ? (
                        <>
                          <Label as="a" color="red" floating>
                            {grade[0].SRQs_grade}/100
                          </Label>
                          <Icon name="check" color="green"></Icon>
                        </>
                      ) : null}
                    </Segment>
                    <br />
                    <Segment
                      as={Button}
                      onClick={() => {
                        this.setState({ isCRQsOpen: true });
                      }}
                    >
                      Constructed Response Questions
                    </Segment>
                  </Fragment>
                ) : isSRQsOpen ? (
                  <>
                    <Question
                      submit={this.onSubmit}
                      allowSubmit={allowSubmit}
                      numberQuestion={questions.length}
                      questions={questions.map((q) => {
                        return (
                          <Card key={q.id}>
                            <Card.Content>
                              <Card.Header>{`${q.order}. ${q.question}`}</Card.Header>
                              <Choice
                                questionId={q.order}
                                change={this.onChange}
                                choices={q.choices}
                                userAnswers={userAnswers}
                              />
                            </Card.Content>
                          </Card>
                        );
                      })}
                    />
                  </>
                ) : (
                  <Form>
                    <Form.TextArea label={CRQs.question} placeholder="Your answer...." />
                  </Form>
                )}
              </Fragment>
            ) : (
              'Loading'
            )}
          </Hoc>
        </Container>
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    userID: state.auth.userID,
    location: state.router.location,
    pathname: state.router.location.pathname,
  };
};

export default connect(mapStateToProps)(AssignmentDetail);
