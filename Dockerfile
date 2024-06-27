FROM docker.io/openjdk:17-alpine

# Instalar Java 17 usando apk (Alpine Linux) e pre requisitos
RUN apk update && \
    apk add --no-cache nodejs npm \
    wget \
    unzip 

# Variaveis de ambiente
# ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk"    
ENV ANDROID_HOME=/opt/android-sdk
ENV PATH=$PATH:$ANDROID_HOME
ENV PATH=$PATH:$ANDROID_HOME/emulator
ENV PATH=$PATH:$ANDROID_HOME/tools
ENV PATH=$PATH:$ANDROID_HOME/cmdline-tools/bin
ENV PATH=$PATH:$ANDROID_HOME/build-tools/bin
ENV PATH=$PATH:$ANDROID_HOME/platform-tools


# baixando commandlinetools 
RUN  mkdir -p "${ANDROID_HOME}" && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip?hl=pt-br -q -O /tmp/tools.zip && \
    unzip -q /tmp/tools.zip -d "${ANDROID_HOME}/" && \
    rm /tmp/tools.zip

# baixando e instalando sdk via commandlinetools
RUN yes | sdkmanager  --sdk_root="${ANDROID_HOME}" \ 
    "platform-tools" \
    "tools" \
    "platforms;android-33" \
    "build-tools;33.0.0" \
    "emulator" \
    "system-images;android-33;default;x86_64" 

# criando um AVD
RUN echo no | avdmanager create avd -n AndroidPaia -k "system-images;android-33;default;x86_64"  \
    --force && \
    rm -r ${ANDROID_HOME}/build-tools

# pasta de trabalho
WORKDIR /app

# instalar dependencias
COPY package*.json .
# RUN npm install

# copiar arquivos
COPY . .


# Comando para iniciar o emulador e o npm
CMD [ "emulator" ,"@AndroidPaia"]