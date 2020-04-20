from dbConfig import dbConfig
import mysql.connector

class Farm:
    def __init__(self):
        self.__databaseObj = mysql.connector.connect(
            host=dbConfig['host'],
            user=dbConfig['user'],
            password=dbConfig['password'],
            port=dbConfig['port'],
            database=dbConfig['database']
        )


    def saveData(self):
        return ''

    def getFarm(self):
        cursor = self.__databaseObj.cursor()
        cursor.execute('select * from farmlocation')
        res = cursor.fetchall()
        cursor.execute('select * from farmconfiguration')
        result = {
            'farmLocation': res[0][0],
            'configuration': cursor.fetchall()
        }
        return result

    def getFarmLocation(self):
        return self.farmLocation

    def getCrop(self):
        return self.cropType

    def getSoilType(self):
        return self.soilType

    def getRegion(self):
        return self.region

    def getSoilHumidityLevel(self):
        return self.soilHumidityLevel

    def getIrrigationType(self):
        return self.irrigationType

    def setFarmLocation(self, farmLocation):
        self.farmLocation = farmLocation

    def setCrop(self, crops):
        self.cropType = crops

    def setSoilType(self, soilType):
        self.soilType = soilType

    def setRegion(self, regions):
        self.region = regions

    def setSoilHumidityLevel(self, soilHumidityLevel):
        self.soilHumidityLevel = soilHumidityLevel

    def setIrrigationType(self, irrigationType):
        self.irrigationType = irrigationType