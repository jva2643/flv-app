let pedido = [];

let lojaAtual = "";

async function fazerLogin() {

    const login =
        document
        .getElementById("login")
        .value
        .trim();

    const senha =
        document
        .getElementById("senha")
        .value
        .trim();

    if (!login || !senha) {

        alert("Preencha login e senha");

        return;
    }

    lojaAtual = login;

    carregarSistema();
}

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

async function carregarSistema() {

    const produtos =
        await buscarProdutos();

    console.log(produtos);

    renderizarSistema(produtos);

    iniciarTimer();
}

function renderizarSistema(produtos) {

    let htmlProdutos = "";

    produtos.forEach((produto, index) => {

        const especial =
            (produto.especie || "")
              .toUpperCase()
              .includes("TABLOIDE")
                ? "especial"
                : "";

        htmlProdutos += `

            <div class="produto ${especial}">

                <div>

                    <div class="produto-nome">
                        ${produto.descricao}
                    </div>

                    <div class="produto-info">
                        Cód: ${produto.codigo || ""}
                        •
                        R$ ${produto.custo || ""}
                    </div>

                </div>

                <div class="controles">

                    <button
                        class="btn-qtd btn-menos"
                        onclick="alterarQtd(${index}, -1)"
                    >
                        -
                    </button>

                    <input
                        class="qtd"
                        id="qtd-${index}"
                        value="0"
                        readonly
                    >

                    <button
                        class="btn-qtd"
                        onclick="alterarQtd(${index}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>

        `;
    });

    document.getElementById("app").innerHTML = `

        <div class="topo">

            <h1>Pedidos FLV</h1>

            <div class="loja-topo">
                Loja: ${lojaAtual}
            </div>

            <div class="barra-timer">
                <div
                    class="barra"
                    id="barraTimer"
                ></div>
            </div>

            <div class="info-grid">

                <div class="card-info">

                    <div class="titulo-info">
                        Tempo restante
                    </div>

                    <div
                        class="tempo"
                        id="timer"
                    >
                        02:30:00
                    </div>

                </div>

                <div class="card-info">

                    <div class="titulo-info">
                        Pedido
                    </div>

                    <div
                        class="pedido-info"
                        id="resumoPedido"
                    >
                        0 itens • 0 volumes
                    </div>

                </div>

            </div>

            <button
                class="btn-finalizar"
                onclick="finalizarPedido()"
            >
                FINALIZAR PEDIDO
            </button>

        </div>

        ${htmlProdutos}

    `;
}

function alterarQtd(index, valor) {

    const input =
        document.getElementById(`qtd-${index}`);

    let qtd =
        Number(input.value);

    qtd += valor;

    if (qtd < 0) qtd = 0;

    input.value = qtd;

    atualizarResumo();
}

function atualizarResumo() {

    let totalItens = 0;

    let totalVolumes = 0;

    const inputs =
        document.querySelectorAll(".qtd");

    inputs.forEach(input => {

        const qtd =
            Number(input.value);

        if (qtd > 0) {

            totalItens++;

            totalVolumes += qtd;
        }
    });

    document.getElementById(
        "resumoPedido"
    ).innerText =

        `${totalItens} itens • ${totalVolumes} volumes`;
}

function finalizarPedido() {

    alert("Pedido enviado com sucesso 😄");
}

function iniciarTimer() {

    let tempo =
        2 * 60 * 60 + 30 * 60;

    const timer =
        document.getElementById("timer");

    const barra =
        document.getElementById("barraTimer");

    const total =
        tempo;

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

        const porcentagem =
            (tempo / total) * 100;

        barra.style.width =
            porcentagem + "%";

        tempo--;

    }, 1000);
}

mostrarLogin();