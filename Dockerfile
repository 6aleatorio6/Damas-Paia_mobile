FROM docker.io/node:20-slim

SHELL ["/bin/bash", "-c"]   

# instalar utilitários 
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# instalar o xpra como servidor de exibição http
RUN apt-get install ca-certificates && \
    mkdir -p "/usr/share/keyrings/" && \
    wget https://xpra.org/xpra.asc -O "/usr/share/keyrings/xpra.asc" && \
    wget "https://raw.githubusercontent.com/Xpra-org/xpra/master/packaging/repos/bookworm/xpra.sources" -O "/etc/apt/sources.list.d/xpra.sources" && \
    apt-get update && apt-get install -y xpra  \
    && rm -rf /var/lib/apt/lists/*

# dependencias do android sdk
RUN  apt-get update && apt-get install -y \
    openjdk-17-jdk \
    libdrm-dev libxkbcommon-dev libgbm-dev \
    libasound-dev libnss3 libxcursor1 libpulse-dev  \
    && rm -rf /var/lib/apt/lists/*


ARG API_LEVEL=33
ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
ENV ANDROID_HOME="/opt/android-sdk"
ENV PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin"

# Baixando cmd-tools e movendo para a pasta correta
RUN mkdir -p "${ANDROID_HOME}/cmdline-tools" && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip -O "/tmp/tools.zip" && \
    unzip -q "/tmp/tools.zip" -d "${ANDROID_HOME}/cmdline-tools"  && \
    mv "${ANDROID_HOME}/cmdline-tools/cmdline-tools" "${ANDROID_HOME}/cmdline-tools/latest" && \
    rm "/tmp/tools.zip"

# instalando o sdk
RUN yes Y | sdkmanager --licenses 
RUN yes Y | sdkmanager --verbose --no_https "emulator" \
    "system-images;android-${API_LEVEL};default;x86_64" "platforms;android-${API_LEVEL}" "platform-tools"


# Criando um AVD
RUN echo no | avdmanager create avd -n AndroidPaia -k "system-images;android-${API_LEVEL};default;x86_64" -d 1

# dependencias do android sdk
RUN  apt-get update && apt-get install -y \
    qtbase5-dev \
    libxcb-xinerama0 \
    libxcb-xkb1 \
    libxcb-cursor0 \
    xcb-cursor0 \
    libxkbcommon-x11-0 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

EXPOSE 10000
ENV QT_QPA_PLATFORM=xcb

CMD adb start-server && \
    xpra start  --start="emulator @AndroidPaia" --bind-tcp=0.0.0.0:10000