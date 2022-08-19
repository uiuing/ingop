:: ----------------------------------------------------------------------------
::
:: Copyright (c) 2022-present The uiu Authors (uiuing.com). All rights reserved.
::
:: Licensed under the Apache License, Version 2.0 (the "License");
:: you may not use this file except in compliance with the License.
:: You may obtain a copy of the License at
::
::     http://www.apache.org/licenses/LICENSE-2.0
::
:: Unless required by applicable law or agreed to in writing, software
:: distributed under the License is distributed on an "AS IS" BASIS,
:: WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
:: See the License for the specific language governing permissions and
:: limitations under the License.
::
:: ----------------------------------------------------------------------------

:: Remove environment variables that may have an impact


@echo off
set USERregpath=HKEY_CURRENT_USER\Environment

:: config
set ingop_home=%USERPROFILE%\ingop
set GOBIN=%ingop_home%\env\go\bin
set GOPBIN=%ingop_home%\gop\bin

# Remove custom variables
Reg Delete "%USERregpath%" /v GOBIN /f
Reg Delete "%USERregpath%" /v GOPBIN /f

:: Remove from PATH
setlocal enabledelayedexpansion
for /f "tokens=3*" %%A in ('reg query "%USERregpath%" /v PATH') do set user_path=%%A%%B
set user_path=!user_path:%%GOPBIN%%=!
set user_path=!user_path:%%GOBIN%%=!

reg add "%USERregpath%" /v PATH /t REG_EXPAND_SZ /d "%user_path%;" /f

:: Removal of possible duplicate symbols
for /f "tokens=3*" %%A in ('reg query "%USERregpath%" /v PATH') do set user_path=%%A%%B
set user_path=!user_path:;;=;!
reg add "%USERregpath%" /v PATH /t REG_EXPAND_SZ /d "%user_path%" /f
