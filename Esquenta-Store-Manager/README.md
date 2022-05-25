# Boas vindas ao repositório de revisão do Bloco 23!

Para desenvolver os exercicios, você deverá seguir as instruções a seguir. Fique atento a cada passo e, se tiver qualquer dúvida, nos chame no <a href="https://app.sli.do/event/xtvrdxyr" target="_blank">Slido</a> #vqv 🚀


Aqui você vai encontrar os detalhes de como estruturar sua API utilizando a arquitetura de camadas.

<details>
  <summary><strong>O que deverá ser desenvolvido</strong></summary><br />

  Hoje, você usará o pacote Express seguindo a arquitetura de camadas e a arquitetura Rest e Restfull para criar uma API, revisar e consolidar **todos** os principais conceitos vistos até o momento.

  Você receberá instruções de como as rotas de sua API devem se comportar.
</details>

<details>
  <summary><strong>Antes de começar a desenvolver</strong></summary><br />
  
  1. Clone o repositório
  * `git clone git@github.com:gabrielh-silvestre/monitoria-turma-XP.git`.
   * Altere para a branch ```esquenta.store.manager```,
~~~json
git checkout esquenta.store.manager
~~~
  * Entre na pasta do projeto ,
  ```Esquenta Store Manager```.


  Instale as dependencias com  `npm install`;

  2. **ATENÇÂO**
    - Os pacotes para a criação da API **NÃO** estão instalados

</details>

<details>
  <summary><strong>Docker</strong></summary><br />
  
  1. Para executar a aplicação, será necessário criar os containers de mysql e node:

~~~json
docker-compose up -d --build
~~~

  2. Esse comando criará um banco de dados na porta 3306, então certifique-se de que não haverá nenhum banco rodando nessa porta

  3. Para rodar a aplicação, será necessário entrar no container de node:

~~~json
docker exec -it esquenta_monitoria bash
~~~

  E logo depois rodar o comando:

~~~json
npm run dev
~~~

</details>

<details>
  <summary><strong>Implementações Técnicas</strong></summary><br />
  
  1. Para executar os testes, a API *DEVE* estar em execução
  2. Toda vez que rodar os testes, o seu banco será *DERRUBADO*, então rode o comando

~~~json
npm run restore
~~~

  3. **ATENÇÂO**
    - O arquivo EsquentaMonitoria.sql não pode ser alterado ou excluído

  4. Esse projeto utilizará variáveis de ambiente
    - O arquivo .env não pode ser alterado ou excluído

</details>

<details>
  <summary><strong>Nos dê feedbacks sobre a revisão</strong></summary><br />
  
  1. Ao finalizar, não se esqueça de avaliar sua experiência preenchendo o formulário. Leva menos de 3 minutos

  <a href="https://forms.gle/6svqoD5p5bgPbxKz9" target="_blank">FORMULARIO DE AVALIAÇÃO</a>

</details>

## Requisitos

<details>
  <summary><strong>Implemente o endpoint GET /talkers</strong></summary><br />
  
  1. Implemente o endpoint GET /talkers para que retorne todos as pessoas palestrantes do banco de dados.

  2. O endpoint deve retornar o status 200 com o seguinte corpo: 

  ```json
    [
      {
        "idTalker": 1,
        "nameTalker": "Henrique Albuquerque",
        "ageTalker": 62,
        "emailTalker": "henrique.albuquerque10@gmail.com"
      },
      {
        "idTalker": 2,
        "nameTalker": "Heloísa Albuquerque",
        "ageTalker": 67,
        "emailTalker": "heloisa.albuquerque10@gmail.com"
      },
      {
        "idTalker": 3,
        "nameTalker": "Ricardo Xavier Filho",
        "ageTalker": 33,
        "emailTalker": "ricardo.xavier10@gmail.com"
      },
      {
        "idTalker": 4,
        "nameTalker": "Marcos Costa",
        "ageTalker": 24,
        "emailTalker": "marcos.costa2022@gmail.com"
      }
    ]
  ```

</details>

