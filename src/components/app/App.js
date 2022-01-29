import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

class App extends Component {

   state = {
      selectedChar: null,
   }
   
   onCharSelected = (id) => {
      this.setState({
         selectedChar: id,
      })
   }

   render() {
      return (
         <div className="app">
            <AppHeader/>
            <main className="content">
               <RandomChar/>
               <div className="char__content">
                  <CharList onCharSelected={this.onCharSelected}/>
                  <CharInfo charId={this.state.selectedChar}/>
               </div>
            </main>
         </div>
      )
   }
}

export default App;