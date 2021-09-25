import React, { Fragment } from 'react';
import { Form } from 'semantic-ui-react';

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
    };
  }
  render() {
    const keys = this.props.id;
    const { question } = this.props;
    return (
      <Fragment>
        <Form.Field>
          <Form.Input
            required
            label="Question Name"
            placeholder="Question"
            id={`${keys}-question`}
            value={question.question}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <label>Choices</label>
          <Form.Group inline widths="equal">
            <Form.Input
              required
              fluid
              placeholder="Choice A"
              id={`${keys}-choice-0`}
              value={question.choices[0]}
            />
            <Form.Input
              required
              value={question.choices[1]}
              fluid
              placeholder="Choice B"
              id={`${keys}-choice-1`}
            />
          </Form.Group>
          <Form.Group inline widths="equal">
            <Form.Input
              required
              value={question.choices[2]}
              fluid
              placeholder="Choice C"
              id={`${keys}-choice-2`}
            />
            <Form.Input
              required
              value={question.choices[3]}
              fluid
              placeholder="Choice D"
              id={`${keys}-choice-3`}
            />
          </Form.Group>
        </Form.Field>
        <Form.Field>
          <label> Answer</label>
          <Form.Input
            required
            fluid
            placeholder="Answer"
            id={`${keys}-answer`}
            value={question.answer}
          ></Form.Input>
        </Form.Field>
      </Fragment>
    );
  }
}

export default QuestionForm;
