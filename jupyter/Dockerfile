FROM jupyter/datascience-notebook

USER root

RUN echo "Installing dependencies" \
  && conda install -c conda-forge opencv \
  && apt-get update \
  && apt-get install -yqq tesseract-ocr \
  && apt-get install -yqq libtesseract-dev \
  && pip install opencv-python \
  && pip install tensorflow \
  && pip install mmcv