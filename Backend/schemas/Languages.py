class Languages(db.Model):
    __tablename__ = 'Languages'
    Language_ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(20), nullable=False)
    students = db.relationship(
        "Student_Language_M_N", back_populates="language")

    def __repr__(self) -> str:
        return f"{self.Language_ID} - {self.Name}"