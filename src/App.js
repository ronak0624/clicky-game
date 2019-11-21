import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import matches from "./cars.json";
import "./App.css";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on a car to gain points! Click on the same one twice and you lose the game!";

class App extends Component {
    
    // Setting this.state.matches to the cars json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // start game over
        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Yikes! You've already selected this car."

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctGuesses });
            this.setState({matches});

        // Otherwise, if clicked = false, and the user hasn't finished
        } else if (correctGuesses < 11) {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // set the amount of correct guesses
            correctGuesses++;
            
            clickMessage = "Keep going, You haven't clicked on that car yet!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Set value to true
            clickedMatch[0].clicked = true;

            // reset guess
            correctGuesses = 0;

            // If user wins, display click message
            clickMessage = "YOU WIN";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function(a, b){return 0.5 - Math.random()});

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Header>Car Memory Game </Header>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary card-header">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>
                <div className="container">
                <div className="row">
                {this.state.matches.map(match => (
                    <Card
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
                </div>
                </div>
                <Footer></Footer>
            </Wrapper>
        );
    }
}

export default App;