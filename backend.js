async function buscarProdutos() {

  const url =
    "https://script.google.com/macros/s/AKfycbw1V0ga-B1rXoqnBWNHJljH0o4IXK6hdsxucOfQ26mrdAYjmoWNrK2akbeWQIiziiJ3/exec";

  try {

    const resposta = await fetch(url);

    const dados = await resposta.json();

    console.log("DADOS:", dados);

        return dados || [];

  } catch (erro) {

    console.log(
      "Erro ao buscar produtos",
      erro
    );

    return [];
  }
}