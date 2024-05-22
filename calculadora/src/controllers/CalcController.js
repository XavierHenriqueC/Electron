module.exports = class ClientController {
    
    static async basic (req, res) {

        const { args, operations } = req.body

        console.log(args)
        console.log(operations)
        
        //Validações
        if(!args) {
            res.status(422).json({message: "args obrigatório"})
            return;
        }

        if(!operations) {
            res.status(422).json({message: "operations obrigatória"})
            return;
        }

        //Verifica se são Arrays
        if(!Array.isArray(args)) {
            res.status(422).json({message: "args deve ser um array"})
            return;
        }

        if(!Array.isArray(operations)) {
            res.status(422).json({message: "operations deve ser um array"})
            return;
        }

        //Verifica quantidade de operações
        const operationsLength = args.length - 1

        if(operationsLength !== operations.length) {
            res.status(422).json({message: "quantidade de operações invalida"})
            return;
        }

        function calcular(args, operations) {
            // Verifica se há pelo menos um argumento e uma operação
            if (args.length === 0 || operations.length === 0) {
                return "Argumentos ou operações inválidos.";
            }
        
            // Realiza as operações de multiplicação e divisão primeiro
            for (let i = 0; i < operations.length; i++) {
                if (operations[i] === "*" || operations[i] === "/") {
                    const operacao = operations[i];
                    const num1 = args[i];
                    const num2 = args[i + 1];
        
                    if (num2 === undefined) {
                        return "Faltam números para completar as operações.";
                    }
        
                    switch (operacao) {
                        case "*":
                            args[i] = num1 * num2;
                            break;
                        case "/":
                            if (num2 === 0) {
                                return "Divisão por zero não é permitida.";
                            }
                            args[i] = num1 / num2;
                            break;
                    }
        
                    // Remove o próximo número e a operação de multiplicação/divisão do array
                    args.splice(i + 1, 1);
                    operations.splice(i, 1);
                    i--; // Decrementa o índice para verificar a próxima operação
                }
            }
        
            let resultado = args[0]; // Inicializa o resultado com o primeiro número
        
            // Executa as operações restantes (adição e subtração)
            for (let i = 0; i < operations.length; i++) {
                const operacao = operations[i];
                const proximoNumero = args[i + 1];
        
                if (proximoNumero === undefined) {
                    return "Faltam números para completar as operações.";
                }
        
                switch (operacao) {
                    case "+":
                        resultado += proximoNumero;
                        break;
                    case "-":
                        resultado -= proximoNumero;
                        break;
                    default:
                        return "Operação inválida.";
                }
            }
        
            return resultado;
        }

        try {

            const result = calcular(args, operations)
            console.log(result)
            res.status(201).json({message: result})

        } catch (error) {
            res.status(500).json({message: error})
        }

    }
    
}

