// Pega o botão e a área de usuários pelo ID (ligação HTML + JS)
const botao = document.getElementById("btnCarregar");
const recipiente = document.getElementById("usuarios");

// Escuta o evento de clique no botão e chama a função
botao.addEventListener("click", carregarUsuarios);

// Função assíncrona - permite usar await sem travar a página
async function carregarUsuarios() {
    // Mostra mensagem enquanto busca na API
    recipiente.innerHTML = "Carregando...";
    
    try {
        // fetch() busca dados na API fake
        const resposta = await fetch("https://jsonplaceholder.typicode.com/users");
        
        // .json() converte a resposta de texto para objeto JavaScript
        const usuarios = await resposta.json();
        
        // Limpa o "Carregando..."
        recipiente.innerHTML = "";

        // forEach percorre cada usuário do array
        usuarios.forEach(usuario => {
            // Cria uma div na memória
            const cartao = document.createElement("div");
            
            // Adiciona a classe CSS 'usuario' (fundo branco, sombra)
            cartao.classList.add("usuario");
            
            // innerHTML escreve o conteúdo dentro do cartão
            // ${} é interpolação para colocar variável dentro do texto
            cartao.innerHTML = `
                <h2>${usuario.name}</h2>
                <p><strong>E-mail:</strong> ${usuario.email}</p>
                <p><strong>Telefone:</strong> ${usuario.phone}</p>
                <p><strong>Cidade:</strong> ${usuario.address.city}</p>
            `;
            
            // appendChild joga o cartão criado dentro da seção, aparece na tela
            recipiente.appendChild(cartao);
        });

    } catch (erro) {
        // Se der erro (sem internet, API fora), entra aqui
        recipiente.innerHTML = "Não foi possível carregar os usuários.";
        console.error(erro); // Mostra o erro no F12 > Console para debug
    }
}
