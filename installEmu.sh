#!/bin/bash

# SCRIPT DE INSTAÇÂO DO EMULADOR PARA UBUNTU
# ANDROID SUICIDIO NÂO FUNCIONA BEM EM CONTAINER

# ENV 
API_LEVEL=33
DEVICE_ID=25 #Pixel 5
ANDROID_HOME="${HOME}/Android/Sdk"
JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"


sudo apt-get update
sudo apt-get install -y openjdk-17-jdk 

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

check_and_set_variable "ANDROID_HOME" $ANDROID_HOME
check_and_set_variable "JAVA_HOME" $JAVA_HOME
check_and_set_variable "PATH" "$ANDROID_HOME/emulator:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"

# ANDROID SDK
local CMDLINE="${ANDROID_HOME}/cmdline-tools" 
local TOOLS_ZIP_TEMP="${ANDROID_HOME}/tools.zip" 

mkdir -p $PATH_CMDLINE
wget https://dl.google.com/android/repository/commandlinetools-linux-7583922_latest.zip  -O $PATH_TOOLS_ZIP
unzip -q $PATH_TOOLS_ZIP -d $PATH_CMDLINE  
mv "${$PATH_CMDLINE}/cmdline-tools" "${PATH_CMDLINE}/latest" 
rm $PATH_TOOLS_ZIP



# instalando o sdk
echo Y | sdkmanager --licenses  > /dev/null 
echo Y | sdkmanager --verbose --no_https "emulator" \
    "system-images;android-${API_LEVEL};default;x86_64" "platforms;android-${API_LEVEL}" "platform-tools"


echo no | avdmanager create avd -n AndroidPaia -k "system-images;android-${API_LEVEL};default;x86_64" -d $DEVICE_ID --force

npm install

echo "AS VARIÁVEIS DE AMBIENTE FORAM CONFIGURADAS E O EMULADOR FOI INSTALADO! REINICIE O TERMINAL PARA APLICAR AS ALTERAÇÕES."