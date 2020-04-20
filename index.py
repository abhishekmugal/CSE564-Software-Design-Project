from flask import Flask, request
from flask import render_template, json
from flask_cors import CORS
from decisionController import DecisionController
from UserInterface import UserInterface
from controller import dripController
app = Flask(__name__)
CORS(app)


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/getActuatorStatus', methods=['POST'])
def getActuatorStatus():
    data = request.json
    d.setBufferData(data)
    res = d.compareConfigurationValues()
    print(res)
    return res

@app.route('/getFarmConfiguration', methods=['GET'])
def getFarmConfiguration():
    return u.getFarmConfigurationValues()

@app.route('/saveFarmConfigurationDetails', methods=['POST'])
def saveFarmConfigurationDetails():
    data = request.json
    return u.setFarmData(data)

@app.route('/farmConfiguration')
def farmConfiguration():
    return render_template('farm_config.html')

def chunker_list(seq, size):
    return (seq[i::size] for i in range(size))

@app.route('/getSensorValues', methods=['GET'])
def getSensorValues():
    res = []
    cntr = request.args.get('cntr')
    reset =request.args.get('isReset')
    print(reset)
    for i in range(0, len(controllers)):
        res.append(
            { 'val': controllers[i].readSensorValue(int(cntr), reset) }
        )
    print(list(chunker_list(res, 4)))
    res = list(chunker_list(res, 4))
    return json.dumps(res)
if __name__ == '__main__':
    d = DecisionController('start')
    u = UserInterface()
    controllers = []
    for i in range(1, 9):
        controllers.append(dripController(i))
    app.run(debug=False, port=80, host='0.0.0.0')