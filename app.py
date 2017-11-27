from flask import Flask, render_template, request, url_for, jsonify
import os
from flask_cors import CORS, cross_origin
import base64

app =Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/apple", methods=['POST'])
def apple_BtoA():
    input_data = request.json
    img_path = url_for('static', filename='temps/')
    img_input = open('input.jpg', 'wb')
    # img_input = open(os.path.join(img_path, 'input.jpg'), 'wb')
    img_input.write(base64.b64decode(input_data))
    img_input.close()
    # a = {"model_dir": os.path.join('models/apple'), "input_file": os.path.join('static/input.png'),
    #      "output_file": os.path.join('static/output.png')}
    # # main(a)
    # output = open(os.path.join('static/output.png'), 'r')
    response = open('input.jpg', 'r').read()
    import pdb;pdb.set_trace()
    print(response)
    return jsonify(response=base64.b64encode(input_data))


if __name__ == "__main__":
    app.run()
