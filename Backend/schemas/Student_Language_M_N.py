class Student_Language_M_N(db.Model):
    __tablename__ = 'Student_Language_M_N'
    Language_ID = db.Column(db.Integer, db.ForeignKey(
        'Languages.Language_ID'), primary_key=True)
    Student_ID = db.Column(db.Integer, db.ForeignKey(
        'Student.Student_ID'), primary_key=True)
    Proficiency = db.Column(db.String(20), nullable=True, unique=False)
    language = db.relationship("Languages", back_populates="students")
    student = db.relationship("Student", back_populates="languages")

    def __repr__(self) -> str:
        return f"{self.Language_ID} - {self.Student_ID}"