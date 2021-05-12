import React, { Component } from 'react';

class Finished extends Component {
  render() {
    return (
      <section className="finished">
        <img width="300" src="https://i.pinimg.com/originals/39/63/56/39635620bc39fd89280af66645b69d80.gif" />
        <h1 className="blinking">Your break is over!</h1>
      </section>
    );
  }
}

export default Finished;