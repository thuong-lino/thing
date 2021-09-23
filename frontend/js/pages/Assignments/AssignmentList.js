import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import api from '../../store/api';
import Hoc from '../../Hoc';

import { Colors } from '../../components/Colors';
import { Loader, Container, Header, Grid, Card } from 'semantic-ui-react';
async function handleFetchASNTList() {
  try {
    const res = await api.get('../api/assignments/');
    return res;
  } catch (error) {
    return { error: error };
  }
}
const style = {
  h3: {
    marginTop: '1em',
    padding: '2em 0em',
  },
};
class AssignmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  async componentDidMount() {
    const res = await handleFetchASNTList();
    this.setState({ assignments: res.data.results, error: res.error });
  }
  renderItem(item, index) {
    return (
      <Grid.Column key={index} stretched>
        <Card
          centered
          header={item.title}
          as={Link}
          to={`/assignments/${item.id}/`}
          color={Colors[index % Colors.length]}
          extra={'desasda sdas da sd as da sd ads des as das dasd asdasda sdads'}
          meta={'teacher : thuong'}
        />
      </Grid.Column>
    );
  }
  render() {
    const { assignments, error } = this.state;
    return (
      <>
        <Hoc>
          {error ? 'Some Error' : null}
          <Header as="h3" content="Assignment List" textAlign="center" style={style.h3} />
          {assignments ? (
            <Container>
              <Grid columns={5} stackable>
                {assignments.map((assignment, index) => {
                  return this.renderItem(assignment, index);
                })}
              </Grid>
            </Container>
          ) : (
            <Loader active size="medium" inline="centered" />
          )}
        </Hoc>
      </>
    );
  }
}

export default AssignmentList;
