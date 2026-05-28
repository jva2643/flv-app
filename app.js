let pedido = [];

let lojaAtual = "";

const URL_API =
  "https://script.google.com/macros/s/AKfycbw1V0ga-B1rXoqnBWNHJljH0o4IXK6hdsxucOfQ26mrdAYjmoWNrK2akbeWQIiziiJ3/exec";

function mostrarLogin() {

  document.getElementById("app").innerHTML = `

    <div class="login-box">

      <h2>Login da Loja</h2>

      <input
        type="text"
        id="login"
        placeholder="Usuário"
      >

      <input
        type="password"
        id="senha"
        placeholder="Senha"
      >

      <button onclick="fazerLogin()">
        ENTRAR
      </button>

    </div>

  `;
}

async function carregarDados() {

  const resposta =
    await fetch(URL_API);

  return await resposta.json();
}

async function fazerLogin() {

  const login =
    document.getElementById("login").value.trim();

  const senha =
    document.getElementById("senha").value.trim();

  const dados =
    await carregarDados();

  const usuarios =
    dados.usuarios;

  if (usuarios[login] == senha) {

    lojaAtual = login;

    iniciarApp(
      dados.produtos
    );

  } else {

    alert("Login inválido");
  }
}

function iniciarApp(produtos) {

  document.getElementById("app").innerHTML = `

    <div class="barra-topo-fixa">

      <div class="loja-topo">
        🏪 Loja: ${lojaAtual}
      </div>

      <div class="topo-info">

        <div>
          ⏰ <span id="timer">02:30:00</span>
        </div>

        <div>
          📦 <span id="totalItens">0 itens</span>
        </div>

        <div>
          🚛 <span id="totalVolumes">0 volumes</span>
        </div>

      </div>

      <button
        class="btn-finalizar-topo"
        onclick="abrirConferencia()"
      >
        FINALIZAR PEDIDO
      </button>

    </div>

    <header class="topo">

      <h1>Pedidos FLV</h1>

      <p>Rede Econômica</p>

    </header>

    <div id="listaProdutos"></div>

    <div id="modal"></div>

  `;

  renderizarProdutos(produtos);

  iniciarTimer();
}

function renderizarProdutos(produtos) {

  const lista =
    document.getElementById(
      "listaProdutos"
    );

  lista.innerHTML = "";

  produtos.forEach(produto => {

    lista.innerHTML += `

      <div class="produto ${produto.especie === 'Tabloide Rede' ? 'especial' : ''}">

        <div>

          <div class="produto-nome">
            ${produto.descricao}
          </div>

          <div style="
            margin-top:6px;
            color:#6b7280;
            font-size:15px;
          ">

            Cód: ${produto.codigo}
            •
            ${produto.especie}
            •
            R$ ${produto.custo}

          </div>

        </div>

        <div class="controle-qtd">

          <button
            class="btn-qtd"
            onclick="
              alterarBotao(
                ${produto.codigo},
                '${produto.descricao}',
                '${produto.custo}',
                -1,
                this
              )
            "
          >
            -
          </button>

          <input
            class="qtd"
            type="number"
            min="0"
            value="0"
            readonly
          >

          <button
            class="btn-qtd"
            onclick="
              alterarBotao(
                ${produto.codigo},
                '${produto.descricao}',
                '${produto.custo}',
                1,
                this
              )
            "
          >
            +
          </button>

        </div>

      </div>

    `;
  });
}

function alterarBotao(
  codigo,
  descricao,
  custo,
  valor,
  botao
){

  const container =
    botao.parentElement;

  const input =
    container.querySelector(".qtd");

  let quantidade =
    Number(input.value);

  quantidade += valor;

  if (quantidade < 0) {
    quantidade = 0;
  }

  input.value = quantidade;

  alterarQuantidade(
    codigo,
    descricao,
    custo,
    quantidade
  );
}

function alterarQuantidade(
  codigo,
  descricao,
  custo,
  quantidade
){

  quantidade = Number(quantidade);

  const existe = pedido.find(
    p => p.codigo === codigo
  );

  if (quantidade <= 0) {

    pedido = pedido.filter(
      p => p.codigo !== codigo
    );

  } else {

    if (existe) {

      existe.quantidade = quantidade;

    } else {

      pedido.push({

        codigo,
        descricao,
        custo,
        quantidade

      });
    }
  }

  atualizarResumo();
}

function atualizarResumo() {

  const totalItens = pedido.length;

  let volumes = 0;

  pedido.forEach(item => {

    volumes += item.quantidade;

  });

  document.getElementById(
    "totalItens"
  ).innerText =
    `${totalItens} itens`;

  document.getElementById(
    "totalVolumes"
  ).innerText =
    `${volumes} volumes`;
}

function abrirConferencia() {

  if (pedido.length === 0) {

    alert("Adicione itens");

    return;
  }

  const modal =
    document.getElementById("modal");

  let html = "";

  pedido.forEach(item => {

    html += `

      <div class="linha-conferencia">

        <span>${item.descricao}</span>

        <strong>${item.quantidade}</strong>

      </div>

    `;
  });

  modal.innerHTML = `

    <div class="overlay">

      <div class="modal-box">

        <h2>Conferir Pedido</h2>

        ${html}

        <button
          class="btn-confirmar"
          onclick="confirmarPedido()"
        >
          CONFIRMAR PEDIDO
        </button>

        <button
          class="btn-cancelar"
          onclick="fecharModal()"
        >
          CANCELAR
        </button>

      </div>

    </div>

  `;
}

function fecharModal() {

  document.getElementById(
    "modal"
  ).innerHTML = "";
}

async function confirmarPedido() {

  alert("Pedido enviado!");

  pedido = [];

  fecharModal();

  mostrarLogin();
}

function iniciarTimer() {

  let tempo =
    2 * 60 * 60 + 30 * 60;

  const timer =
    document.getElementById("timer");

  setInterval(() => {

    const horas =
      String(
        Math.floor(tempo / 3600)
      ).padStart(2, "0");

    const minutos =
      String(
        Math.floor(
          (tempo % 3600) / 60
        )
      ).padStart(2, "0");

    const segundos =
      String(
        tempo % 60
      ).padStart(2, "0");

    timer.innerText =
      `${horas}:${minutos}:${segundos}`;

    tempo--;

  }, 1000);
}
