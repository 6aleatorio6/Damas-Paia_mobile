FROM docker.io/node:20-slim

ARG API_LEVEL=33

ENV JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
ENV ANDROID_HOME="/opt/android-sdk"
ENV PATH="$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin"

# Instalar Java 17 e pré-requisitos
RUN dpkg --add-architecture i386 && apt-get update && apt-get install -y \
    openjdk-17-jdk \
    unzip \
    wget \
    libc6 \
    libc6:i386 \
    libncurses5:i386 \
    libstdc++6:i386 \
    libbz2-1.0:i386 \
    lib32z1 \
    libpulse0 \
    xvfb \
    x11vnc \
    fluxbox \
    wmctrl \
    pulseaudio \
    && rm -rf /var/lib/apt/lists/*
ENV DISPLAY=:0

# Baixando cmd-tools e movendo para a pasta correta
RUN mkdir -p "${ANDROID_HOME}/cmdline-tools" && \
    wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip -O "/tmp/tools.zip" && \
    unzip -q "/tmp/tools.zip" -d "${ANDROID_HOME}/cmdline-tools"  && \
    mv "${ANDROID_HOME}/cmdline-tools/cmdline-tools" "${ANDROID_HOME}/cmdline-tools/latest" && \
    rm "/tmp/tools.zip"

# Instalando SDK
RUN yes | sdkmanager --install "emulator" \
    "system-images;android-${API_LEVEL};default;x86_64" "platforms;android-${API_LEVEL}" "platform-tools"

RUN yes | sdkmanager --licenses

# Criando um AVD
RUN echo no | avdmanager create avd -n AndroidPaia -k "system-images;android-${API_LEVEL};default;x86_64" -d 1

ENV QT_QPA_PLATFORM=Xvfb

EXPOSE 5554 5555 5037

# Iniciar Xvfb e PulseAudio no background
CMD ["/bin/bash", "-c", "Xvfb :0 -screen 0 1280x800x24 & pulseaudio --start --exit-idle-time=-1 & ${ANDROID_HOME}/platform-tools/adb start-server && ${ANDROID_HOME}/emulator/emulator @AndroidPaia -gpu off -verbose"]
