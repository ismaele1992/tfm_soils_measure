#!/bin/sh

sudo mongod --config /etc/mongod.conf
python /home/pi/Python_Scripts/lector_arduino/main.py >> logTemps.txt
