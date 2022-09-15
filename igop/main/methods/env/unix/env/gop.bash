#! /usr/bin/env bash

# ----------------------------------------------------------------------------
#
# Copyright (c) 2022-present The uiu Authors (uiuing.com). All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# ----------------------------------------------------------------------------

if ! ping -c 1 -W 3 google.com > /dev/null; then
  export GO111MODULE=on
  export GOPROXY="https://goproxy.cn,direct"
fi

cd $HOME/.igop/gop
source $HOME/.igop/env/env.bash && go run cmd/make.go --build || $HOME/.igop/env/go/bin/go run cmd/make.go --build

# Check two common environment variable profiles
env_profiles=("$HOME"/.bash_profile )

if [ ! -f "$HOME"/.bash_profile ]; then
    touch "$HOME"/.bash_profile
fi

if [ -f "$HOME"/.bashrc ]; then
   env_profiles[${#env_profiles[@]}]="$HOME"/.bashrc
fi

if [ -f "$HOME"/.zshrc ]; then
  env_profiles[${#env_profiles[@]}]=$HOME/.zshrc
fi

# Make variable files refresh every time they are opened
source_env="[[ -s \"\$HOME/.igop/env/env.bash\" ]] && source \"\$HOME/.igop/env/env.bash\" #!!Environment variables required by IGop "
for profile in "${env_profiles[@]}"; do
  if ! grep -q "$source_env" "$profile"; then
    echo -e "\n" >> "$profile"
    echo "$source_env" >> "$profile"
  fi
done

# Creating variable files
igop_env_profile="$HOME"/.igop/env/env.bash
if [ ! -f "$igop_env_profile" ]; then
    touch "$igop_env_profile"
fi

chmod 777 "$igop_env_profile"

shell_top="#! /usr/bin/env bash"

if ! grep -q "$shell_top" "$igop_env_profile"; then
  echo "$shell_top" >> "$igop_env_profile"
fi

shell_content="export GOPBIN=$HOME/.igop/gop/bin
export PATH=\$PATH:\$GOPBIN"

if ! grep -q "$shell_content" "$igop_env_profile"; then
  echo "$shell_content" >> "$igop_env_profile"
fi

go_proxy_profile="export GO111MODULE=on
export GOPROXY=https://goproxy.cn,direct"

if ! ping -c 1 -W 3 google.com > /dev/null; then
  if ! grep -q "$go_proxy_profile" "$igop_env_profile"; then
    echo "$go_proxy_profile" >> "$igop_env_profile"
  fi
fi

ln -s -f $HOME/.igop/gop/bin/* /usr/local/bin
