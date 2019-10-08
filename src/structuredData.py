from flask import Flask, make_response, request, current_app, flash, url_for, session, render_template, jsonify, redirect
from datetime import timedelta
from functools import update_wrapper
from flask_cors import CORS, cross_origin
import json
import os
import pandas as pd
from werkzeug.contrib.cache import SimpleCache, MemcachedCache
from werkzeug.utils import secure_filename
from firebase import Firebase

app = Flask(__name__)
cors = CORS(app)

UPLOAD_FOLDER = os.getcwd()
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif', 'csv'])

class Cache(object):
    cache = SimpleCache(threshold=1000, default_timeout=100)
    # cache = MemcachedCache(servers = ['127.0.0.1:11211'], default_timeout = 100, key_prefix = 'my_prefix_')

    @classmethod
    def get(cls, key=None):
        return cls.cache.get(key)

    @classmethod
    def delete(cls, key=None):
        return cls.cache.delete(key)

    @classmethod
    def set(cls, key=None, value=None, timeout=0):
        if timeout:
            return cls.cache.set(key, value, timeout=timeout)
        else:
            return cls.cache.set(key, value)

    @classmethod
    def clear(cls):
        return cls.cache.clear()


def array(list):
    string = ""
    for x in list:
        string += str(x)
    return string


@app.route("/", methods=['POST', 'GET'])
def hello():
    data = request.body
    return "hello world"

# processes frontend input and removes unnecessary info
@app.route("/postToFlask", methods=['POST'])
def postToFlask():
    data = request.data
    data = data.decode("utf-8")
    Cache.set(value=data, key=11)
    print(data)
    df1, df2 = data.split("]],[[")
    df1row1, df1row2, df1row3, df1row4 = df1.split("],[")
    remove, df1row1 = df1row1.split("[[[")
    df2row1, df2row2, df2row3, df2row4 = df2.split("],[")
    df2row4, remove = df2row4.split("]]]}")
    Cache.set(value=df1row1, key=1)
    Cache.set(value=df1row2, key=2)
    Cache.set(value=df1row3, key=3)
    Cache.set(value=df1row4, key=4)
    Cache.set(value=df2row1, key=5)
    Cache.set(value=df2row2, key=6)
    Cache.set(value=df2row3, key=7)
    Cache.set(value=df2row4, key=8)
    return jsonify(df1row1)

# prints/returns the content of the dataframe
@app.route("/getInputTable", methods=['GET'])
def getInputTable():
    df1row1 = Cache.get(key=1)
    df1row2 = Cache.get(key=2)
    df1row3 = Cache.get(key=3)
    df1row4 = Cache.get(key=4)
    df2row1 = Cache.get(key=5)
    df2row2 = Cache.get(key=6)
    df2row3 = Cache.get(key=7)
    df2row4 = Cache.get(key=8)

    def print_input(row1, row2, row3, row4):
        data = Cache.get(key=11)
        if len(data) != 0:
            labels = ["t1", "t2", "t3", "t4"]
            r1c1, r1c2, r1c3, r1c4 = row1.split(",")
            r2c1, r2c2, r2c3, r2c4 = row2.split(",")
            r3c1, r3c2, r3c3, r3c4 = row3.split(",")
            r4c1, r4c2, r4c3, r4c4 = row4.split(",")
            dataDict = {'col1': [r1c1, r2c1, r3c1, r4c1], 'col2': [r1c2, r2c2, r3c2, r4c2],
                        'col3': [r1c3, r2c3, r3c3, r4c3], 'col4': [r1c4, r2c4, r3c4, r4c4]}
            df = pd.DataFrame(data=dataDict, index=labels)
            print(df)

            def checkNullAndProcess(x):
                if x == '""':
                    newx = "-"
                else:
                    remove1, newx, remove2 = x.split('"')
                return newx

            for label, content in df.items():
                newdf = df[label].apply(func=checkNullAndProcess)
                print(newdf)
                df.update(newdf)

            print(df)
            result = df.to_dict('records')
            return result
 	
 	# arranges input into dataframes, based on rows (which were arranged in postToFlask() function)
    df1 = print_input(df1row1, df1row2, df1row3, df1row4)
    df2 = print_input(df2row1, df2row2, df2row3, df2row4)
    Cache.set(value=df1, key=9)
    Cache.set(value=df2, key=10)
    return jsonify(df1)

