import React from "react";
import { Button } from 'reactstrap';
import "./style.css";

const Comments = (props) => {

  const commentsList = props.comments.map((comment, i) => {
    return (
      <li key={comment._id} >
        <h3>{comment.title}</h3>
        <p>{comment.comment}</p>
        <br />
        <Button color="secondary" onClick={props.deleteComments.bind(null, comment._id)}>Delete</Button>
        <Button color="success" onClick={props.showModal.bind(null, comment._id)}>Edit</Button>
      </li>
    );
  });

  return <ul className="comments-style" >{commentsList}</ul>;
};

export default Comments;
