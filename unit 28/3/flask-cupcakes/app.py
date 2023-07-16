from flask import Flask, request, jsonify, render_template
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
connect_db(app)
debug = DebugToolbarExtension(app)

# Handle GET and POST requests for /api/cupcakes endpoint


@app.route('/api/cupcakes', methods=['GET', 'POST'])
def handle_cupcakes():
    if request.method == 'GET':
        # Get all cupcakes from the database and serialize them for JSON response
        cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
        return jsonify(cupcakes=cupcakes)
    elif request.method == 'POST':
        # Create a new cupcake based on JSON data in the request
        new_cupcake = Cupcake(
            flavor=request.json['flavor'],
            size=request.json['size'],
            rating=request.json['rating'],
            image=request.json.get('image', 'default_cupcake_image.jpg')
        )
        db.session.add(new_cupcake)
        db.session.commit()
        return jsonify(cupcake=new_cupcake.serialize()), 201


# Handle GET, PATCH, and DELETE requests for /api/cupcakes/<int:id> endpoint
@app.route('/api/cupcakes/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_cupcake(id):
    # Get a specific cupcake by ID or return a 404 error
    cupcake = Cupcake.query.get_or_404(id)

    if request.method == 'GET':
        # Serialize the cupcake data for JSON response
        return jsonify(cupcake=cupcake.serialize())
    elif request.method == 'PATCH':
        # Update a specific cupcake based on JSON data in the request
        cupcake.flavor = request.json.get('flavor', cupcake.flavor)
        cupcake.size = request.json.get('size', cupcake.size)
        cupcake.rating = request.json.get('rating', cupcake.rating)
        cupcake.image = request.json.get('image', cupcake.image)
        db.session.commit()
        return jsonify(cupcake=cupcake.serialize())
    elif request.method == 'DELETE':
        # Delete a specific cupcake
        db.session.delete(cupcake)
        db.session.commit()
        return jsonify(message='Deleted')


# Render the home.html template
@app.route('/')
def show_home_page():
    return render_template('home.html')
