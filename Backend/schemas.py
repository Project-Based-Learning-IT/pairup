class Degree(db.Model):
    __tablename__ = 'Degree'
    Degree_ID = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=True)
    branch = db.Column(db.String(80), nullable=True)
    batch = db.Column(db.String(10), nullable=True)
    students = db.relationship('Student', backref='degree', lazy=True)

    def __repr__(self) -> str:
        return f"{self.Degree_ID} - {self.year}"


class Domains(db.Model):
    __tablename__ = 'Domains'
    Domain_ID = db.Column(db.Integer, primary_key=True)
    Domain_name = db.Column(db.String(64), nullable=False, unique=True)

    def __repr__(self) -> str:
        return f"{self.Domain_ID} - {self.Domain_name}"


class Languages(db.Model):
    __tablename__ = 'Languages'
    Language_ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(20), nullable=False)
    students = db.relationship(
        "Student_Language_M_N", back_populates="language")

    def __repr__(self) -> str:
        return f"{self.Language_ID} - {self.Name}"


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


class Social_URLs(db.Model):
    __tablename__ = 'Social_URLs'
    SocialURL_ID = db.Column(db.Integer, primary_key=True)
    codechef = db.Column(db.String(100), unique=True, nullable=True)
    hackerrank = db.Column(db.String(100), unique=True, nullable=True)
    leetcode = db.Column(db.String(100), unique=True, nullable=True)
    linkedin = db.Column(db.String(100), unique=True, nullable=True)
    github = db.Column(db.String(100), unique=True, nullable=True)
    twitter = db.Column(db.String(100), unique=True, nullable=True)
    student = db.relationship(
        'Student', backref='social_urls', lazy=True, uselist=False)

    def __repr__(self) -> str:
        return f"{self.Social_URL_ID}"


class Skills(db.Model):
    __tablename__ = 'Skills'
    Skill_ID = db.Column(db.Integer, primary_key=True)
    Skill_name = db.Column(db.String(64), nullable=False, unique=True)
    domains_in_skill = db.relationship('Domains', secondary=Skill_Domain_M_N, lazy='subquery',
                                       backref=db.backref('see_skills', lazy=True))

    def __repr__(self) -> str:
        return f"{self.Skill_ID} - {self.Skill_name}"
