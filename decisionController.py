from dbConfig import dbConfig
import mysql.connector
class DecisionController:
    def __init__(self, operationType):

        self.__operationType = operationType

    def fetchConfigurationValues(self):
        __databaseObj = mysql.connector.connect(
            host=dbConfig['host'],
            user=dbConfig['user'],
            password=dbConfig['password'],
            port=dbConfig['port'],
            database=dbConfig['database']
        )
        conn = __databaseObj.cursor()
        conn.execute('select * from farmconfiguration')
        res = conn.fetchall()
        print(res)
        conn.close()
        __databaseObj.close()
        return res

    def setBufferData(self, data):
        self.__data = data

    def readBufferData(self):
        return self.__data

    def compareConfigurationValues(self):
        configValues = self.fetchConfigurationValues()
        data = self.readBufferData()
        for i in range(0, len(configValues)):
            if (configValues[i][1] == int(data['regionId'])):
                if (configValues[i][4] > int(data['sensorValue'])):
                    data['actuatorStart'] = True
                else:
                    data['actuatorStart'] = False
        return data


'''d = DecisionController('start')
d.setBufferData({
    'regionId': 1,
    'sensorValue': 80
})
d.fetchConfigurationValues()'''
#print(d.compareConfigurationValues())
