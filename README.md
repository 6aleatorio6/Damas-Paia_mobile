<p align="center" >
  <a href="" target="blank"><img src="https://raw.githubusercontent.com/6aleatorio6/Damas-Paia_mobile/main/src/assets/icon.png" width="200" alt="DAMASPAIA Logo" /></a>
</p>

<p>
    <p align="center">Jogo de Damas online multiplataforma em desenvolvimento</p>
</p>

## Descrição

**DamasPaia Mobile** é o frontend mobile de um jogo de damas online, integrado a um backend em NestJS e uma futura interface web. Desenvolvido com React Native, Unistyles 2.0 e TypeScript, oferece uma interface nativa e moderna.

| Plataforma                                                   | Tecnologia   | Status       |
| ------------------------------------------------------------ | ------------ | ------------ |
| [Backend](https://github.com/6aleatorio6/Damas-Paia_backend) | NestJS       | Em andamento |
| [Mobile](https://github.com/6aleatorio6/Damas-Paia_mobile)   | React Native | Em andamento |
| Web                                                          | React        | Não iniciado |
| Desktop                                                      | Não definido | Não iniciado |

## Funcionalidades do Mobile

- [x] **Cadastro e Autenticação:** Cadastro e login de usuários com token JWT.
- [x] **Gerenciamento de Sessão:** Revalidação de tokens para manter sessões seguras.
- [x] **Comunicação com Backend:** Integrações para operações de cadastro, login e autenticação.
- [x] **Edição de Conta:** Alteração de informações de perfil e exclusão de conta.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/6aleatorio6/Damas-Paia_mobile.git
   ```

2. Acesse o diretório do projeto:

   ```bash
   cd Damas-Paia_mobile
   ```

3. Crie um arquivo `.env` usando o `.env.example` como base:

   ```bash
   cp .env.example .env
   ```

4. Instale as dependencias:

   ```bash
   npm install
   ```

5. Instale o emulador e o JDK:

   Use script `installEmu.sh` para instalar automaticamente o JDK e o emulador Android, funcionando apenas em sistemas Debian/Ubuntu.

   ```bash
   chmod +x ./installEmu.sh && ./installEmu.sh
   ```

## Executando a Aplicação

Devido ao uso do **Unistyles**, o Expo funciona apenas em modo `development build`.

- Se instalou o emulador pelo script `installEmu.sh`, você pode usar o comando abaixo para desenvolver pelo emulador Android:

  ```bash
  npm run android
  ```

## Testes de integração

Para executar os testes de integração, utilize o comando abaixo:

```bash
npm run test
```

### Resultados dos Testes

Abaixo está uma captura de tela dos testes do projeto:

![Captura de tela dos testes](tests.print.png)

## Criador

- **Autor:** Leonardo L. Felix
  - **Email:** [leonardolfelix12@gmail.com](mailto:leonardolfelix12@gmail.com)
  - **GitHub:** [6aleatorio6](https://www.github.com/6aleatorio6)
