#!/bin/bash

# Package this addon to the upper directory.
FILE_PATH="../firefox-youtube-chat.zip"
if [ -f $FILE_PATH ]; then
  echo "File '$FILE_PATH' already exists and will be overriten."
fi

zip -r -FS $FILE_PATH * --exclude '*.git' --exclude 'build.sh'
echo "Addon has been packaged in '$FILE_PATH'."
