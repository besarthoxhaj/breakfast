#!/usr/bin/env bash

read -p "Your name? " name
if [[ $name = $USER ]]; then
  echo "Hello, me."
else
  echo "Hello, $name."
fi