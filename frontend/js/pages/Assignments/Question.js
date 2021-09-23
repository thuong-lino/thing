import React from 'react';
import { Button, Progress } from 'semantic-ui-react';
class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = { percent: 100 / this.props.numberQuestion, current: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }

  next() {
    const current = this.state.current + 1;
    this.setState((prevState) => ({
      percent: prevState.percent >= 100 ? 100 : prevState.percent + 100 / this.props.numberQuestion,
      current: current >= this.props.numberQuestion ? this.props.numberQuestion - 1 : current,
    }));
  }

  previous() {
    const current = this.state.current - 1;
    this.setState((prevState) => ({
      percent:
        prevState.percent <= 100 / this.props.numberQuestion
          ? 100 / this.props.numberQuestion
          : prevState.percent - 100 / this.props.numberQuestion,
      current: current <= 0 ? 0 : current,
    }));
  }

  render() {
    const { percent, current } = this.state;
    const { questions, numberQuestion, allowSubmit } = this.props;
    return (
      <div>
        <Progress percent={percent} indicating />
        <div>{questions[current]}</div>
        <Button onClick={this.previous} disabled={percent <= 100 / numberQuestion}>
          Previous
        </Button>
        {percent < 100 ? (
          <Button primary onClick={this.next} disabled={percent >= 100}>
            Next
          </Button>
        ) : (
          <Button color="green" onClick={this.props.submit} disabled={!allowSubmit}>
            Submit
          </Button>
        )}
      </div>
    );
  }
}

export default Question;
