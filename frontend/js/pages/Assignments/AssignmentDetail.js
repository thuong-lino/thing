import React, { Component, Fragment } from 'react';
import { Card, Container, Header, Segment, Button, Label, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Hoc from '../../Hoc';
import api from '../../store/api';

import Question from './Question';
import Choice from './Choice';
import { Link } from 'react-router-dom';

class AssignmentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      assignment: {},
      userAnswers: {},
      isSRQsOpen: false,
      isCRQsOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { pathname } = this.props;
    api
      .get(`/api${pathname}`)
      .then((res) => {
        console.log(res.data);
        this.setState({ assignment: res.data });
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
    const { userID } = this.props;
    const { userAnswers } = this.state;
    const asntId = 1;
    const submitAnswers = {
      userAnswers,
      userID,
      asntId,
    };
    console.log(this.props.userID);
    console.log(submitAnswers);

    api.post('/api/grade-assignment/submit/', submitAnswers);
    this.setState({ userAnswers: {} });
  }

  render() {
    const { assignment, userAnswers, isSRQsOpen, isCRQsOpen } = this.state;
    const { questions } = assignment;
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
                      <Label as="a" color="red" floating>
                        Overview
                      </Label>
                      {' Selected Response Questions '}
                    </Segment>
                    <Icon name="check" color="green"></Icon>
                    <br />
                    <Segment as={Button}>Constructed Response Questions</Segment>
                  </Fragment>
                ) : isSRQsOpen ? (
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
                ) : (
                  'TuLuan'
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
const mapStateToProps = (state) => {
  return {
    userID: state.auth.userID,
    pathname: state.router.location.pathname,
  };
};
export default connect(mapStateToProps)(AssignmentDetail);
