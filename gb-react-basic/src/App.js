import './App.css';

import {Message} from "./components";


const text = "Text to App.js"

function App() {
  return (
    <div className="Wrapper">
      <div className="App">
        <Message message = {text}/>
      </div>
    </div>
  );
}

export default App;
