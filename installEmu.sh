#!/bin/bash

# SCRIPT DE INSTAÇÂO DO EMULADOR PARA UBUNTU
# ANDROID SUICIDIO NÂO FUNCIONA BEM EM CONTAINER

API_LEVEL=33


check_and_set_variable() {
    local var_name=$1
    local var_value=$2
    local bashrc_file="$HOME/.bashrc"

    if ! grep -q $var_name -- $bashrc_file; then
        echo "export $var_name=\"$var_value\"" >> "$bashrc_file"
    else
        sed -i "s|^export $var_name=.*|export $var_name=\"$var_value\"|" "$bashrc_file"
    fi

    export "$var_name"="$var_value"
}

check_and_set_variable "ANDROID_HOME" "${HOME}/Android/Sdk"
check_and_set_variable "JAVA_HOME" "/usr/lib/jvm/java-17-openjdk-amd64"
check_and_set_variable "PATH" "$PATH:$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin"


sudo apt-get update

# JAVA
sudo apt-get install -y openjdk-17-jdk 

# ANDROID SDK
mkdir -p "${ANDROID_HOME}/cmdline-tools" && \
wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip  -O "/tmp/tools.zip" && \
unzip -q "/tmp/tools.zip" -d "${ANDROID_HOME}/cmdline-tools"  && \
mv "${ANDROID_HOME}/cmdline-tools/cmdline-tools" "${ANDROID_HOME}/cmdline-tools/latest" && \
rm "/tmp/tools.zip"



# instalando o sdk
echo Y | sdkmanager --licenses  > /dev/null 
echo Y | sdkmanager --verbose --no_https "emulator" \
    "system-images;android-${API_LEVEL};default;x86_64" "platforms;android-${API_LEVEL}" "platform-tools"


echo no | avdmanager create avd -n AndroidPaia -k "system-images;android-${API_LEVEL};default;x86_64" -d 19 --force

npm install

echo "AS VARIÁVEIS DE AMBIENTE FORAM CONFIGURADAS E O EMULADOR FOI INSTALADO! REINICIE O TERMINAL PARA APLICAR AS ALTERAÇÕES."