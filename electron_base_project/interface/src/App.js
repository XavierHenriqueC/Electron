import './App.css';
import { useState, useEffect} from 'react'

function App() {
  const [teste, setTeste] = useState('Hello World!!')

  return (
    <div className="App">
      <h1>{teste}</h1>
    </div>
  );
}

export default App;
