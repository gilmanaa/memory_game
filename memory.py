from bottle import route, run, template, static_file, debug
import os
from sys import argv

DEBUG = os.environ.get("DEBUG")
debug(True)

@route('/')
def index():
    return template(os.path.dirname(__file__) + '/index.html')

@route('/<filename:re:.*\.css>')
def styles(filename):
    return static_file(filename, root="")

@route('/<filename:re:.*\.js>')
def javascripts(filename):
    return static_file(filename, root="")

@route('/<filename:re:.*\.(jpg|jpeg|png|gif|ico)>')
def images(filename):
    return static_file(filename, root="")

if DEBUG:
	run(host='localhost', port=7000)
else:
	run(host='0.0.0.0', port=argv[1])