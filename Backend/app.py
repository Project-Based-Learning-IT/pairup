# package imports
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from bloom_filter2 import BloomFilter
import pickle

app = Flask(__name__)

# MYSQL URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqldb://ug2xdng9tcws15hn:2cojtTBDv60lWweLpr9z@bdnnizsbskzwayamyrkk-mysql.services.clever-cloud.com:3306/bdnnizsbskzwayamyrkk'

db = SQLAlchemy(app)


Skill_Domain_M_N = db.Table('Skill_Domain_M_N',
                            db.Column('Skill_ID', db.Integer, db.ForeignKey(
                                'Skills.Skill_ID'), primary_key=True),
                            db.Column('Domain_ID', db.Integer, db.ForeignKey(
                                'Domains.Domain_ID'), primary_key=True)
                            )

Stud_Skill_M_N = db.Table('Stud_Skill_M_N',
                          db.Column('Student_ID', db.Integer, db.ForeignKey(
                              'Student.Student_ID'), primary_key=True),
                          db.Column('Skill_ID', db.Integer, db.ForeignKey(
                              'Skills.Skill_ID'), primary_key=True)
                          )


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

    def __repr__(self) -> str:
        return f"{self.Student_ID} - {self.Name}"


class Degree(db.Model):
    __tablename__ = 'Degree'
    Degree_ID = db.Column(db.Integer, primary_key=True)
    year = db.Column(db.Integer, nullable=True)
    branch = db.Column(db.String(80), nullable=True)
    batch = db.Column(db.String(10), nullable=True)
    students = db.relationship('Student', backref='degree', lazy=True)

    def __repr__(self) -> str:
        return f"{self.Degree_ID} - {self.year}"


class Languages(db.Model):
    __tablename__ = 'Languages'
    Language_ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(20), nullable=False)

    def __repr__(self) -> str:
        return f"{self.Language_ID} - {self.Name}"


class Skills(db.Model):
    __tablename__ = 'Skills'
    Skill_ID = db.Column(db.Integer, primary_key=True)
    Skill_name = db.Column(db.String(64), nullable=False, unique=True)
    domains_in_skill = db.relationship('Domains', secondary=Skill_Domain_M_N, lazy='subquery',
                                       backref=db.backref('see_skills', lazy=True))

    def __repr__(self) -> str:
        return f"{self.Skill_ID} - {self.Skill_name}"


class Domains(db.Model):
    __tablename__ = 'Domains'
    Domain_ID = db.Column(db.Integer, primary_key=True)
    Domain_name = db.Column(db.String(64), nullable=False, unique=True)

    def __repr__(self) -> str:
        return f"{self.Domain_ID} - {self.Domain_name}"


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


@app.route("/",  methods=['GET', 'POST'])
def hello_world():
    return "<p>Hello, World!</p>"


@app.route("/get_social_urls/<int:id>",  methods=['GET', 'POST'])
def get_social_urls(id):
    student = Student.query.filter_by(Student_ID=id).first()
    res = dict()
    res['SocialURL_ID'] = student.social_urls.SocialURL_ID
    res['codechef'] = student.social_urls.codechef
    res['hackerrank'] = student.social_urls.hackerrank
    res['leetcode'] = student.social_urls.leetcode
    res['linkedin'] = student.social_urls.linkedin
    res['github'] = student.social_urls.github
    res['twitter'] = student.social_urls.twitter
    return res, 200


@app.route("/add_social_urls/",  methods=['GET', 'POST'])
def add_social_urls():
    codechef = str(request.json['codechef'])
    hackerrank = str(request.json['hackerrank'])
    leetcode = str(request.json['leetcode'])
    linkedin = str(request.json['linkedin'])
    github = str(request.json['github'])
    twitter = str(request.json['twitter'])
    # SocialURL_ID Auto incremented
    social_ids = Social_URLs(
        codechef=codechef, hackerrank=hackerrank, leetcode=leetcode, linkedin=linkedin, github=github, twitter=twitter)
    # Add degree data to database
    db.session.add(social_ids)
    db.session.commit()
    return str(social_ids.SocialURL_ID), 200
    # Sample json body
    # {
    #     "codechef": "codechef1.com",
    #     "hackerrank": "hackerrank2.com",
    #     "leetcode": "leetcode1.com",
    #     "linkedin": "linkedin1.com",
    #     "github": "github1.com",
    #     "twitter": "twitter1.com"
    # }


