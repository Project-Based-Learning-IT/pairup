class Projects(db.Model):
    __tablename__ = 'Projects'
    Project_ID = db.Column(db.Integer, primary_key=True)
    Title = db.Column(db.String(20), nullable=True)
    Description = db.Column(db.String(200), nullable=True)
    URL = db.Column(db.String(100), nullable=True)
    Student_ID = db.Column(db.Integer, db.ForeignKey('Student.Student_ID'),
                           nullable=True)

    def __repr__(self) -> str:
        return f"{self.Project_ID} - {self.Student_ID}"