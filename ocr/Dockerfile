FROM python:3.8
RUN apt-get update
RUN apt-get install -yqq tesseract-ocr
RUN apt-get install -yqq libtesseract-dev

WORKDIR /app
ADD . .