from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost:5432/deneme'
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

# Arıza kaydındaki detayları görebilmek için:
@app.route('/complaint/<int:complaint_id>', methods=['GET'])
def get_complaint_detail(complaint_id):
    complaint = Complaint.query.get(complaint_id)

    if complaint:
        complaint_data = {
            'id': complaint.id,
            'user_id': complaint.user_id,
            'title': complaint.title,
            'description': complaint.description,
            'address': complaint.address,
            'status': complaint.status,
            'memnuniyet': complaint.memnuniyet,
            'aciklama': complaint.aciklama,
            'note': complaint.note,
            'anket': complaint.anket
        }
        return jsonify({'complaint': complaint_data})
    else:
        return jsonify({'message': 'Arıza kaydı bulunamadı'})
    
@app.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)

    if user:
        return jsonify({'username': user.username})
    else:
        return jsonify({'message': 'Kullanıcı bulunamadı'})

   
@app.route('/complaint/<int:complaint_id>/status', methods=['POST'])
def update_complaint_status(complaint_id):
    data = request.json
    status = data['status']
    note = data['note']

    try:
        complaint = Complaint.query.get(complaint_id)
        complaint.status = status
        complaint.note = 'Not: ' + note
        db.session.commit()

        return jsonify({'message': 'Statü güncellendi'})
    except Exception as e:
        return jsonify({'message': f'Statü güncellenemedi. Hata: {str(e)}'})

# Memnuniyet anketi:
@app.route('/complaint/<int:complaint_id>/den', methods=['POST'])
def update_complaint_status2(complaint_id):
    data = request.json
    memnuniyet = data['memnuniyet']
    aciklama = data['aciklama']
    
    try:
        complaint = Complaint.query.get(complaint_id)
        complaint.memnuniyet = memnuniyet
        complaint.aciklama = aciklama
        complaint.anket = True
        db.session.commit()

        return jsonify({'message': 'Anket gönderildi.'})
    except Exception as e:
        return jsonify({'message': f'Anket gönderilmedi. Hata: {str(e)}'})  
    

# Kullanıcı detayı, güncelleme ve silme
@app.route('/api/users/<int:user_id>', methods=['GET', 'PUT', 'DELETE'])
def user_detail(user_id):
    if request.method == 'GET':
        user = User.query.get(user_id)
        user1 =  User.query.filter_by(id=user_id).all()
        users = [{'id': c.id, 'user_id': c.user_id, 'username': c.username, 'is_admin': c.is_admin, 'is_yetkili': c.is_yetkili } for c in user1]
    
        return jsonify({'users': users})
    elif request.method == 'PUT':
        data = request.json
        is_admin = data.get('is_admin')
        is_yetkili = data.get('is_yetkili')

        user = User.query.get(user_id)
        if user:
            user.is_admin = is_admin
            user.is_yetkili = is_yetkili
            db.session.commit()
            return jsonify({'message': 'Kullanıcı düzenlendi'})
        else:
            return jsonify({'message': 'Kullanıcı bulunamadı'}), 404

    elif request.method == 'DELETE':
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return jsonify({'message': 'Kullanıcı silindi'})
        else:
            return jsonify({'message': 'Kullanıcı bulunamadı'}), 404


@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if request.method == 'GET':
        users = User.query.filter((User.is_admin == True) | (User.is_yetkili == True)).all()
        user_list = [{'id': u.id, 'username': u.username, 'is_admin': u.is_admin, 'is_yetkili': u.is_yetkili} for u in users]
        return jsonify({'users': user_list})

    elif request.method == 'POST':
        data = request.json
        username = data['username']
        password = data['password']
        is_admin = data['is_admin']
        is_yetkili = data['is_yetkili']
        print(data,"aaaaaa")
        if not username or not password:
            return jsonify({'message': 'Kullanıcı adı ve şifre alanları zorunludur.'}), 400

        try:
            new_user = User(username=username, password=password, is_admin=is_admin, is_yetkili=is_yetkili)
            db.session.add(new_user)
            db.session.commit()

            return jsonify({'message': 'Kullanıcı eklendi'})
        except Exception as e:
            return jsonify({'message': 'Kullanıcı eklenirken bir hata oluştu. Hata: ' + str(e)}), 500


# Anketi tamamlanmış arıza kayıtları:
@app.route('/anketget', methods=['GET'])
def get_completed_surveys():
    completed_surveys = Complaint.query.filter_by(anket=True).all()
    survey_list = [{'id': s.id, 'user_id': s.user_id, 'title': s.title, 'description': s.description, 'address': s.address, 'status': s.status, 'note': s.note, 'memnuniyet': s.memnuniyet, 'aciklama': s.aciklama, 'anket': s.anket} for s in completed_surveys]
    return jsonify({'anket': survey_list})
      





    
    
    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        app.run(debug=True, host='0.0.0.0', port=5000)    