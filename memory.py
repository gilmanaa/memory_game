from bottle import route, run, template, static_file, request
import os


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

def main():
    run(host='localhost', port=7000)

if __name__ == '__main__':
    main()