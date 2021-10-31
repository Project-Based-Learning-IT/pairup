class Messages(db.Model):
    __tablename__ = 'Messages'
    Message_ID = db.Column(db.Integer, primary_key=True)
    Sender_ID = db.Column(db.Integer, nullable=False, unique=False)
    Receiver_ID = db.Column(db.Integer, nullable=False, unique=False)
    text = db.Column(db.String(200), nullable=False, unique=False)
    timestamp = db.Column(db.DateTime, nullable=False,
                          unique=False, default=datetime.utcnow)

    def __repr__(self) -> str:
        return f"{self.Sender_ID} - {self.Receiver_ID}"