import React, { Component } from "react";
import Creation from "../Creation/Creation.jsx";
import Comments from "../Comments/Comments.jsx";
import Edit from "../Edit/Edit.jsx"
import Games from "../Games/Games.jsx"
import NavBar from "../NavBar/NavBar.jsx"



class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      games: [],
      showEdit: false,
      editCommentId: null,
      commentToEdit: {
        title: "",
        comment: ""
      }
    };
  }

  componentDidMount = () => {
    this.getComments()
      .then(comments => {
        this.setState({
          comments: comments.data
        });
        console.log(comments, "this is comments")
      })
      .catch(err => {
        console.log(err);
      });
    this.getGames().then((games) => {
      this.setState({ games: games })
    }).catch(err => {
      console.log(err);
    })

  }
  getGames = async () => {
    try {
      const games = await fetch("http://localhost:9000/getgamesapi", {
        headers: {
          "Content-Type": "application/json",
        }
      });
      const gamesJson = await games.json();
      console.log(JSON.parse(gamesJson.data), "this is games");
      const parsedData = JSON.parse(gamesJson.data);
      return parsedData.results
    } catch (err) {
      console.log(err)
    }
  }
  getComments = async () => {
    const comments = await fetch("http://localhost:9000/comments", {
      credentials: "include",
      headers: {
        // "Access-Allow-Control-Origin": "http://localhost:3000",
        "Content-type": "application/json"
      }
    });
    const parsedComments = await comments.json();
    return parsedComments;
  };

  addComments = async (comment, e) => {
    e.preventDefault();

    try {
      const createComment = await fetch("http://localhost:9000/comments", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(comment),
        headers: {
          "Content-type": "application/json"
        }
      });
      const parsedResponse = await createComment.json();
      console.log(parsedResponse, " this is the parsed response in add comment")
      this.setState({
        comments: [...this.state.comments, parsedResponse.data]
      });
    } catch (err) {
      console.log(err);
    }
    console.log(comment, " this is the added comment")

  };

  showModal = id => {
    const commentToEdit = this.state.comments.find(
      comment => comment._id === id
    );
    this.setState({
      showEdit: true,
      editCommentId: id,
      commentToEdit: commentToEdit
    });
  };

  deleteComments = async (id, e) => {
    e.preventDefault();

    try {
      const deleteComments = await fetch(
        "http://localhost:9000/comments/" + id,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const parsedResponse = await deleteComments.json();
      if (parsedResponse.status === 200) {
        this.setState({
          comments: this.state.comments.filter(
            (comment, i) => comment._id !== id
          )
        });
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  closeAndEdit = async e => {
    e.preventDefault();
    try {
      const editComment = await fetch(
        "http://localhost:9000/comments/" + this.state.editCommentId,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(this.state.commentToEdit),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      const parsedResponse = await editComment.json();
      const editedCommentArray = this.state.comments.map(comment => {
        if (comment._id === this.state.editCommentId) {
          comment.title = parsedResponse.data.title;
          comment.comment = parsedResponse.data.comment;
        }

        return comment;
      });

      this.setState({
        comments: editedCommentArray,
        showEdit: false
      });
    } catch (err) {
      console.log(err);
    }
  };
  handleFormChange = e => {
    this.setState({
      commentToEdit: {
        ...this.state.commentToEdit, [e.target.name]: e.target.value
      }
    });
  };
  render() {
    return (
      <div className="main-container-style">
        <NavBar />
        <Comments deleteComments={this.deleteComments} showModal={this.showModal} comments={this.state.comments} />
        <Creation addComments={this.addComments} handleFormChange={this.handleFormChange} />
        {this.state.showEdit ? (<Edit closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} commentToEdit={this.state.commentToEdit} />) : null}
        <Games games={this.state.games} handleFormChange={this.handleFormChange} />
      </div>
    );
  }
}

export default MainContainer;
