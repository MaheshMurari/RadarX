from app import app, db
from models import User
 
with app.app_context():
    user = User(email="maheshmurari001@gmail.com", role="ar", password="123")
    db.session.add_all([user])
    db.session.commit()
    print("Users inserted ✅")