@app.route("/update_social_urls/<int:id>",  methods=['GET', 'POST'])
def update_social_urls(id):
    student = Student.query.filter_by(Student_ID=id).first()
    student.social_urls.codechef = str(request.json['codechef'])
    student.social_urls.hackerrank = str(request.json['hackerrank'])
    student.social_urls.leetcode = str(request.json['leetcode'])
    student.social_urls.linkedin = str(request.json['linkedin'])
    student.social_urls.github = str(request.json['github'])
    student.social_urls.twitter = str(request.json['twitter'])
    # Update social_urls data in database
    db.session.add(student.social_urls)
    db.session.commit()
    return str(student.social_urls.SocialURL_ID), 200
    # Sample json body
    # {
    #     "codechef": "codechef_u.com",
    #     "hackerrank": "hackerrank_u.com",
    #     "leetcode": "leetcode_u.com",
    #     "linkedin": "linkedin_u.com",
    #     "github": "github_u.com",
    #     "twitter": "twitter_u.com"
    # }


@app.route("/add_degree",  methods=['POST'])
def add_degree():
    if request.method == "POST":
        # Degree_ID Auto incremented
        year = int(request.json['year'])
        branch = str(request.json['branch'])
        batch = str(request.json['batch'])
        degree = Degree(year=year, branch=branch, batch=batch)
        # Add degree data to database
        db.session.add(degree)
        db.session.commit()
        return str(degree.Degree_ID), 200
        # Sample json body
        # {
        #     "year": 2021,
        #     "branch": "Computer Engineering",
        #     "batch": "A1"
        # }


@app.route("/update_degree/<int:id>",  methods=['POST'])
def update_degree(id):
    if request.method == "POST":
        student = Student.query.filter_by(Student_ID=id).first()
        student.degree.year = int(request.json['year'])
        student.degree.branch = str(request.json['branch'])
        student.degree.batch = str(request.json['batch'])
        # Upgrade degree data in database
        db.session.add(student.degree)
        db.session.commit()
        return str(student.degree.Degree_ID), 200
        # Sample json body
        # {
        #     "year": 2022,
        #     "branch": "Instrumentation",
        #     "batch": "A2"
        # }


@ app.route("/get_degree/<int:id>",  methods=['GET'])
def get_degree(id):
    student = Student.query.filter_by(Student_ID=id).first()
    res = dict()
    res['Degree_ID'] = student.degree.Degree_ID
    res['year'] = student.degree.year
    res['branch'] = student.degree.branch
    res['batch'] = student.degree.batch
    return res, 200


@ app.route('/get_domains_and_its_skills', methods=['GET'])
def get_domains_and_its_skills():
    '''
    For direct API calls through request
    '''
    # For post
    # data = request.get_json(force=True)
    # prediction = model.predict([np.array(list(data.values()))])
    # output = prediction[0]
    ids_domains = Domains.query.all()

    res_ids_domains_skills = list()
    for domain_obj in ids_domains:
        curr_id_domain = dict()
        curr_id_domain['domain_id'] = domain_obj.Domain_ID
        curr_id_domain['domain_name'] = domain_obj.Domain_name
        curr_id_domain['skills'] = list()
        for s in domain_obj.see_skills:
            skill_in_domain = dict()
            skill_in_domain['skill_id'] = s.Skill_ID
            skill_in_domain['skill_name'] = s.Skill_name
            curr_id_domain['skills'].append(skill_in_domain)
        res_ids_domains_skills.append(curr_id_domain)
    return jsonify(res_ids_domains_skills), 200


