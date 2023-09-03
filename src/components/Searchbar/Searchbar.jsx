import PropTypes from 'prop-types';
import { Component } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { Bar, Form, FormButton, FormInput } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    searchTerm: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ searchTerm: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.searchTerm);
  };

  render() {
    return (
      <Bar>
        <Form onSubmit={this.handleSubmit}>
          <FormButton type="submit">
            <BiSearchAlt2 style={{ width: '28px', height: '28px' }} />
          </FormButton>

          <FormInput
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Bar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
