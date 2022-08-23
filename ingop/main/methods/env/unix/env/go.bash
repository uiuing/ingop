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

# Change the environment variables for GO in the registry

# Check two common environment variable profiles
env_profiles=("$HOME"/.bash_profile )

if [ ! -f "$HOME"/.bash_profile ]; then
    touch "$HOME"/.bash_profile
fi

if [ -f "$HOME"/.zshrc ]; then
  env_profiles[${#env_profiles[@]}]=$HOME/.zshrc
fi

# Make variable files refresh every time they are opened
source_env="source \"\$HOME/.ingop/env/env.bash\" #!! InGop env profile !!"
for profile in "${env_profiles[@]}"; do
  if ! grep -q "$source_env" "$profile"; then
    echo -e "\n" >> "$profile"
    echo "$source_env" >> "$profile"
  fi
done

# Creating variable files
ingop_env_profile="$HOME"/.ingop/env/env.bash
if [ ! -f "$ingop_env_profile" ]; then
    touch "$ingop_env_profile"
fi

chmod 777 "$ingop_env_profile"

shell_top="#! /usr/bin/env bash"

if ! grep -q "$shell_top" "$ingop_env_profile"; then
  echo "$shell_top" >> "$ingop_env_profile"
fi

shell_content="export GOROOT=$HOME/.ingop/env/go
export GOPATH=$HOME/.ingop/env/go/workspace
export GOBIN=$HOME/.ingop/env/go/bin
export PATH=\$PATH:\$GOBIN"

if ! grep -q "$shell_content" "$ingop_env_profile"; then
  echo "$shell_content" >> "$ingop_env_profile"
fi

ln -s -f $HOME/.ingop/env/go/bin/* /usr/local/bin
