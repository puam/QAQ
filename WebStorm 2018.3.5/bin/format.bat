@ECHO OFF

::----------------------------------------------------------------------
:: WebStorm formatting script.
::----------------------------------------------------------------------

SET IDE_BIN_DIR=%~dp0
CALL "%IDE_BIN_DIR%\webstorm.bat" format %*
