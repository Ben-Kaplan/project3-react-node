import React, { Component } from "react";
import { Button } from 'reactstrap';
import "./style.css";

class Creation extends Component {
  constructor() {
    super();

    this.state = {
      title: "",
      comment: ""
    };
  }
  updateComment = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  render() {
    return (
      <form className="creation-style" onSubmit={this.props.addComments.bind(this, this.state)}>
        <label>
          Game Title:
          <input type="text" name="title" onChange={this.updateComment} />
        </label>
        <label>
          Review:
          <input type="text" name="comment" onChange={this.updateComment} />
        </label>
        <Button color="warning" type="Submit">Submit Review</Button>
      </form>
    );
  }
}

export default Creation;
