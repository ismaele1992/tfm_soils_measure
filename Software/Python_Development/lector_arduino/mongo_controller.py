'''
Created on 17 abr. 2017

@author: Ismael
'''

from pymongo import MongoClient
import time
from time import strftime

class MongoController(object):
    
    host = 'localhost'
    port = 27017
    dbname = 'materiales'
    collectionname = 'VariablesAmbientales'
    ruta = 'mongodb://localhost:27017/'
    client = None

    def __init__(self):
        self.client = MongoClient(self.host, self.port)     
        
    def InsertarTemperaturas(self, id_sensor, temperatura, humedad, fecha):
        materiales = self.client.materiales
        insercion = {"id_sensor" : id_sensor, "hum" : humedad, "temp" : temperatura, "fecha" : fecha}
        materiales.VariablesAmbientales.insert_one(insercion)
