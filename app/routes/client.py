from flask import Blueprint, abort, render_template
client = Blueprint('client', __name__, static_folder='../static', static_url_path='../static', template_folder='../templates')

@client.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@client.route('/<page_name>')
def dynamic_page(page_name):
    try:
        return render_template(f'{page_name}.html')
    except:
        abort(404)
        raise
    
@client.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404
