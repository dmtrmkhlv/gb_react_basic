import './App.css';

import {Message} from "./components";


const text = "Text to App.js"

function App(props) {
  return (
    <div className="App">
      <Message message = {text}/>
    </div>
  );
}

export default App;
