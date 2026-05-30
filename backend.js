async function buscarProdutos() {

  const url =
    "https://script.google.com/macros/s/AKfycbz2yTXhq0GphEfVZK4N821kvPAuk5FB8mS-WiZlP7hkuO1SbIXc1SJn9sCyktsjPDCy/exec";

  try {

    const dados = await resposta.text();

    console.log("RETORNO:", dados);

    return [];

  } catch (erro) {

    console.log(
      "Erro ao buscar produtos",
      erro
    );

    return [];
  }
}