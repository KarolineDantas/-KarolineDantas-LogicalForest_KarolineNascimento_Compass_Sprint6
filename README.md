
<h1 align="center"> Automação da API ServeRest </h1> 

## Índice 

* [Sobre o projeto](#sobre-o-projeto)
* [Como executar o projeto](#como-executar-o-projeto)
* [Comandos importantes](#comandos-importantes)
* [Tecnologias utilizadas](#tecnologias-utilizadas)
* [Pessoas Contribuidoras](#pessoas-contribuidoras)



## Sobre o projeto
Olá! Este projeto foi criado para avaliação da Compass.uol. No programa de estágio da empresa, o principal desafio da Sprint 6 é elaborar um plano de teste sobre a [API ServeRest](https://serverest.dev/), bem como realizar a automação dos principais fluxos da aplicação.

Neste repositório você encontrará duas branches:
- Main, na qual está inserido o principal desafio da Sprint 6 do programa de bolsas de estágio da Compass;
- Develop, que contém os commits realizados durante a elaboração do projeto.





## Como executar o projeto
 - Primeiramente é necessário instalar o [NodeJs](https://nodejs.org/en/) e o [VSCode](https://code.visualstudio.com/download) em seu computador. Espera-se também que o Git esteja instalado;
 - Feito isto, crie uma pasta na área de trabalho da sua máquina. Copie e cole [minha URL do perfil](https://github.com/KarolineDantas/-KarolineDantas-LogicalForest_KarolineNascimento_Compass_Sprint6.git);
 - Abra a pasta criada, clique com o botão direito do mouse e selecione a opção "Git Bash Here". Escreva "git clone" e adicione a URL copiada; 
 
    ![Captura de tela 2022-08-28 105826 (3)](https://user-images.githubusercontent.com/107884724/187078659-9c269ac6-5487-45a7-a75d-29b6f771456d.png)

- Após isso, escreva "code ." para que o VSCode seja aberto.

  ![git code](https://user-images.githubusercontent.com/107884724/187077898-7d79e6b1-f6e5-4c2f-84e1-de957179fa5e.png)

- Será usado principalmente os seguintes arquivos:
  
  A) A pasta "integration" que contém os testes de cada uma das rotas da API ServeRest.
  
     ![integration](https://user-images.githubusercontent.com/107884724/192630017-fa41f89c-501c-4160-b9e4-ed2e07db9601.png)


  B) A pasta "services" que contém os arquivos: 
  - "serverest.service.js", que contém as asções que podemos realizar na API, como buscar usuários, cadastrar produtos, entre outros;
  - "validaServerest.service.js", que contém as validações das ações mencionadas anteriormente.
  
    ![service](https://user-images.githubusercontent.com/107884724/192630180-b797430e-e23c-40c3-8659-bdb547cbea86.png)

  


## Comandos importantes
- Para executar os testes, digite no terminal npm run cy:open:prod ou npm run cy:open:dev, dependendo do seu objetivo;
- Para gerar o report digite o comando npm run test.

## Tecnologias utilizadas
- Linguagem de programação JavaScript
- Biblioteca Mocha
- Node.js
- Git e GitHub
- VSCode
- Cypress

## Pessoas Contribuidoras
- Scrum Master Luís Augusto
- Colegas de estágio da Compass
