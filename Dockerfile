FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install nodejs npm -y
RUN apt-get install python3-pip -y
RUN pip3 install django

ENV HOME /home

COPY curriculumMAP /home/curriculumMAP

EXPOSE 3000
EXPOSE 8000

STOPSIGNAL SIGTERM
