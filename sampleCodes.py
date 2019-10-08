# must have for all Flask apps
app = Flask(__name__)
CORS(app)

# Cache class, needed when using cached data
class Cache(object):
    cache = SimpleCache(threshold = 1000, default_timeout = 100)
    
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

# axios post and get
@app.route("/postMethod", methods=['POST'])
def postMethod():
  data = request.data
  decoded = data.decode("utf-8")
  # setting values in cache
  Cache.set(value = decoded, key = 1)
  print(decoded)
  return jsonify(decoded)
@app.route("/getMethod", methods=['GET'])
def getMethod():
  # getting values from cache
  data = Cache.get(key = 1)
  print(data)
  return jsonify(data)

# using firebase on the backend
from firebase import Firebase
@app.route("/firebaseMethod", methods=['GET', 'POST'])
def firebaseMethod():
    # setting up firebase
    config = {
        # get this from your firebase instance
    }
    firebase = Firebase(config)
    filename = request.data
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

# running web app in local machine
if __name__ == '__main__':
  app.debug = True
  app.secret_key = 'super secret key'
  app.config['SESSION_TYPE'] = 'filesystem'

  # host = current IP address, port number = anything you want
  app.run(host='127.0.0.1', port='8000')