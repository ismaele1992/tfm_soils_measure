'''
Created on 5 ene. 2017

@author: Ismael
'''

import serial
import time
from time import strftime
from mongo_controller import MongoController

class LeerUSB(object):
    
    CADENA = ''
    pSerie = None

    def __init__(self):
        self.pSerie = serial.Serial(port='/dev/ttyUSB0', 
              baudrate=9600, 
              parity=serial.PARITY_NONE, 
              stopbits=serial.STOPBITS_ONE, 
              bytesize=serial.EIGHTBITS, 
              timeout = 0)
        
    def LeerDesdeUSB(self):
        while True:
            print "Esperando datos..."
            a = self.pSerie.readall()
            valores = a.split('#')
            print valores
            if len(valores) > 1:
                self.MandarBD(valores[0], valores[1], valores[2])
            time.sleep(5)
            
    def MandarBD(self, id_sensor, temp, hum):
        fecha = strftime("%d/%m/%Y %H:%M:%S")
        mController = MongoController()
        mController.InsertarTemperaturas(id_sensor, temp, hum, fecha)
