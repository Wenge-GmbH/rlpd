import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurentPlate } from '../actions';


class App extends Component {
  componentDidMount() {
    this.props.setCurentPlate();
  }

  render() {
    return (
      <div className="App">
        {this.props.plate.currentPlate}
      </div>
    );
  }
}

const mapStateToProps = ({plate}) => ({plate});

export default connect(mapStateToProps, { setCurentPlate })(App);
