from flask import Flask, request
from flask import render_template
from decisionController import DecisionController
app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/getActuatorStatus', methods=['POST'])
def getActuatorStatus():
    data = request.json
    d.setBufferData(data)
    return d.compareConfigurationValues()

@app.route('/farmConfiguration')
def farmConfiguration():
    return render_template('farm_config.html')
    
if __name__ == '__main__':
    d = DecisionController('start')
    app.run(debug=True)