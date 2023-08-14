from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/tiski'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    is_admin = db.Column(db.Boolean, default=False)

class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    status = db.Column(db.String, default='Acik')


@app.route('/login', methods=['POST'])
def login():
    print("Giriş yapma isteği alındı.")
    data = request.json
    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=username, password=password).first()

    if user:
        user_id = user.id
        is_admin = user.is_admin
        return jsonify({'message': 'Giriş başarılı', 'user_id': user_id, 'is_admin': is_admin})
    else:
        return jsonify({'message': 'Giriş başarısız'})

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    password = data['password']

    if not username or not password:
        return jsonify({'message': 'Kayıt başarısız, lütfen tüm alanları doldurun'})

    try:
        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'Kayıt başarılı'})
    except Exception as e:
        return jsonify({'message': f'Kayıt başarısız. Hata: {str(e)}'})
    
#Arıza kaydı oluşturma:    
@app.route('/complaint', methods=['POST'])
def create_complaint():
    data = request.json
    user_id = data['user_id']
    title = data['title']
    description = data['description']
    address = data['address']

    if not title or not description or not address:
        return jsonify({'message': 'Arıza kaydı oluşturulamadı, lütfen tüm alanları doldurun'})

    try:
        new_complaint = Complaint(user_id=user_id, title=title, description=description, address=address)
        db.session.add(new_complaint)
        db.session.commit()

        return jsonify({'message': 'Arıza kaydı oluşturuldu'})
    except Exception as e:
        return jsonify({'message': f'Arıza kaydı oluşturulamadı. Hata: {str(e)}'})
    
# Açık arıza kayıtları    
@app.route('/complaints/open', methods=['GET'])
def get_open_complaints():
    open_complaints = Complaint.query.filter_by(status='Acik').all()
    complaints = [{'id': c.id, 'user_id': c.user_id, 'title': c.title, 'description': c.description, 'address': c.address, 'status': c.status} for c in open_complaints]
    
    return jsonify({'complaints': complaints})

#Kullanıcının arıza katıylarını görebilmesi için:

@app.route('/user/<int:user_id>/complaints', methods=['GET'])
def get_user_complaints(user_id):
    user_complaints = Complaint.query.filter_by(user_id=user_id).all()
    complaints = [{'id': c.id, 'user_id': c.user_id, 'title': c.title, 'description': c.description, 'address': c.address, 'status': c.status} for c in user_complaints]
    
    return jsonify({'complaints': complaints})

# Çözümlenmiş arıza kayıtları:
@app.route('/complaints/solved', methods=['GET'])
def get_solved_complaints():
    solved_complaints = Complaint.query.filter_by(status='Cozumlendi').all()
    complaints = [{'id': c.id, 'user_id': c.user_id, 'title': c.title, 'description': c.description, 'address': c.address, 'status': c.status} for c in solved_complaints]
    
    return jsonify({'complaints': complaints})


    
    
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True, host='0.0.0.0', port=5000)    