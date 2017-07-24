from flask import Flask,render_template,Blueprint,request,make_response,jsonify
from fingerprint.attributes_manager import *
from fingerprint.tags_manager import *
from fingerprint.acceptable_manager import *
from flask_babel import Babel
from datetime import datetime, timedelta
from functools import wraps

import env_config as config
import json
import hashlib
import sys

###### App
app = Flask(__name__)
app.debug = config.debug

attributes = Blueprint('site', __name__, static_url_path='', static_folder='fingerprint/attributes',url_prefix='/fp')
app.register_blueprint(attributes)

files,variables = get_files_and_variables()

variablesWithHTTP = [["User-Agent"],["Accept"],["Accept-Language"],["Accept-Encoding"],["Connection"]]
variablesWithHTTP.extend(variables)
definitions = get_definitions()

tagChecker = TagChecker()
tags = tagChecker.getTagList()

acceptableChecker = AcceptableChecker()

unspecifiedValue = "-"

@app.route('/')
def home():
    return render_template('fp.html', files=files, variables=variables, headers=request.headers)

#@app.route('/fpNoJS')
#def fpNoJS():
#
#    # If cookie is not present, we store
#    # the headers into the database
#    if "fpcentral" not in request.cookies:
#        headers = {}
#        # Transformation from array of tuples to dictionary
#        for key, value in request.headers:
#            headers[key] = value
#        db.storeFP(headers, False)
#
#    #Get total number of fingerprints
#    nbTotal = db.getNumberLifetimeFP()
#    #Get percentages of all HTTP headers
#    headersPer = []
#    for header in request.headers:
#        if header[0] != "Cookie":
#            headersPer.append(header+(db.getNumberFP({'name':header[0],"value":header[1]})*100/nbTotal,))
#
#    resp = make_response(render_template('fpNoJS.html', headers=headersPer, nbFP = nbTotal))
#
#    #We store a cookie if not present
#    if "fpcentral" not in request.cookies:
#        resp.set_cookie('fpcentral', 'true', expires=datetime.now() + timedelta(days=config.cookiesDays))
#
#    return resp
#
#@app.route('/tor')
#def tor():
#    return render_template('tor.html')
#
@app.route('/store', methods=['POST'])
def store():
    print("store")
    return json.dumps(db.storeFP(request.data,True))

###### Babel
babel = Babel(app)

@babel.localeselector
def get_locale():
    return request.accept_languages.best_match(config.LANGUAGES.keys())

###### DB
class Db(object):
#    ######Utility functions
#    # Hashing method using SHA-256
#    @staticmethod
#    def hashValue(value):
#        return hashlib.sha256(value.encode('ascii', 'ignore')).hexdigest()
#
#    # Method to get the date from the date string
#    @staticmethod
#    def getStartDate(date):
#        return datetime.strptime(date, '%Y-%m-%d')
#
#    # Method to add one day to the end date so that
#    # it takes the data collected during the day
#    @staticmethod
#    def getEndDate(date):
#        return datetime.strptime(date, '%Y-%m-%d') + timedelta(days=1)
#
#
#    ######Storage
    def storeFP(self,fingerprint,decode):
        try:
        
            if decode :
                parsedFP = json.loads(fingerprint.decode('utf-8'))
            else :
                parsedFP = fingerprint

            #Adding date
            parsedFP["date"] = datetime.utcnow()

            #Adding tags
            parsedFP["tags"] = tagChecker.checkFingerprint(parsedFP)

            output_dir = "outputs/"
            output_fn = output_dir + str(parsedFP["date"]) + '.txt' 

#            with open(output_fn, 'w+') as f:
#                for key in parsedFP:
#                    val = parsedFP[key]
#                    line = key + ':' + str(val) + '\n' 
#                    f.write(line)
        except Exception as e:
                         
            output_dir = "outputs/"
            output_fn = output_dir + str(parsedFP["date"]) + '.txt' 

#            with open(output_fn, 'w+') as f:
#                f.write(e)

db = Db()


###### API
def jsonResponse(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        return jsonify(func(*args, **kwargs))
    return wrapper

if __name__ == '__main__':
    if len(sys.argv)>1 and sys.argv[1] == "updateTags":
        #Update the list of tags of all fingerprints
        db.updateTags()
    else:
        #Launch application
        app.run()
