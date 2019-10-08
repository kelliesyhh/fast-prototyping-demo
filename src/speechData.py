from flask import Flask, render_template, request, jsonify, redirect
from flask_cors import CORS
from flask_caching import Cache
import json
import os
from werkzeug.contrib.cache import SimpleCache, MemcachedCache

app = Flask(__name__)
CORS(app)
cache = Cache(config={'CACHE_TYPE': 'simple'}, with_jinja2_ext=False)
cache.init_app(app)

class Cache(object):
    cache = SimpleCache(threshold = 1000, default_timeout = 100)
    # cache = MemcachedCache(servers = ['127.0.0.1:11211'], default_timeout = 100, key_prefix = 'my_prefix_')

    @classmethod
    def get(cls, key = None):
        return cls.cache.get(key)

    @classmethod
    def delete(cls, key = None):
        return cls.cache.delete(key)

    @classmethod
    def set(cls, key = None, value = None, timeout = 0):
        if timeout:
            return cls.cache.set(key, value, timeout = timeout)
        else:    
            return cls.cache.set(key, value)

    @classmethod
    def clear(cls):
        return cls.cache.clear()

@app.route("/postToFlask", methods=['POST'])
def postToFlask():
  data = request.data
  decoded = data.decode("utf-8")
  id = 1
  Cache.set(value = decoded, key = id)
  print(decoded)
  returnData = [dict(dialogue=decoded)]
  # return "Cached {0}".format(id)
  return jsonify(returnData)

@app.route("/getResponse", methods=['GET'])
def getResponse():
  id = 1
  data = Cache.get(key = id)
  print(data)
  #returnData = [dict(dialogue=data)]
  returnData = generate_result_from_model(data)
  # return "From cache {0}".format(data)
  return jsonify(returnData)

def generate_result_from_model(text_input):
	"""Do something here"""
	result = [dict(symptom='Swelling', activity=text_input, extent='-', time='-', frequency='-', location='-'),
						dict(nosymptom='-')]
	""" socket connection to the service of the model"""
	return result

@app.route("/postSearch", methods=['POST'])
def postSearch():
  data = request.data
  decoded = data.decode("utf-8")
  id = 2
  Cache.set(value = decoded, key = id)
  print(decoded)
  
  dialogue = Cache.get(key=1)
  print(dialogue)
  delete, dialogue = dialogue.split(':"')
  dialogue, delete = dialogue.split('"}')
  print(dialogue)
  Cache.set(value = dialogue, key = 1)
  search = Cache.get(key=2)
  print(search)
  delete, search = search.split(':"')
  search, delete = search.split('"}')
  print(search)
  Cache.set(value = search, key = 2)

  return decoded

@app.route("/getSearch", methods=['GET'])
def getSearch(): 
  dialogue = Cache.get(key=1)
  print(dialogue) 
  search = Cache.get(key=2)
  print(search)
  result = dialogue.find(search)  
  print ("Substring found at index: ", result ) 
  if (result != -1): 
      print ("Contains given substring ") 
  else: 
      print ("Doesn't contains given substring") 

  fsLoc = dialogue.find(".")
  print(fsLoc)

  for i in range(0, result):
    if result != 0:
      fsLoc2 = 0

  if result < fsLoc:
    sentence = dialogue[fsLoc2:fsLoc]
    print("Running result < fsLoc")

  elif result > fsLoc:
    sentence = dialogue[fsLoc + 2: fsLoc + result + 1]
    print("Running result > fsLoc")
      
  print(sentence)
  return sentence

# running web app in local machine
if __name__ == '__main__':
  app.debug = True
  app.secret_key = 'super secret key'
  app.config['SESSION_TYPE'] = 'filesystem'

  # host = current IP address
  app.run(host='127.0.0.1', port='8000')