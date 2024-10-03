<p align="center" >
  <a href="" target="blank"><img src="https://raw.githubusercontent.com/6aleatorio6/Damas-Paia_mobile/main/src/assets/icon.png" width="200" alt="DAMASPAIA Logo" /></a>
</p>

<p>
    <p align="center">Jogo de Damas online multiplataforma</p>
</p>

## Descrição

Este é o repositório frontend mobile do projeto **Damas Paia**. Desenvolvido com React Native, Unistyles 2.0, Socket.io e TypeScript, oferece uma interface nativa e moderna.

## Status do Projeto

| Plataforma                                                   | Tecnologia   | Status       |
| ------------------------------------------------------------ | ------------ | ------------ |
| [Backend](https://github.com/6aleatorio6/Damas-Paia_backend) | NestJS       | Em andamento |
| [Mobile](https://github.com/6aleatorio6/Damas-Paia_mobile)   | React Native | Em andamento |
| Web                                                          | React        | Não iniciado |

## Funcionalidades do Mobile

Ele se integra perfeitamente com todas as [funcionalidades que o backend oferece](https://github.com/6aleatorio6/Damas-Paia_backend?tab=readme-ov-file#funcionalidades).

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
