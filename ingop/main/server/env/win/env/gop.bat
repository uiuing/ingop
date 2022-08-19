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

:: Change the environment variables for GO in the registry

@echo off
set USERregpath=HKEY_CURRENT_USER\Environment

:: config
set goplus_home=%USERPROFILE%\goplus
set GOPBIN=%goplus_home%\gop\bin

:: env-GOPBIN
reg add "%USERregpath%" /v GOPBIN /t REG_SZ /d "%GOPBIN%" /f

:: Locate and append GOPBIN to the PATH variable
setlocal enabledelayedexpansion
for /f "tokens=3*" %%A in ('reg query "%USERregpath%" /v PATH') do set user_path=%%A%%B
set user_path=!user_path:%%GOPBIN%%=!

:: Update the new PATH to the registry
reg add "%USERregpath%" /v PATH /t REG_EXPAND_SZ /d "%user_path%;%%GOPBIN%%;" /f

:: Removal of possible duplicate symbols
for /f "tokens=3*" %%A in ('reg query "%USERregpath%" /v PATH') do set user_path=%%A%%B
set user_path=!user_path:;;=;!
reg add "%USERregpath%" /v PATH /t REG_EXPAND_SZ /d "%user_path%" /f
