class Student(db.Model):
    __tablename__ = 'Student'
    Student_ID = db.Column(db.Integer, primary_key=True)
    Bio = db.Column(db.String(200), nullable=True)
    Email = db.Column(db.String(100), nullable=True)
    Headline = db.Column(db.String(100), nullable=True)
    Google_ID = db.Column(db.String(200), unique=True, nullable=True)
    Image_URL = db.Column(db.String(100), nullable=True)
    Name = db.Column(db.String(100), nullable=True)
    Requirements = db.Column(db.String(200), nullable=True)
    Bloom_filter = db.Column(db.LargeBinary, nullable=True)
    SocialURL_ID = db.Column(db.Integer, db.ForeignKey('Social_URLs.SocialURL_ID'),
                             unique=True, nullable=True)
    Degree_ID = db.Column(db.Integer, db.ForeignKey('Degree.Degree_ID'),
                          nullable=True)
    skills = db.relationship('Skills', secondary=Stud_Skill_M_N, lazy='subquery',
                             backref=db.backref('see_students', lazy=True))

    languages = db.relationship(
        "Student_Language_M_N", back_populates="student")
    projects = db.relationship('Projects', backref='student', lazy=True)

    def __repr__(self) -> str:
        return f"{self.Student_ID} - {self.Name}"