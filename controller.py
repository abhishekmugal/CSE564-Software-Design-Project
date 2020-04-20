from sensor import waterControllerSensor, soilHumiditySensor
from actuator import actuator
class controller:
    def __init__(self, id):
        self.controllerId = id
        self.sensorValue = 0
        self.actuator = actuator(id)

    def setControllerStatus(self, controllerStatus):
        self.controllerStatus = controllerStatus

    def getControllerStatus(self):
        return self.controllerStatus

    def readSensorValue(self):
        pass

    def controlActuator(self, status):
        self.actuator.setActuatorStatus(status)

    def sendSensorValue(self):
        return self.sensorValue


class waterController(controller):
    def __init__(self, id):
        controller.__init__(id)
        self.sensor = waterControllerSensor(id, 'start')
        self.motorOperation = 'stop'
        self.frequency = 900 #in hz


    def readSensorValue(self, updateCntr):
        self.sensorValue = self.sensor.readData(updateCntr)
        return self.sensorValue

    def setMotorStatus(self, status):
        self.motorOperation = status


class dripController(controller):
    def __init__(self, id):
        controller(id)
        self.sensor = soilHumiditySensor(id, 'start')
        self.frequency = 900 #in hz

    def readSensorValue(self, updateCntr, isReset):
        self.sensorValue = self.sensor.readData(updateCntr, isReset)
        return self.sensorValue



