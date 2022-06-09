# Boas vindas ao repositório de revisão do Bloco 24!

Para desenvolver os exercicios, você deverá seguir as instruções a seguir. Fique atento a cada passo e, se tiver qualquer dúvida, nos chame no <a href="https://app.sli.do/event/xtvrdxyr" target="_blank">Slido</a> #vqv 🚀


Aqui você vai encontrar os detalhes de como estruturar sua API.

<details>
  <summary><strong>O que deverá ser desenvolvido</strong></summary><br />

  Hoje, você usará o Sequelize para construir a camada de model de uma aplicação semi-pronta, **revisando** e **praticando** a configuração inicial com o Sequelize-cli.

  Você receberá instruções sobre a ordem de desenvolvimento e estrutura das migrations e models.
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
  - É normal o container do Node quebrar até que as migrations sejam implementadas.

</details>

---

<details>
  <summary><strong>Implementações Técnicas</strong></summary><br />

  1. Hoje o dia será focado na construção das migrations e models com o Sequelize, há dois endpoints funcionais para você testar suas migrations e models através do Insomnia, Postman ou ThunderClient.

  3. Na dinâmica de hoje os únicos testes que deve ser executados são o 01 e o 02, através dos comandos: `npm test 01` e `npm test 02`

  2. Para executar os testes, a API **DEVE** estar em execução, os testes fazem requisições diretas a API, então não irão funcionar caso a aplicação não esteja rodando.

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
  <summary><strong>Implemente a migration da tabela products</strong></summary><br />

  1. A migration deve cobrir a seguinte estrutura:

  ``` js
    {
      id:  // Inteiro, Primary Key
      name:  // Texto, not null
      quantity:  // Inteiro, not null
    }
  ```

  2. O nome da tabela **DEVERÁ** ser `products`

  **Dica**: *Utilize as seeders e o arquivo StoreManger.sql como apoio*.

</details>

---

<details>
  <summary><strong>Implemente a migration da tabela sales</strong></summary><br />

  1. A migration deve cobrir a seguinte estrutura:

  ``` js
    {
      id:  // Inteiro, Primary Key
      date:  // Timestamp, not null
    }
  ```

  2. O nome da tabela **DEVERÁ** ser `sales`

  **Dica**: *Utilize as seeders e o arquivo StoreManger.sql como apoio*.

</details>

---

<details>
  <summary><strong>Implemente a migration da tabela sales_products</strong></summary><br />

  1. A migration deve cobrir a seguinte estrutura:

  ``` js
    {
      productId:  // Inteiro, Primary Key, Foreign Key de products
      saleId:  // Inteiro, Primary Key, Foreign Key de sales
      quantity:  // Inteiro not null
    }
  ```

  2. O nome da tabela **DEVERÁ** ser `sales_products`

  **Dica**: *Utilize as seeders e o arquivo StoreManger.sql como apoio*.

</details>

---

<details>
  <summary><strong>Implemente a model da tabela products</strong></summary><br />

  1. A model deve cobrir a seguinte estrutura:

  ``` js
    {
      id:  // Inteiro, Primary Key
      name:  // Texto, not null
      quantity:  // Inteiro, not null
    }
  ```

  2. A model deve estar associada a tabela `products`

  3. A model **DEVERÁ** se chamar `Product`

  **Dica**: *Utilize as seeders e o arquivo StoreManger.sql como apoio*.

</details>

---

<details>
  <summary><strong>Implemente a model da tabela sales</strong></summary><br />

  1. A model deve cobrir a seguinte estrutura:

  ``` js
    {
      id:  // Inteiro, Primary Key
      date:  // Timestamp, not null
    }
  ```

  2. A model deve estar associada a tabela `sales`

  3. A model **DEVERÁ** se chamar `Sale`

  **Dica**: *Utilize as seeders e o arquivo StoreManger.sql como apoio*.

</details>

---

<details>
  <summary><strong>Implemente a model da tabela sales</strong></summary><br />

  1. A model deve cobrir a seguinte estrutura:

  ``` js
    {
      productId:  // Inteiro, Primary Key, Foreign Key de products
      saleId:  // Inteiro, Primary Key, Foreign Key de sales
      quantity:  // Inteiro not null
    }
  ```

  2. A model deve estar associada a tabela `sales`

  3. O relacionamento será de N:N

  4. A model **DEVERÁ** se chamar `SaleProduct`

  **Dica**: *Utilize as seeders e o arquivo StoreManger.sql como apoio*.

</details>
