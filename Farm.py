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
        self.cursor = self.__databaseObj.cursor()

    def saveData(self):
        print(self.cropType)
        for i in range(0, len(self.cropType)):
            statement = "update farmconfiguration set cropType='"+self.cropType[i]+"' where regionId="+str(i+1)
            statement1 = "update farmconfiguration set soilType='"+self.soilType[i]+"' where regionId="+str(i+1)
            statement2 = "update farmconfiguration set soilHumidityThreshold='"+self.soilHumidityLevel[i]+"' where regionId="+str(i+1)
            self.cursor.execute(statement)
            self.cursor.execute(statement1)
            self.cursor.execute(statement2)

        self.__databaseObj.commit()
        return True

    def getFarm(self):
        self.cursor.execute('select * from farmlocation')
        res = self.cursor.fetchall()
        self.cursor.execute('select * from farmconfiguration')
        result = {
            'farmLocation': res[0][0],
            'configuration': self.cursor.fetchall()
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

