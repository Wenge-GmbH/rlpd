import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import { loginUser } from '../../actions';
import { renderField } from '../../helpers';

class Login extends Component {
  handleSubmit = ({username, password}) => {
    this.props.loginUser({ username, password }, (route) => {
      console.log(route);
      this.props.history.push(route);
    });
  }
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit.bind(this))}>
          <Field
            name="username"
            label="Email:"
            component={renderField}
          />
          <Field
            name="password"
            type="password"
            label="Password:"
            component={renderField}
          />
        {this.renderAlert()}
        <button action="submit">Sign in </button>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, { loginUser })(Login)
);
