from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
import os

# 初始化 Flask 应用
app = Flask(__name__)


# 配置密钥（用于消息闪现）
app.secret_key = 'your_secret_key'

# 配置数据库（SQLite 示例）
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 数据库模型：Subscriber
class Subscriber(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)

# 数据库模型：User
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

# 初始化数据库（仅需运行一次）
def create_tables():
    db.create_all()

# 路由：主页
@app.route('/')
def home():
    return render_template('index.html')

# 路由：About Us 页
@app.route('/about')
def about():
    return render_template('about.html')

# 路由：Contact 页面


@app.route('/contact')
def contact():
    return render_template('contact.html')

# 路由：处理订阅请求


@app.route('/subscribe', methods=['POST'])
def subscribe():
    email = request.json.get('email')

    # 检查是否已订阅
    existing_subscriber = Subscriber.query.filter_by(email=email).first()
    if existing_subscriber:
        print("Email already subscribed")
        return jsonify({'message': 'Email already subscribed'}), 400

    # 保存新订阅
    new_subscriber = Subscriber(email=email)
    db.session.add(new_subscriber)
    db.session.commit()
    print(f"Email saved: {email}")

    return jsonify({'message': 'Subscription successful!'}), 200

# 路由：处理 Contact 表单提交


@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    # 验证表单数据是否填写完整
    if not name or not email or not message:
        flash('All fields are required!', 'error')
        return redirect(url_for('contact'))

    # 模拟保存数据到后端（打印到终端）
    print(f"Message received from {name} ({email}): {message}")
    flash('Your message has been sent successfully!', 'success')

    return redirect(url_for('contact'))

# 路由：Sign Up 页面


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        # 检查用户是否已存在
        if User.query.filter_by(username=username).first():
            flash('Username is already taken!', 'error')
            return redirect(url_for('signup'))

        if User.query.filter_by(email=email).first():
            flash('Email is already registered!', 'error')
            return redirect(url_for('signup'))

        # 保存新用户
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        flash('Registration successful! Please log in.', 'success')
        return redirect(url_for('login'))

    return render_template('signup.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        # 检查用户是否存在并验证密码
        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            flash('Login successful! Redirecting to Home...', 'success')  # 成功消息
            return render_template('login.html', redirect_home=True)  # 在页面中触发跳转
        else:
            flash('Login failed. Please check your email or password.', 'error')  # 失败消息
            return redirect(url_for('login'))  # 保留在 login 页面

    return render_template('login.html', redirect_home=False)


@app.route('/solution')
def solution():
    return render_template('solution.html')


# 启动 Flask 应用
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # 初始化数据库表
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
