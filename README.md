<p align="center" >
  <a href="" target="blank"><img src="https://raw.githubusercontent.com/6aleatorio6/Damas-Paia_mobile/main/src/assets/icon.png" width="200" alt="DAMASPAIA Logo" /></a>
</p>

<p>
    <p align="center">Jogo de Damas online multiplataforma</p>
</p>

## Descrição

Este é o repositório frontend mobile do projeto **Damas Paia**. Desenvolvido com React Native, Unistyles 2.0, Socket.io e TypeScript, oferece uma interface nativa e moderna.

| Plataforma                                                   | Tecnologia   | Status       |
| ------------------------------------------------------------ | ------------ | ------------ |
| [Backend](https://github.com/6aleatorio6/Damas-Paia_backend) | NestJS       | Em andamento |
| [Mobile](https://github.com/6aleatorio6/Damas-Paia_mobile)   | React Native | Em andamento |
| Web                                                          | React        | Não iniciado |


## Downloads

Baixe a última versão do app: [damas-paia_release](https://github.com/6aleatorio6/Damas-Paia_mobile/releases/latest/download/damas-paia_release.apk)

> **Observação:** O backend está hospedado no Heroku através do plano de estudante, e pretendo mantê-lo online até **01/04/2025**.

## Funcionalidades do Mobile

O **DamasPaia Mobile** se integra perfeitamente com todas as [funcionalidades que o backend oferece](https://github.com/6aleatorio6/Damas-Paia_backend?tab=readme-ov-file#funcionalidades).

### 1. Autenticação Convencional

A autenticação convencional permite que os usuários criem suas contas e façam login utilizando um nome de usuário e senha. 

<p>
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/577237b4ff2a2dd8244ccfd1c2c5c8e27441fcd2/cadastrar.gif" alt="Cadastrar" width="200" />
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/577237b4ff2a2dd8244ccfd1c2c5c8e27441fcd2/entrar.gif" alt="Entrar" width="200" />
</p>

### 2. Login por OAuth2

Para uma experiência de autenticação ainda mais rápida e conveniente, o **DamasPaia Mobile** oferece a opção de login e cadastro através de provedores de OAuth2, como Google, Facebook e Discord.

<p>
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/577237b4ff2a2dd8244ccfd1c2c5c8e27441fcd2/google.gif" alt="Login com Google" width="200" />
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/577237b4ff2a2dd8244ccfd1c2c5c8e27441fcd2/facebook.gif" alt="Login com Facebook" width="200" />
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/577237b4ff2a2dd8244ccfd1c2c5c8e27441fcd2/discord.gif" alt="Login com Discord" width="200" />
</p>

### 3. Manipulação da Conta

Os usuários têm total controle sobre suas contas, podendo facilmente sair, editar informações pessoais ou deletar suas contas.

<p>
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/3abe65caf625c3460a10deae3bbb599a958ec0ef/sair.gif" alt="Sair" width="200" />
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/3abe65caf625c3460a10deae3bbb599a958ec0ef/deletar.gif" alt="Deletar Conta" width="200" />
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/3abe65caf625c3460a10deae3bbb599a958ec0ef/editarNome.gif" alt="Editar Nome" width="200" />
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/3abe65caf625c3460a10deae3bbb599a958ec0ef/editarSenha.gif" alt="Editar Senha" width="200" />
</p>

### 4. Pareamento e Jogo de Damas

Os usuários podem encontrar partidas facilmente na fila de pareamento. As partidas são compostas por dois jogadores que se alternam em turnos, com a possibilidade de capturar peças do adversário e promover peças para damas. A partida termina quando um jogador fica sem peças, desiste ou se desconecta.

<p>
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/7258f0b052824b803a8265bd2f57ffefeedbba81/pareamentoEjogo.gif" alt="Pareamento e uma partida de damas" width="776" />
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/7212e1febe5e9ae5abf83fcb227d938fafc9c97a/promocaoDamaEfimDejogo.gif" alt="Promoção para dama e fim de jogo por um jogador não ter mais peças" width="224" />
</p>

> **Nota:** O GIF à direita mostra uma versão antiga do jogo. As animações de movimentação e captura foram melhoradas, e um áudio foi adicionado ao capturar uma peça.

### 5. Atualização OTA e Build a Cada Release pelo GitHub Actions

Este recurso automatiza o processo de atualização do aplicativo usando **EAS Update** e GitHub Actions. A cada nova release publicada, o workflow realiza as seguintes etapas:

- **Build do APK**: Gera um arquivo APK do aplicativo.
- **Upload do APK**: Anexa o APK à release no GitHub.
- **Atualização OTA**: Publica a nova versão para os usuários.

**Modal com as informações da versão instalada:**
<p >
  <img src="https://gist.githubusercontent.com/6aleatorio6/ed8cc379ee1ad319cca1dd8604f006de/raw/015b3bec893e5b4198c0b21159d6c728fc3bfc7c/infoApp.gif" alt="Abrindo modal com as informações do app" width="200" />
</p>

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

Para executar o aplicativo localmente, siga os passos abaixo:

1. Inicialize o [backend](https://github.com/6aleatorio6/Damas-Paia_backend) localmente e ajuste a variável `EXPO_PUBLIC_API_URL` para apontar para ele.

   > **Nota:** Se o backend estiver rodando em `localhost`, utilize esse comando para redirecionar a porta do emulador para escutar a porta do seu PC:
   >
   > ```bash
   > adb reverse tcp:xxxx tcp:xxxx
   > ```
   >
   > Por exemplo, se o backend estiver em `http://localhost:3000`, use:
   >
   > ```bash
   > adb reverse tcp:3000 tcp:3000
   > ```
   >
   > Isso permitirá que o emulador acesse o backend em execução na sua máquina local.

2. Devido ao uso do **Unistyles**, o Expo deve ser executado apenas em modo `development build`.

3. Inicie o Expo. Observe que a primeira execução pode demorar mais.

   - Se você instalou o emulador pelo script `installEmu.sh`, utilize o comando abaixo para abrir no emulador Android:

     ```bash
     npm run android
     ```

   - Se você instalou o emulador por outros meios, utilize:

     ```bash
     npx expo run:android
     ```

## Criador

- **Autor:** Leonardo L. Felix
  - **Email:** [leonardolfelix12@gmail.com](mailto:leonardolfelix12@gmail.com)
  - **GitHub:** [6aleatorio6](https://www.github.com/6aleatorio6)
