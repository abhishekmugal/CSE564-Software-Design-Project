from flask import Flask
from flask import render_template
app = Flask(__name__)


@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/farmConfiguration')
def farmConfiguration():
    return render_template('farm_config.html')
    
if __name__ == '__main__':
    app.run(debug=True)