class Degree(db.Model):
    __tablename__ = 'Degree'
    Degree_ID = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=True)
    branch = db.Column(db.String(80), nullable=True)
    batch = db.Column(db.String(10), nullable=True)
    students = db.relationship('Student', backref='degree', lazy=True)

    def __repr__(self) -> str:
        return f"{self.Degree_ID} - {self.year}"