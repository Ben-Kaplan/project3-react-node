import React from "react";
import { Button } from "reactstrap";
import "./style.css";

const Edit = props => {
  return (
    <div className="edit-style">
      <h4> Edit Game Review</h4>
      <form onSubmit={props.closeAndEdit}>
        <label>
          Game Title:
          <input type="text" name="title" onChange={props.handleFormChange} value={props.commentToEdit.title} />
        </label>
        <label>
          Edit Comment:
          <input type="text" name="comment" onChange={props.handleFormChange} value={props.commentToEdit.review} />
        </label>
        <Button color="warning" type="submit">Edit Review</Button>
      </form>
    </div>
  );

};

export default Edit;
