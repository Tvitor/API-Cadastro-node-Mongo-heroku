---
description: Sistema de cadastro de usuários.
---

# Node + express + mongodb

### Projeto

> O presente projeto tem por finalidade criar uma api com os endpoints de registro , login e busca e um usuário

### Arquitetura

> A arquitetura da api teve influência do MVC, apesar de não haver o view, foi criado um model para os métodos e o controller paras as rotas.

```text
> config
    > auth.json
    > index.js
    > mongo.js
> src
    >controllers
        >authconrollers.js
        >usercontrollers.js
    >middleware
        >tokenverify.js
    >models
        >token.js
        >user.js
        >userdata.js
        >userschema.js
```
### config
> Arquivos de inicialização e de conexão com o banco

### controllers
> rotas de autenticação/busca e rotas de registro e login

### middleware
> lógica de verificação do token

### models
> lógicas da regra de negócio 

## endpoints

### POST registrar

```text
http://localhost:3000/user/register

{
	"nome": "developer",
	"email":"dev@dev.com",
	"senha":"1234",
	"telefones":[
			{
				"numero":"998766544",
				"ddd":"21"
			},
			{
				"numero":"999966544",
				"ddd":"21"
			}
		]
}
```
### GET logar

```text
http://localhost:3000/user/login

{
	"email":"dev+@dev.com",
	"senha":"1234"
}
```
### GET buscar

```text
http://localhost:3000/auth/searchuser

header token autentication + parametro id

```