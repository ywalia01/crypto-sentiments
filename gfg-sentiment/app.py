from flask import Flask
from flask import request, jsonify
from flask_cors import CORS, cross_origin
import os
from roibal import main

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/v1', methods=['GET'])
@cross_origin()
def get_analysis():
    choice = request.args.get('choice')
    count = request.args.get('num')
    res = main(choice, count)
    return jsonify(res)

@app.route('/', methods=['GET'])
@cross_origin()
def default():
    return "<h1>Twitter Crypto Sentiment Analysis Trading Tool<br><br></h1><h1>Built by @ywalia01</h1>"

if __name__ == '__main__':
    app.run(debug=True)