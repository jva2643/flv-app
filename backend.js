async function buscarProdutos() {

  const url =
    "https://script.google.com/macros/s/AKfycbz2yTXhq0GphEfVZK4N821kvPAuk5FB8mS-WiZlP7hkuO1SbIXc1SJn9sCyktsjPDCy/exec";

  try {

    const resposta = await fetch(url);

    const dados = await resposta.json();

    return dados.produtos;

  } catch (erro) {

    console.log(
      "Erro ao buscar produtos",
      erro
    );

    return [];
  }
}