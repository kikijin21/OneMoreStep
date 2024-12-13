from app import db, Subscriber

# 查询所有订阅者
with db.app.app_context():
    subscribers = Subscriber.query.all()
    for subscriber in subscribers:
        print(f"ID: {subscriber.id}, Email: {subscriber.email}")
