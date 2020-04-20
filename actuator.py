class actuator:
    def __init__(self, id):
        self.id = id

    def setActuatorStatus(self, status):
        self.actuatorStatus = status

    def getActuatorId(self):
        return self.id

    def getActuatorStatus(self):
        return self.actuatorStatus
