# Varejo API

Esse é um projeto [Node.js] básico de API utilizando [Restify], [Mongoose] e [TypeScript]. Consiste em uma API REST para a busca de produtos.

A API final pode ser testada em: https://pacific-escarpment-70312.herokuapp.com/products

Esse projeto também utiliza o projeto-irmão [varejo-front] para mostrar os dados visualmente.

## Rodando localmente
Para rodar localmente garanta que tenha instalado o [Node.js] e o [MongoDB]. 

Após basta executar os seguintes comandos abaixo no seu terminal.

  ```sh
  $ git clone https://github.com/erickmenezes/varejo-api.git
  $ cd varejo-api
  ```

Para instalar as depêdencias do projeto, basta executar:

  ```sh
  $ npm install
  ```

Caso queira popular o banco de dados com uma base de produtos, difite no terminal: 

  ```sh
  $ mongoimport --host localhost:27017 --db varejo --collection Product --file db/seeds/products.json --drop --jsonArray --verbose
  ```

Atenção para o parâmetro --host, que deve ser o mesmo utilizado pelo seu banco NoSQL.

Com tudo pronto, basta executar:

  ```sh
  $ npm start
  ```

Com isso, a aplicação estará rodando em http://localhost:8080.

## Chamando a API

O endpoint gerado pelo app é: http://localhost:8080/products. Esse endpoint irá buscar por todos os produtos cadastrados na base. A partir dele é possível filtrar as buscas utilizando query parameters na URL. Segue abaixo os parâmetros disponíveis:

### Parâmetros
* *limit (default: 8)*: Limita o resultado da consulta pelo número passado
* *page (default: 1)*: Retorna os produtos da página do consulta feita.
* Qualquer campo do modelo ([refs]) definido será utilizado para filtrar a busca. Por exemplo, passando *category=Toalha*, a API irá buscar todos os produtos dessa categoria.

OBS: No caso específico do parâmetro *category*, a consulta utilizará um LIKE na hora de buscar pela mesma.

É possível executar as chamadas via o browser de sua escolha ou pode ser utilizado ferramentas, como [Postman], feitas para testar API RESTs.

### Resposta
A API irá retornar um JSON com os seguintes atributos:
* *count*: Total de produtos encontrados
* *page*: Página atual (a que está sendo retornada)
* *totalPages*: Total de páginas para a consulta atual
* *previous*: Chamada REST para página anterior
* *next*: Chamada REST para página seguinte
* *results*: Lista de produtos encontrados baseados nos parâmetros enviados

#### Produto
O modelo utilizado nessa API consiste nos seguintes campos:
* *name*: Nome
* *type*: Tipo/Classificação
* *size*: Tamanho/Quantidade
* *category*: Categoria
* *oldPrice*: Preço antigo
* *price*: Preço atual
* *images*: Lista dos caminhos das imagens.

   [Node.js]: <http://nodejs.org>
   [TypeScript]: <https://www.typescriptlang.org/>
   [Restify]: <http://restify.com/>
   [MongoDB]: <https://www.mongodb.com/>
   [Mongoose]: <https://mongoosejs.com/>
   [Postman]: <https://www.getpostman.com/>
   [refs]: <https://github.com/erickmenezes/varejo-api/blob/master/app/models/Product.ts>
   [varejo-front]: <https://github.com/erickmenezes/varejo-front>
