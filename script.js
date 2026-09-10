const botao = document.getElementById("btnCarregar");
const container = document.getElementById("usuarios");

botao.addEventListener("click", carregarUsuarios);

async function carregarUsuarios() {

    container.innerHTML = "Carregando...";

    try {

        const resposta = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const usuarios = await resposta.json();

        container.innerHTML = "";

        usuarios.forEach(usuario => {

            const card = document.createElement("div");

            card.classList.add("usuario");

            card.innerHTML = `
                <h2>${usuario.name}</h2>
                <p><strong>Email:</strong> ${usuario.email}</p>
                <p><strong>Telefone:</strong> ${usuario.phone}</p>
                <p><strong>Cidade:</strong> ${usuario.address.city}</p>
            `;

            container.appendChild(card);
        });

    } catch (erro) {

        container.innerHTML =
            "Não foi possível carregar os usuários.";

        console.error(erro);
    }
}