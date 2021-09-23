import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { choices, questionId, userAnswers, change } = this.props;

    return (
      <Form.Group inline>
        {choices.map((c, index) => {
          return (
            <Form.Field
              control={Radio}
              key={index}
              label={c}
              value={userAnswers[questionId] !== undefined ? userAnswers[questionId] : ''}
              checked={c === userAnswers[questionId]}
              onChange={(e) => {
                change(e, questionId);
              }}
            />
          );
        })}
      </Form.Group>
    );
  }
}
export default Choice;