@app.route("/add_student",  methods=['POST'])
def add_student():
    if request.method == "POST":
        # Student_ID Auto incremented
        Bio = str(request.json['Bio'])
        Email = str(request.json['Email'])
        Headline = str(request.json['Headline'])
        Google_ID = str(request.json['google_id'])
        Image_URL = str(request.json['Image_URl'])
        Name = str(request.json['Name'])
        Requirements = str(request.json['Requirements'])
        SocialURL_ID = int(request.json['SocialURL_ID'])
        Degree_ID = int(request.json['Degree_ID'])
        bloom = BloomFilter(max_elements=1000, error_rate=0.001)
        to_bytes = pickle.dumps(bloom)
        student = Student(Bio=Bio, Email=Email, Headline=Headline,
                          Google_ID=Google_ID, Image_URL=Image_URL, Name=Name, Requirements=Requirements, SocialURL_ID=SocialURL_ID, Degree_ID=Degree_ID, Bloom_filter=to_bytes)

        db.session.add(student)
        db.session.commit()
        return str(student.Student_ID), 200
        # Sample json body
        # {
        #     "google_id": 100002,
        #     "Image_URl": "boi.com",
        #     "Name": "Dummy_ab",
        #     "Headline": "head added",
        #     "Requirements": "require added",
        #     "Bio": "biodata added",
        #     "Email": "daaf@def.com",
        #     "SocialURL_ID": 3,
        #     "Degree_ID": 4
        # }


@app.route("/add_student_skills/<int:id>",  methods=['POST'])
def add_student_skills(id):
    if request.method == "POST":
        skills_ids = list(request.json['Skills'])
        student = Student.query.filter_by(Student_ID=id).first()
        for skill_id in skills_ids:
            curr_skill = Skills.query.filter_by(
                Skill_ID=skill_id).first()
            student.skills.append(curr_skill)
        db.session.commit()
        return str(student.Student_ID), 200
        # Sample json body
        # {
        #     "Skills": [1, 2, 3, 4]
        # }


@app.route("/update_student_skills/<int:id>",  methods=['POST'])
def update_student_skills(id):
    if request.method == "POST":
        skills_ids = list(request.json['Skills'])
        student = Student.query.filter_by(Student_ID=id).first()
        stud_skills_ids = set()
        for added_skill in student.skills:
            stud_skills_ids.add(added_skill.Skill_ID)
        new_skills_id = set()
        for skill_id in skills_ids:
            new_skills_id.add(skill_id)

        for skill_id in new_skills_id-stud_skills_ids:
            curr_skill = Skills.query.filter_by(
                Skill_ID=skill_id).first()
            student.skills.append(curr_skill)
        for skill_id in stud_skills_ids - new_skills_id:
            curr_skill = Skills.query.filter_by(
                Skill_ID=skill_id).first()
            student.skills.remove(curr_skill)
        db.session.commit()
        return str(student.Student_ID), 200
        # Sample json body
        # {
        #     "Skills": [1, 2, 3, 5]
        # }


@app.route("/get_stud_skills/<int:id>",  methods=['GET', 'POST'])
def get_stud_skills(id):
    student = Student.query.filter_by(Student_ID=id).first()
    res = list()
    for skill in student.skills:
        curr_skill = dict()
        curr_skill['Skill_ID'] = skill.Skill_ID
        curr_skill['Skill_name'] = skill.Skill_name
        res.append(curr_skill)
    return jsonify(res), 200


@app.route("/right_swipe/<int:id>",  methods=['POST'])
def right_swipe(id):
    if request.method == "POST":
        swiper = Student.query.filter_by(Student_ID=id).first()
        swiped_id = int(request.json['Swiped_Student_ID'])
        swiped = Student.query.filter_by(Student_ID=swiped_id).first()

        swiper_bloom = pickle.loads(swiper.Bloom_filter)
        swiper_bloom.add(swiped.Student_ID)
        to_bytes = pickle.dumps(swiper_bloom)
        swiper.Bloom_filter = to_bytes
        db.session.add(swiper)
        db.session.commit()

        swiped_bloom = pickle.loads(swiped.Bloom_filter)
        if swiper.Student_ID in swiped_bloom:
            return "Matched", 200
        else:
            return "Yet to Match", 200
    # Sample json body
    # {
    #     "Swiped_Student_ID": 2
    # }


if __name__ == "__main__":
    app.run(debug=True, port=8000)
