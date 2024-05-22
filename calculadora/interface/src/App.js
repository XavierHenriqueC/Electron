import './App.css';
import { useState, useEffect} from 'react'
import { basicCalc } from './utils/API';

function App() {
 
  const [inputValue, setInputValue] = useState('')


  function separarNumerosECaracteres(input) {
    let numeros = [];
    let caracteres = [];
    let numeroAtual = '';
    let pontoEncontrado = false;

    for (let char of input) {
        if (!isNaN(char) && char !== ' ') {
            numeroAtual += char;
        } else if (char === '.' && !pontoEncontrado) {
            numeroAtual += char;
            pontoEncontrado = true;
        } else {
            if (numeroAtual !== '') {
                numeros.push(parseFloat(numeroAtual));
                numeroAtual = '';
                pontoEncontrado = false;
            }
            if (char !== ' ') {
                caracteres.push(char);
            }
        }
    }

    // Adiciona o último número encontrado, se houver
    if (numeroAtual !== '') {
        numeros.push(parseFloat(numeroAtual));
    }

    return {
        numeros: numeros,
        caracteres: caracteres
    };
  }


  const getCalc = async () => {

    const values = separarNumerosECaracteres(inputValue)
    console.log(values)
    if(values.numeros.length > 0 && values.caracteres.length > 0) {
      try {
        const result = await basicCalc (values.numeros, values.caracteres)
        console.log(result.message)
        const string = `${result.message}`
        setInputValue(string)
      } catch (err) {
        console.log(err)
      }
    } 
  }

  const handleKeys = (key) => {
    if(key === "DEL") {
      const newString = ""
      setInputValue(newString)
    } else if (key === "C") {
      const string = inputValue
      const newString = string.slice(0, -1);
      setInputValue(newString)
    } else if (key === "+" || key === "-" || key === "*" || key === "/" || key === ".") {
      const string = inputValue
      if(string === "") {
        console.log("Operação negada")
      } else {
        const newString = string.concat(key)
        setInputValue(newString)
      }
    } else if (key === "=") {
      const string = inputValue
      const lastCharacter = string[string.length - 1];

      if(lastCharacter === "+" || lastCharacter === "-" || lastCharacter === "*" || lastCharacter === "/") {
        console.log("Operação negada")
      } else {
        getCalc()
      }
    } else {
      const string = inputValue
      const newString = string.concat(key)
      setInputValue(newString)
    }
  }

  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      handleKeys('=')
      return
    } else {
      const allowedKeys = [
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', // Números
        '+', '-', '*', '/', '=', // Operadores
        'Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', // Teclas de controle
        '.', // Ponto decimal
      ];

      if (!allowedKeys.includes(event.key)) {
          event.preventDefault();
      }
    }
  }

  useEffect(() => {
    getCalc()
  },[])

  useEffect(() => {
    console.log(inputValue)
  },[inputValue])

  return (
    <div className="App">
      <h1>Calculadora</h1>
      <input value={inputValue} onKeyDown={(e) => handleKeyDown(e)} onChange={(e) => setInputValue(e.target.value)}></input>
      <div className='row'>
        <button onClick={(e) => handleKeys(1)}>1</button>
        <button onClick={(e) => handleKeys(2)}>2</button>
        <button onClick={(e) => handleKeys(3)}>3</button>
        <button onClick={(e) => handleKeys("DEL")}>DEL</button>
      </div>
      <div className='row'>
        <button onClick={(e) => handleKeys(4)}>4</button>
        <button onClick={(e) => handleKeys(5)}>5</button>
        <button onClick={(e) => handleKeys(6)}>6</button>
        <button onClick={(e) => handleKeys("C")}>C</button>
      </div>
      <div className='row'>
        <button onClick={(e) => handleKeys(7)}>7</button>
        <button onClick={(e) => handleKeys(8)}>8</button>
        <button onClick={(e) => handleKeys(9)}>9</button>
        <button onClick={(e) => handleKeys(0)}>0</button>
        <button onClick={(e) => handleKeys(".")}>.</button>
      </div>
      <div className='row'>
        <button onClick={(e) => handleKeys("+")}>+</button>
        <button onClick={(e) => handleKeys("-")}>-</button>
        <button onClick={(e) => handleKeys("*")}>x</button>
        <button onClick={(e) => handleKeys("/")}>/</button>
        <button onClick={(e) => handleKeys("=")}>=</button>
      </div>
    </div>
  );
}

export default App;