# the array for generating the risk table is made here
@app.route("/getResponse", methods=['GET'])
def getResponse():
    df1row1 = Cache.get(key=1)
    df1row2 = Cache.get(key=2)
    df1row3 = Cache.get(key=3)
    df1row4 = Cache.get(key=4)
    df2row1 = Cache.get(key=5)
    df2row2 = Cache.get(key=6)
    df2row3 = Cache.get(key=7)
    df2row4 = Cache.get(key=8)

    def generate_result_from_model(row1, row2, row3, row4):
        data = Cache.get(key=11) # this is the original data sent from the front-end
        # # insert relevant code for processing data. if you need to access the dataframes, you can use
        # df1 = Cache.get(key=9) and df2 = Cache.get(key=10)
        
        # add in model here
        if len(data) != 0:
            r1c1, remove, remove, remove = row1.split(",")
            r2c1, remove, remove, remove = row2.split(",")
            r3c1, remove, remove, remove = row3.split(",")
            r4c1, remove, remove, remove = row4.split(",")

        labels = ["t1", "t2", "t3", "t4"]
        dataDict = {'TimePoint': labels, 'RiskLevel': [r1c1, r2c1, r3c1, r4c1]}
        df = pd.DataFrame(data=dataDict)
        # this function checkNullAndProcess() can be replaced with code of model
        def checkNullAndProcess(x):
            if x == '""':
                x = 0
            elif x == '"cough"':
                x = 1
            elif x == '"headache"':
                x = 2
            elif x == '"dizziness"':
                x = 3
            elif x == '"vomiting"':
                x = 4
            return x

        # this code can be replaced with code of model
        for label, content in df.items():
            newdf = df[label].apply(func=checkNullAndProcess)
            print(newdf)
            df.update(newdf)
        print(df)

        result = df.to_dict('records')
        return result

    # although two dataframes are returned here, only one will be used in the risk table and risk graph generated
    # on the front end. you should probably be able to just return one dataframe after adding in the model
    # i am returning it this way because i'm not sure how the model would look like
    model_result1 = generate_result_from_model(df1row1, df1row2, df1row3, df1row4)
    model_result2 = generate_result_from_model(df2row1, df2row2, df2row3, df2row4)
    return jsonify(model_result1, model_result2)

# this is used for uploading files
@app.route("/uploadFiles", methods=['GET', 'POST'])
def uploadFiles():
    # setting up firebase
    config = {
        "apiKey": "AIzaSyD0wAoRVft_vRP0EZQ7qLMlcZplyL7mAeA",
        "authDomain": "structured-data-demo.firebaseapp.com",
        "databaseURL": "https://structured-data-demo.firebaseio.com",
        "projectId": "structured-data-demo",
        "storageBucket": "structured-data-demo.appspot.com",
        "messagingSenderId": "367739181740",
        "appId": "1:367739181740:web:90132fda49be89e3"
    }
    # firebase = pyrebase.initialize_app(config)
    firebase = Firebase(config)
    filename = request.data
    filename = filename.decode("utf-8")
    remove, filename = filename.split(':"')
    filename, remove = filename.split('"}')
    print(filename)
    storage = firebase.storage()
    url = storage.child("uploads/" + filename + ".csv").get_url(None)
    print(url)
    cwd = os.getcwd()
    if (cwd.find('uploads')) == -1:
      cwd = cwd + "\\uploads"
    print(cwd)
    os.chdir(cwd)
    storage.child("uploads/" + filename).download(filename)
    return jsonify(cwd)

# feature importance model
@app.route("/featureImportance", methods=['GET', 'POST'])
def feature_importance_model():
    # insert code for model here
    dataDict = {'colNo': ["col1", "col2", "col3", "col4"], 'importanceLvl': [100, 15, 15, 20]}
    df = pd.DataFrame(data=dataDict)

    model_result = df.to_dict('records')
    print(model_result)

    return jsonify(model_result)


# running web app in local machine
if __name__ == '__main__':
    app.debug = True
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    # host = current IP address
    app.run(host='127.0.0.1', port='5000')
