from flask import Flask, render_template, make_response, request, url_for
import os
app =Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/apple", methods=['POST'])
def apple_BtoA():
    if request.method == 'POST':
        print(request.form['data'])

        input_data = request.form['data']
        img_path = url_for('static', filename='temps/')
        img_input = open(os.path.join(img_path, 'input.png'), 'wb')
        img_input.write(input_data)
        img_input.close()
        # a = {"model_dir": os.path.join('models/apple'), "input_file": os.path.join('static/input.png'),
        #      "output_file": os.path.join('static/output.png')}
        # main(a)
        # output = open(os.path.join('static/output.png'), 'r')
        # response = output.read()
        return request.data


if __name__ == "__main__":
    app.run()