<details>
  <summary><strong>Implemente o endpoint GET /talkers/:id</strong></summary><br />
  
  1. Implemente o endpoint GET /talkers/:id para que retorne apenas uma pessoa palestrante do banco de dados.

  2. O endpoint deve retornar o status 200 com o seguinte corpo: 

  ```json
    {
      "idTalker": 1,
      "nameTalker": "Henrique Albuquerque",
      "ageTalker": 62,
      "emailTalker": "henrique.albuquerque10@gmail.com"
    }      
  ```

  3. Caso não exista a pessoa palestrante
    - sua API deve responder com o status ```404``` com com o body no seguinte formato

  ```json
    { "message": '"talker" not found' }
  ```

</details>

<details>
  <summary><strong>Implemente o endpoint POST /talkers</strong></summary><br />

  1. Implemente o endpoint POST /talkers para que possa cadastrar novas pessoas palestrantes no banco de dados.

  2. Caso a pessoas pelastrante seja cadastrada com sucesso, sua API deve responder com o status ```201``` com com o body no seguinte formato.

  ```json
    {
      "idTalker": 5,
      "nameTalker": "João da Matta",
      "ageTalker": 32,
      "emailTalker": "joao.matta2016@gmail.com"
    }
  ```
  
  3. Será validado que não é possível cadastrar uma nova pessoa palestrante sem nome
    - sua API deve responder com o status ```400``` com com o body no seguinte formato
    
  ```json
    { "message": '"name" is required' }
  ```

  4. Será validado que não é possível cadastrar uma nova pessoa palestrante com o nome menor que quatro caracteres
    - sua API deve responder com o status ```400``` com com o body no seguinte formato
    
  ```json
    { "message": '"name" length must be at least 4 characters long' }
  ```

  5. Será validado que não é possível cadastrar uma nova pessoa palestrante sem a idade
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"age" is required' }
  ```

  6. Será validado que não é possível cadastrar uma nova pessoa palestrante se a idade for menor que 18 anos
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"age" must be greater than or equal to 18' }
  ```

  7. Será validado que não é possível cadastrar uma nova pessoa palestrante sem o email
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"email" is required' }
  ```

  8. Será validado que não é possível cadastrar uma nova pessoa palestrante com o formato do email inválido
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": '"email" must be a valid email' }
  ```
</details>


<details>
  <summary><strong>Implemente o endpoint PUT /talker/:id</strong></summary><br />

  1. Implemente o endpoint PUT /talker/:id para que possa editar talkers no banco de dados.
    - A pessoa palestrante que será editada, será passado pelo endpoint /:id
  
  2. Será validado que é possível editar uma pessoas palestrante com sucesso
    - a resposta da API deve ser a seguinte mensagem

```json
  {
    "idTalker": "1",
    "nameTalker": "João da Matta",
    "ageTalker": 22,
    "emailTalker": "joao.matta@gmail.com"
  }
```

  3. Será validado que não é possível editar uma pessoa palestrante sem nome
    - sua API deve responder com o status ```400``` com com o body no seguinte formato
    
  ```json
    { "message": '"name" is required' }
  ```

  4. Será validado que não é possível editar uma pessoa palestrante com o nome menor que quatro caracteres
    - sua API deve responder com o status ```400``` com com o body no seguinte formato
    
  ```json
    { "message": '"name" length must be at least 4 characters long' }
  ```

  5. Será validado que não é possível editar uma pessoa palestrante sem a idade
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"age" is required' }
  ```

  6. Será validado que não é possível editar uma pessoa palestrante se a idade for menor que 18 anos
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"age" must be greater than or equal to 18' }
  ```

  7. Será validado que não é possível editar uma pessoa palestrante sem o email
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"age" is required' }
  ```

  8. Será validado que não é possível editar uma pessoa palestrante com o formato do email inválido
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"email" must be a valid email' }
  ```

  9. Será validado que não é possível editar uma pessoa palestrante que não existe
    - sua API deve responder com o status ```400``` com com o body no seguinte formato

  ```json
    { "message": '"talker" not found' }
  ```
</details>


<details>
  <summary><strong>Implemente o endpoint DELETE /talkers/:id</strong></summary><br />

  1. Implemente o endpoint PUT /talkers/:id para que possa deletar uma pessoa palestrante
     - A pessoa palestrante que será deletada, será passado pelo endpoint /:id
  
  2. Será validado que é possível deletar uma pessoa palestrante com sucesso retornando o status 200 e sem um resposta no corpo.

  3. Será validado que não é possível deletar uma pessoa palestrante que não existe.
     - sua API deve responder com o status ```400``` com com o body no seguinte formato

```json
{ "message": '"talker" not found' }
```
</details>
