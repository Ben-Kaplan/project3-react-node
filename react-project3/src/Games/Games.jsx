import React, { Component } from 'react';
import DisplayGames from "../DisplayGames/DisplayGames"
import { Button } from "reactstrap";

class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      displayGames: []
    };
  }
  addGame = async (game) => {
    console.log("addgame")
    console.log(game, "this is game")
    const createdGame = {
      name: ""
    }
    const addedGame = await fetch("http://localhost:9000/games", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(game),
      headers: {
        // "Access-Allow-Control-Origin": "http://localhost:3000",
        "Content-Type": "application/json"
      }
    });
    const parsedAddedGame = await addedGame.json();
    console.log(parsedAddedGame, "this is parsed addedgame");
    this.setState({ displayGames: [...this.state.displayGames, parsedAddedGame] })
    console.log(this.state, "this is state!!!!!!!!!!!!!!!!!!!!!")
    return parsedAddedGame;

  }
  render() {
    return (
      <div className="game-style">
        <form className="game-form-style" onSubmit={this.handleSearch}>
          <input value={this.state.inputValue} onChange={e => this.updateInputValue(e)} />
          <Button color="warning" type="submit" value="Search">Search</Button>
        </form>
        <DisplayGames displayGames={this.state.displayGames} />
      </div>
    );
  }

  updateInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSearch = async (e) => {
    console.log("searching")
    console.log(this.state.inputValue, "this is input value")
    e.preventDefault();
    const regex = new RegExp(this.escapeRegex(this.state.inputValue), "gi");
    console.log(regex, "this is regex");
    await this.setState({ displayGames: [] })
    await this.props.games.map((game, i) => {
      if (game.name.match(regex)) {
        this.addGame(game);

      }
    })
  }
  escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }

}


export default Games;