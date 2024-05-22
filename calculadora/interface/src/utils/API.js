//Configurações Gerais
const urlBase = 'http://localhost:5000';

const Headers = {
  "Content-Type": "application/json",
}

export async function basicCalc(args, operations) {

  const url = `${urlBase}/calc/basic`;

  const body = {
    args: args,
    operations: operations
  }

  const options = {
    mode: 'cors',
    method: "POST",
    headers: Headers,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const data = await response.json();
    return data; // Return the parsed JSON data

  } catch (error) {
    throw error; // Re-throw the error for handling outside the function
  }
}