from Farm import Farm
class UserInterface:
    def __init__(self):
        self.farm = Farm()


    def systemOperation(self):
        return

    def checkSystemStatus(self):
        return

    def setFarmData(self, data):
        self.farm.setFarmLocation(data['farmLocation'])
        self.farm.setSoilHumidityLevel([item[4] for item in data['configuration']])
        self.farm.setRegion([item[1] for item in data['configuration']])
        self.farm.setCrop([item[2] for item in data['configuration']])
        self.farm.setSoilType([item[3] for item in data['configuration']])
        #self.farm.saveData()
        return {'status': self.farm.saveData() }

    def setOperationMode(self):
        return

    def getOperationMode(self):
        return self.operationMode

    def getCurrentReport(self):
        return

    def getCurrentSensorValues(self):
        return

    def getCurrentActuatorStatus(self):
        return

    def getWeeklySchedule(self):
        return

    def setWeeklySchedule(self):
        return

    def getFarmConfigurationValues(self):
        return self.farm.getFarm()

