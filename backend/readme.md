A meta deste projeto é criar uma plataforma de mídias sociais. No final deste projeto, haverá:

   1- criação de perfis;
   2- adicionar amigos;
   3- compartilhar e criar postagens;
   4- adicionar comentários em postagens;
   5- recursos como feed de notícias personalizado; 
   6- chat em tempo real;

   Caso queira procurar por algum dado específico, pressione 'ctrl+f' e procure por: 
     "USER" para a sessão de usuários;
     "PUBLISHES" para a sessão de publicações;





   Descrição: 

    USER - SESSÃO DOS DADOS DOS USUÁRIOS

     SOBRE O LOGIN E SIGNIN
      O signin conta será feito pelo nome, email e senha;
      O login de uma conta será feito pelo nome ou email e senha;

     SOBRE OS TOKENS; 
      Após o usuário logar ou cadastrar, um token contendo o seu _id (mongoose) será ativado;
      Caso o usuário deslogue, o valor do token será alterado para 'null', e caso o usuário relogue, o token será realterado para o _id do usuário;
      Caso o token seja null, o usuário não poderá alterar ou deletar os dados da conta;
     
   PUBLISHES - SESSÃO DAS PUBLICAÇÕES:
 
