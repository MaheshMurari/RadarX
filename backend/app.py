from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models import db
from routes.upload_routes import upload_bp
from routes.match_routes import match_bp
from routes.email_routes import email_bp 

load_dotenv()

app = Flask(__name__)
CORS(app, supports_credentials=True)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# DB setup
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'match_results.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Register blueprints
app.register_blueprint(upload_bp)
app.register_blueprint(match_bp)
app.register_blueprint(email_bp)



@app.route("/")
def home():
    return "RadarX Backend is running! 🚀"

# Optional: print routes
for rule in app.url_map.iter_rules():
    print("📌 Route:", rule)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
