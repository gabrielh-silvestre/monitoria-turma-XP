# Boas vindas ao repositório de revisão do Bloco 22!

Para desenvolver os exercicios, você deverá seguir as instruções a seguir. Fique atento a cada passo e, se tiver qualquer dúvida, nos chame no <a href="https://app.sli.do/event/xtvrdxyr" target="_blank">Slido</a> #vqv 🚀


Aqui você vai encontrar os detalhes de como estruturar sua API.

<details>
  <summary><strong>O que deverá ser desenvolvido</strong></summary><br />

  Hoje, você usará o pacote Express para criar uma API, revisar e consolidar **todos** os principais conceitos vistos até o momento.

  Você receberá instruções de como as rotas de sua API devem se comportar.
</details>

<details>
  <summary><strong>Antes de começar a desenvolver</strong></summary><br />
  
  1. Clone o repositório
  * `git@github.com:gabrielh-silvestre/monitoria-turma-XP.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd monitoria-turma-XP`

  Instale as dependencias com  `npm install`;

  2. **ATENÇÂO**
    - Os pacotes para a criação da API não veem instalados

</details>

<details>
  <summary><strong>Implementações Técnicas</strong></summary><br />
  
  1. Para executar os testes, a API *NÃO DEVE* estar em execução, os testes utiliza a mesma porta de sua API, portanto pode causar conflitos

</details>

<details>
  <summary><strong>Nos dê feedbacks sobre a revisão</strong></summary><br />
  
  1. Ao finalizar, não se esqueça de avaliar sua experiência preenchendo o formulário. Leva menos de 3 minutos

  <a href="https://forms.gle/6svqoD5p5bgPbxKz9" target="_blank">FORMULARIO DE AVALIAÇÃO</a>

</details>

## Requisitos

<details>
  <summary><strong>Implemente o endpoint GET /task</strong></summary><br />
  
  1. Implemente o endpoint GET /task para que retorne todos as tarefas do arquivo task.json.

  2. O endpoint deve retornar o seguinte: 

  ```json
    [
      {
        "id": 1,
        "title": "Ler o Course",
        "description": "Ver o Bloco 20.4",
        "completed": false
      },
      {
        "id": 2,
        "title": "Fazer os exercícios",
        "description": "Fazer os exercícios do dia",
        "completed": false
      },
      {
        "id": 3,
        "title": "Fazer os testes",
        "description": "Fazer os testes do projeto",
        "completed": true
      },
      {
        "id": 4,
        "title": "Fazer o deploy",
        "description": "Fazer o deploy do projeto",
        "completed": true
      }
    ]
  ```

  3. Será validado se retorna um array vazio caso não exista pessoas cadastradas

</details>

<details>
  <summary><strong>Implemente o endpoint POST /task</strong></summary><br />

  1. Implemente o endpoint POST /task para que possa cadastrar novas tarefas no arquivo task.json.

  2. Caso a tarefa seja cadastrada com sucesso sua API deve responder com o status ```201``` com com o seguinte body.

  ```json
    {
      "id": 5,
      "title": "Preencher o Forms",
      "description": "Preencher o forms ao final do dia",
      "completed": false
    }
  ```
  
  3. Será validado que não é possível cadastrar uma tarefa sem título
    - a resposta da API deve ser a seguinte mensagem
    
  ```json
    { "message": '"title" is required' }
  ```

  4. Será validado que não é possível cadastrar uma tarefa sem descrição
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": '"description" is required' }
  ```

  5. Será validado que não é possível cadastrar uma tarefa sem o status
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": '"completed" is required' }
  ```

  6. Será validado que não é possível cadastrar uma tarefa com status inválido
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": '"completed" must be a boolean' }
  ```

   7. Será validado que não é possível cadastrar uma tarefa com título com menos de 3 caracteres
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": '"title" length must be at least 3 characters long' }
  ```

   8. Será validado que não é possível cadastrar uma tarefa sem autenticação
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": 'Token não encontrado' }
  ```
</details>


<details>
  <summary><strong>Implemente o endpoint PUT /task</strong></summary><br />

  1. Implemente o endpoint PUT /task para que possa editar tarefas no arquivo task.json.
  
  2. Será validado que é possível editar uma tarefa com sucesso
    - a resposta da API deve ser a seguinte mensagem

  ```json
    {
      "id": 1,
      "title": "Começar o Talker Manager",
      "description": "Começar o projeto do bloco 22",
      "completed": false,
    }
  ```

  3. Será validado que não é possível editar uma tarefa sem título
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": "\"title\" is required" }
  ```
  
  4. Será validado que não é possível editar uma tarefa sem descrição
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": "\"description\" is required" }
  ```

  5. Será validado que não é possível editar uma tarefa que não existe
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": "Task not found" }
  ```

  6. Será validado que não é possível editar uma tarefa com título com menos de 3 caracteres
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": "\"title\" length must be at least 3 characters long" }
  ```

  8. Será validado que não é possível editar uma tarefa sem autenticação
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": "Token não encontrado" }
  ```
</details>


<details>
  <summary><strong>Implemente o endpoint DELETE /task/:id</strong></summary><br />

  1. Implemente o endpoint PUT /task/:id para que possa deletar tarefas no arquivo task.json.
  
  2. Será validado que é possível deletar uma tarefa com sucesso retornando o status 200

  3. Será validado que não é possível deletar uma tarefa que não existe
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": "Task not found" }
  ```
  4. Será validado que não é possível editar uma tarefa sem autenticação
    - a resposta da API deve ser a seguinte mensagem

  ```json
    { "message": "Token não encontrado" }
  ```
</details>
