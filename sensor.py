from random import randint


class sensor:
    def __init__(self, id, status):
        self.sensorId = id
        self.sensorStatus = status
        self.sensorValue = 0
    def readData(self):
        pass


class waterControllerSensor(sensor):
    def __init__(self, id, status):
        sensor(id, status)
        self.max = 50
    def readData(self, updateCntr):
        if (self.sensorValue >= self.max):
            self.sensorValue = self.sensorValue - updateCntr
        else:
            self.sensorValue = self.sensorValue + updateCntr
        return self.sensorValue

class soilHumiditySensor(sensor):
    def __init__(self, id, status):
        self.sensor = sensor(id, status)
        self.max = 100

    def readData(self, updateCntr, isReset):
        if isReset == 'true':
            self.sensor.sensorValue = 0

        if (self.sensor.sensorValue <= self.max):
            self.sensor.sensorValue = self.sensor.sensorValue + updateCntr
        return self.sensor.sensorValue

