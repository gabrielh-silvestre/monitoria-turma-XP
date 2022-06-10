# Boas vindas ao repositório de revisão do Bloco 24!

Para desenvolver os exercicios, você deverá seguir as instruções a seguir. Fique atento a cada passo e, se tiver qualquer dúvida, nos chame no <a href="https://app.sli.do/event/xtvrdxyr" target="_blank">Slido</a> #vqv 🚀


Aqui você vai encontrar os detalhes de como estruturar sua API.

<details>
  <summary><strong>O que deverá ser desenvolvido</strong></summary><br />

  Hoje, você usará o Sequelize para construir as funções básicas de um CRUD, ou seja, implementará leitura, escrita, atualização e deleção de dados a partir dos métodos que os Sequelize nos disponibiliza.

  Você receberá instruções sobre o comportamento de cada uma das funções.
</details>

---

<details>
  <summary><strong>Antes de começar a desenvolver</strong></summary><br />
  
  1. Clone o repositório
  * `git@github.com:gabrielh-silvestre/monitoria-turma-XP.git`.
  * Entre na pasta do repositório que você acabou de clonar e depois no diretório do projeto:
    * `cd monitoria-turma-XP`
    * `cd Esquenta-Blogs-API`

<br />

  2. Instale as dependências
  * `npm install`

<br />

  3. Remova o `.example` do arquivo `.env.example`

<br />

  4. Execute o docker-compose
  * `docker-compose up -d`

<br />

  **ATENÇÃO**
  - Os pacotes para a criação da API não veem instalados
  - Para garantir que seu projeto do esquenta esteja atualizado realize um `git pull origin master`, ou clone o projeto novamente.

</details>

---

<details>
  <summary><strong>Implementações Técnicas</strong></summary><br />

  1. Hoje iremos focar nas construções das _queries_ do Sequelize.

  2. Os arquivos que você terá que alterar estão na pasta model/, essa que está na raiz do projeto.

  3. Para executar os testes, a API **DEVE** estar em execução, os testes fazem requisições diretas a API, então não irão funcionar caso a aplicação não esteja rodando.

  **Atenção**
  - Não altere os parâmetros das funções!!

</details>

---

<details>
  <summary><strong>Scripts do projeto</strong></summary><br />

  1. `npm run db:migrate` -> Executa as migrations do sequelize

  2. `npm run db:seed` -> Popula o MySQL com dados iniciais

  3. `npm run db:reset` -> Reinicia o MyQL, derruba o banco, cria um novo, executa as migrations e por fim popula o banco de dados

  4. `npm run dev` -> Executa a aplicação em modo de desenvolvimento

  5. `npm test` -> Executa os testes da aplicação

  **Atenção**
  - O script `npm run dev` só irá funcionar depois que todas as migrations forem implementadas.

</details>

---

<details>
  <summary><strong>Nos dê feedbacks sobre a revisão</strong></summary><br />
  
  1. Ao finalizar, não se esqueça de avaliar sua experiência preenchendo o formulário. Leva menos de 2 minutos

  <a href="https://forms.gle/6svqoD5p5bgPbxKz9" target="_blank">FORMULÁRIO DE AVALIAÇÃO</a>

</details>

## Requisitos


<details>
  <summary><strong>Implemente a função findById de product.model.js</strong></summary><br />

  1. A função `findById` deve retornar o produto encontrado, ou `null` caso nenhum produto seja encontrado:

  ``` js
    // Sucesso, um produto foi encontrado

    {
      id: 1,
      name: "Martelo do Thor",
      quantity: 10,
    }
  ```

  ``` js
    // Falha, nenhum produto foi encontrado

    null
  ```

  **Dica**: *Alguns métodos do Sequelize já retornam `null` ao não encontrar o item buscado*.

</details>

---

<details>
  <summary><strong>Implemente a função findByName de product.model.js</strong></summary><br />

  1. A função `findByName` deve retornar o produto encontrado, ou `null` caso nenhum produto seja encontrado:

  2. A busca tem que ser feita pelo nome exato.

  ``` js
    // Sucesso, um produto foi encontrado

    {
      id: 1,
      name: "Martelo do Thor",
      quantity: 10,
    }
  ```

  ``` js
    // Falha, nenhum produto foi encontrado

    null
  ```

</details>

---

<details>
  <summary><strong>Implemente a função create de product.model.js</strong></summary><br />

  1. A função `create` deve retornar o produto criado:

  ``` js
    {
      id: 4,
      name: "Armadura do Homem de Ferro",
      quantity: 50,
    }
  ```

  **Dica**: *Diferente do mysql2, o Sequelize retorna o objeto criado por inteiro, não apenas o id inserido*.

</details>

---

<details>
  <summary><strong>Implemente a função update de product.model.js</strong></summary><br />

  1. A função `update` deve retornar o produto atualizado:

  ``` js
    {
      id: 1,
      name: "Trem do Thor",
      quantity: 15,
    }
  ```

  **Dica**: *A atualização pode ser feita de formas diferentes!*.

</details>

---

<details>
  <summary><strong>Implemente a função remove de product.model.js</strong></summary><br />

  1. A função `remove` NÃO DEVE ter retorno:

  **Dica**: *A deleção pode ser feita de formas diferentes!*.

</details>

---

<details>
  <summary><strong>Implemente a função create de sale.model.js</strong></summary><br />

  1. A função `create` deve retornar a venda criada:

  ``` js
    {
      id: 1,
      date: '2022-06-10T11:51:41.000Z',
    }
  ```

  2. **Atenção**: Diferente das outras funções, a função `create` do sale.model.js recebe um ARRAY como parâmetro!!

  3. Ao criar uma venda a tabela `sales_products` também deve sofrer atualização.

  4. A quantidade de produtos deve ser alterada de acordo com a quantidade vendida.

  **Dica**: *Utilize o `map` para criar vendas independente do número de produtos!*.

</details>
