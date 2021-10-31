# package imports
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask.templating import DispatchingJinjaLoader
from flask_sqlalchemy import SQLAlchemy
# DateTime
from datetime import datetime
from dateutil import parser
from bloom_filter2 import BloomFilter
import pickle
# ML packages
import pandas as pd
# from sklearn.externals import joblib
import joblib
from sklearn.neighbors import NearestNeighbors
# JWT
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
# dotenv import
import os
# import pymysql  
# pymysql.install_as_MySQLdb()
from dotenv import load_dotenv
load_dotenv()
import pipelining

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = os.getenv(
    'JWT_SECRET_KEY')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
# from datetime import timedelta
# timedelta(hours=1)
# If set to False tokens will never expire. This is dangerous and should be avoided in most case
jwt = JWTManager(app)

# MYSQL Production URI
# app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
#     'SQLALCHEMY_DATABASE_URI')

# MYSQL Local URI
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'LOCAL_SQLALCHEMY_DATABASE_URI')

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

    languages = db.relationship(
        "Student_Language_M_N", back_populates="student")
    projects = db.relationship('Projects', backref='student', lazy=True)

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


class Languages(db.Model):
    __tablename__ = 'Languages'
    Language_ID = db.Column(db.Integer, primary_key=True)
    Name = db.Column(db.String(20), nullable=False)
    students = db.relationship(
        "Student_Language_M_N", back_populates="language")

    def __repr__(self) -> str:
        return f"{self.Language_ID} - {self.Name}"


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


# Homepage
@app.route("/",  methods=['GET', 'POST'])
def hello_world():
    listOfUsers = getSimilarUsers(10, 'krishna purohit')
    return str(listOfUsers)

# Login
# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.


@app.route("/signup_and_login", methods=["POST"])
def signup_and_login():
    username = str(request.json["username"])
    new_user = False
    student = Student.query.filter_by(
        Name=username.strip().lower()).first()
    if student is None:  # signup or register
        new_user = True
        student = Student()  # Student_ID Auto incremented
        db.session.add(student)
        db.session.commit()

    # To access a jwt_required protected view you need to send in the JWT with each request.
    # By default, this is done with an authorization header that looks like:
    # Authorization: Bearer <access_token>
    access_token = create_access_token(identity=student.Student_ID)
    return jsonify(access_token=access_token, new_user=new_user, id=student.Student_ID), 200
    # Sample json body
    # {
    #     "username": "Dummy_a"
    # }
    # Sample Response
    # {
    #     "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMjk4OTYyNywianRpIjoiNmE0ZTIzZjgtOTNiZS00YWI4LWIxMDEtZDhlY2U1NTIxM2Q0IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNjMyOTg5NjI3fQ.ptPtQDU0Fxb1B0kWyazceO_DlIdAL_NlJfQXxfOFWyQ"
    # }

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.

# Check JWT


@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(Student_ID=current_user), 200


# Recommendations routes

def getSimilarUsers(top_n, target):
    df = pd.read_csv('Data.csv')
    name_of_users = df['Name']
    model = joblib.load('KNNmodel.pkl', mmap_mode='r')
    user = [df[df['Name'] == target].iloc[0, 1:].values.astype(int)]
    # print(user)
    similar_users = model.kneighbors(user, top_n, return_distance=False)[0]
    recommendedUsers = [name_of_users[i] for i in similar_users]
    return recommendedUsers


# print(getSimilarUsers(10, 'krishna purohit'))


@app.route("/get_recommendations",  methods=['GET', 'POST'])
@jwt_required()
def get_recommendations():
    # id = get_jwt_identity()
    # res = getSimilarUsers(10, student.Name)

    rec_names = getSimilarUsers(10, 'krishna purohit')
    rec_names = rec_names[1:]
    # id, name, photo, headline, requirements, info created using branch-year-batch, skills
    cards = list()
    for rec_name in rec_names:
        curr_rec = dict()
        rec = Student.query.filter_by(Name=rec_name).first()
        curr_rec['id'] = rec.Student_ID
        curr_rec['name'] = rec.Name.title()
        curr_rec['photo'] = rec.Image_URL if rec.Image_URL else 'https://static.thenounproject.com/png/64485-200.png'
        curr_rec['headline'] = rec.Headline if rec.Headline else "Headline NULL"
        curr_rec['requirements'] = rec.Requirements if rec.Requirements else "REQ NULL"
        curr_rec['Degree_ID'] = rec.degree.Degree_ID if rec.degree else -1
        curr_rec['year'] = rec.degree.year if rec.degree else 404
        curr_rec['branch'] = rec.degree.branch if rec.degree else 'BRNF'
        curr_rec['batch'] = rec.degree.batch if rec.degree else 'BANF'
        curr_rec['info'] = str(curr_rec['year'])+' | ' + \
            curr_rec['branch']+' | ' + curr_rec['batch']
        curr_rec['skills'] = list()
        for skill in rec.skills:
            curr_skill = dict()
            curr_skill['skill_id'] = skill.Skill_ID
            curr_skill['skill_name'] = skill.Skill_name
            curr_rec['skills'].append(curr_skill)
            # curr_rec['skills'].append(skill.Skill_name)
        cards.append(curr_rec)
    return jsonify(cards), 200

# Social URLs Routes


@app.route("/get_social_urls",  methods=['GET', 'POST'])
@jwt_required()
def get_social_urls():
    id = request.args.get('id', -1, type=int)
    if id == -1:
        id = get_jwt_identity()
    student = Student.query.filter_by(Student_ID=id).first()
    res = dict()
    if student.social_urls != None:
        res['SocialURL_ID'] = student.social_urls.SocialURL_ID
        res['codechef'] = student.social_urls.codechef
        res['hackerrank'] = student.social_urls.hackerrank
        res['leetcode'] = student.social_urls.leetcode
        res['linkedin'] = student.social_urls.linkedin
        res['github'] = student.social_urls.github
        res['twitter'] = student.social_urls.twitter
    return res, 200


@app.route("/add_social_urls",  methods=['POST'])
@jwt_required()
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


@app.route("/update_social_urls",  methods=['POST'])
@jwt_required()
def update_social_urls():
    id = get_jwt_identity()
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


# Degree Routes
@app.route("/add_degree",  methods=['POST'])
@jwt_required()
def add_degree():
    if request.method == "POST":
        # Degree_ID Auto incremented

        # Send -1 for year if it is not specified
        year = int(request.json['year'])
        branch = str(request.json['branch'])
        batch = str(request.json['batch'])

        if year == -1:
            degree = Degree(branch=branch, batch=batch)
        else:
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


@app.route("/update_degree",  methods=['POST'])
@jwt_required()
def update_degree():
    if request.method == "POST":
        id = get_jwt_identity()
        student = Student.query.filter_by(Student_ID=id).first()
        # Send -1 for year if it is not specified
        year = int(request.json['year'])
        if year != -1:
            student.degree.year = year
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
        # Sample output
        # 1


@ app.route("/get_degree",  methods=['GET'])
@jwt_required()
def get_degree():
    id = get_jwt_identity()
    student = Student.query.filter_by(Student_ID=id).first()
    res = dict()
    res['Degree_ID'] = student.degree.Degree_ID
    res['year'] = student.degree.year
    res['branch'] = student.degree.branch
    res['batch'] = student.degree.batch
    return res, 200


# Domain and its skills route
@ app.route('/get_domains_and_its_skills', methods=['GET'])
@jwt_required()
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
    # output is list of domains dictionaries which has domian id,name and skills list with skill dictionaries with skill id,name


# Project routes
@app.route("/add_project",  methods=['POST'])
@jwt_required()
def add_project():
    if request.method == "POST":
        id = get_jwt_identity()
        project = request.json

        new_project = Projects(
            Title=str(project['Title']), Description=(project['Description']), URL=(project['URL']), Student_ID=id)
        db.session.add(new_project)
        db.session.commit()

        return str(new_project.Project_ID), 200
    # Sample json body
    # {
    #     "Title": "Tommy",
    #     "Description": "This translated dogs language into human form",
    #     "URL": "bho.com"
    # }


@app.route("/update_project/<int:project_id>",  methods=['POST'])
@jwt_required()
def update_project(project_id):
    if request.method == "POST":
        project = Projects.query.filter_by(Project_ID=project_id).first()
        project.Title = str(request.json['Title'])
        project.Description = str(request.json['Description'])
        project.URL = str(request.json['URL'])
        db.session.commit()

        return str(project.Project_ID), 200
    # Sample json body
    # {
    #     "Title": "Shoppy",
    #     "Description": "This site sells dogs",
    #     "URL": "doggy.com"
    # }

# Student Routes


@app.route("/get_student_profile",  methods=['GET'])
@jwt_required()
def get_student_profile():
    id = request.args.get('id', -1, type=int)
    if id == -1:
        id = get_jwt_identity()
    res = dict()
    student = Student.query.filter_by(Student_ID=id).first()
    res['Bio'] = student.Bio
    res['Email'] = student.Email
    res['Headline'] = student.Headline
    res['Google_ID'] = student.Google_ID
    res['Image_URl'] = student.Image_URL
    res['Name'] = student.Name.title()
    res['Requirements'] = student.Requirements
    res['SocialURL_ID'] = student.SocialURL_ID
    res['Degree_ID'] = student.Degree_ID
    res['Projects'] = list()
    for project in student.projects:
        curr_project = dict()
        curr_project['Project_ID'] = project.Project_ID
        curr_project['Description'] = project.Description
        curr_project['Title'] = project.Title
        curr_project['URL'] = project.URL
        res['Projects'].append(curr_project)
    return res, 200
    # Sample output
    # {
    #     "Bio": "biodata added",
    #     "Degree_ID": 4,
    #     "Email": "daaf@def.com",
    #     "Headline": "with jwt head added",
    #     "Image_URl": "boi.com",
    #     "Name": "Dummy_ab",
    #     "Requirements": "require added",
    #     "SocialURL_ID": 3,
    #     "google_id": "100002"
    # }


@app.route("/update_student_profile",  methods=['POST'])
@jwt_required()
def update_student_profile():
    if request.method == "POST":
        id = get_jwt_identity()
        student = Student.query.filter_by(Student_ID=id).first()
        student.Bio = str(request.json['Bio'])
        student.Email = str(request.json['Email'])
        student.Headline = str(request.json['Headline'])
        student.Google_ID = str(request.json['Google_ID'])
        student.Image_URL = str(request.json['Image_URL'])
        student.Name = str(request.json['Name']).strip().lower()
        student.Requirements = str(request.json['Requirements'])

        student.SocialURL_ID = int(request.json['SocialURL_ID'])
        student.Degree_ID = int(request.json['Degree_ID'])
        bloom = BloomFilter(max_elements=1000, error_rate=0.001)
        student.Bloom_filter = pickle.dumps(bloom)
        db.session.commit()

        return "Profile Updated", 200
    # Sample json body
    # {
    #     "Google_ID": 100002,
    #     "Image_URL": "boi.com",
    #     "Name": "Dummy_ab",
    #     "Headline": "head added",
    #     "Requirements": "require added",
    #     "Bio": "biodata added",
    #     "Email": "daaf@def.com",
    #     "SocialURL_ID": 3,
    #     "Degree_ID": 4
    # }


# NOTE To add dataset
# Stud_Id_Name_Skills_list_627 = pd.read_csv(
#     '627_Stud_Id_Name_Skills_list.csv')


# @app.route("/add_dataset",  methods=['POST'])
# def add_dataset():
#     if request.method == "POST":
#         for ind in Stud_Id_Name_Skills_list_627.index:
#             curr_stud_id = Stud_Id_Name_Skills_list_627['Student_ID'][ind]
#             curr_stud_name = Stud_Id_Name_Skills_list_627['Names'][ind]

#             bloom = BloomFilter(max_elements=1000, error_rate=0.001)

#             student = Student(
#                 Student_ID=curr_stud_id, Name=curr_stud_name, Bloom_filter=pickle.dumps(bloom))

#             db.session.add(student)
#             db.session.commit()
#         return "Dataset added", 200


# Languages Routes
@app.route("/get_all_languages",  methods=['GET'])
@jwt_required()
def get_all_languages():
    languages = Languages.query.all()
    res = list()
    for lang in languages:
        res.append(lang.Name)
    return jsonify(res), 200
    # Sample output
    # [
    #   "English",
    #   "Hindi",
    #   "Marathi"
    # ]


@app.route("/add_student_languages",  methods=['POST'])
@jwt_required()
def add_student_languages():
    if request.method == "POST":
        id = get_jwt_identity()
        languages = dict(request.json)
        student = Student.query.filter_by(Student_ID=id).first()
        for language_name, proficiency in languages.items():
            S_L_M_N = Student_Language_M_N(Proficiency=str(proficiency))
            curr_language = Languages.query.filter_by(
                Name=language_name).first()
            S_L_M_N.language = curr_language
            S_L_M_N.student = student
            student.languages.append(S_L_M_N)
        db.session.commit()
        return str(student.Student_ID), 200
        # Sample json body
        # {
        #         "English": "Native",
        #         "Hindi": "Professional"
        # }


@app.route("/update_student_languages",  methods=['POST'])
@jwt_required()
def update_student_languages():
    if request.method == "POST":
        id = get_jwt_identity()
        # skills_ids = list(request.json['Skills'])

        student = Student.query.filter_by(Student_ID=id).first()

        old_stud_langMNs = list()
        for stud_langMN in student.languages:
            old_stud_langMNs.append(stud_langMN)
        for stud_langMN in old_stud_langMNs:
            db.session.delete(stud_langMN)

        languages = dict(request.json)
        for language_name, proficiency in languages.items():
            S_L_M_N = Student_Language_M_N(Proficiency=str(proficiency))
            curr_language = Languages.query.filter_by(
                Name=language_name).first()
            S_L_M_N.language = curr_language
            S_L_M_N.student = student
            student.languages.append(S_L_M_N)
        db.session.commit()
        return str(student.Student_ID), 200
        # Sample json body
        # {
        #         "English": "Native",
        #         "Hindi": "Professional"
        # }


@app.route("/get_student_languages",  methods=['GET'])
@jwt_required()
def get_student_languages():
    id = request.args.get('id', -1, type=int)
    if id == -1:
        id = get_jwt_identity()
    student = Student.query.filter_by(Student_ID=id).first()
    res = list()
    for S_L_M_N in student.languages:
        curr_language = dict()
        curr_language['Proficiency'] = S_L_M_N.Proficiency
        curr_language['Language_ID'] = S_L_M_N.language.Language_ID
        curr_language['Language_name'] = S_L_M_N.language.Name
        res.append(curr_language)
    return jsonify(res), 200


# Skills Routes
@app.route("/add_student_skills",  methods=['POST'])
@jwt_required()
def add_student_skills():
    if request.method == "POST":
        id = get_jwt_identity()
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


@app.route("/update_student_skills",  methods=['POST'])
@jwt_required()
def update_student_skills():
    if request.method == "POST":
        id = get_jwt_identity()
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


@app.route("/get_stud_skills",  methods=['GET'])
@jwt_required()
def get_stud_skills():
    id = get_jwt_identity()
    student = Student.query.filter_by(Student_ID=id).first()
    res = list()
    for skill in student.skills:
        curr_skill = dict()
        curr_skill['skill_id'] = skill.Skill_ID
        curr_skill['skill_name'] = skill.Skill_name
        res.append(curr_skill)
    return jsonify(res), 200


# Right swipe Routes


@app.route("/right_swipe",  methods=['POST'])
@jwt_required()
def right_swipe():
    if request.method == "POST":
        id = get_jwt_identity()
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


# Message Route
@ app.route("/message",  methods=['POST'])
@jwt_required()
def message():
    if request.method == "POST":
        id = get_jwt_identity()
        Receiver_ID = int(request.json['Receiver_ID'])
        text = str(request.json['text'])
        message = Messages(Sender_ID=id, Receiver_ID=Receiver_ID, text=text)
        db.session.add(message)
        db.session.commit()
        res = dict()
        res['text'] = message.text
        res['timestamp'] = message.timestamp
        res['Sender_ID'] = message.Sender_ID
        res['Receiver_ID'] = message.Receiver_ID
        res['Message_ID'] = message.Message_ID
        return res, 200
        # Sample json body
        # {
        # "text": "Hi, this is first chat",
        # "Receiver_ID": 2
        # }


@app.route("/get_last_msgs_with_count_name_photo",  methods=['POST'])
@jwt_required()
def get_last_msgs():
    id = get_jwt_identity()

    q = """SELECT m1.Message_ID,
      m1.text,
      maxTsC.pid,
      ifnull(NewSC.newmsgs, 0) newmsgs,
      StudNI.Name,
      StudNI.Image_URL
    FROM messages AS m1
      INNER JOIN (
        select T1.pid pid,
          max(T1.maxMsgID) maxMsgID
        from (
            select R.RECEIVER_ID pid,
              max(R.Message_ID) maxMsgID
            from messages AS R
            where R.SENDER_ID = :id
            group by R.RECEIVER_ID
            union
            distinct
            select S.Sender_ID pid,
              max(S.Message_ID) maxMsgID
            from messages AS S
            where S.Receiver_ID = :id
            group by S.Sender_ID
          ) AS T1
        GROUP BY T1.pid
      ) AS maxTsC ON m1.Message_ID = maxTsC.maxMsgID
      LEFT JOIN (
        select Sender_ID,
          COUNT(*) newmsgs
        from messages as NewM
        where NewM.timestamp > :dt
          and NewM.Sender_ID != :id
        group by NewM.Sender_ID
      ) AS NewSC ON NewSC.Sender_ID = maxTsC.pid
      INNER JOIN (
        select Student_ID,
          Name,
          Image_URL
        from student AS Stud
      ) AS StudNI ON maxTsC.pid = StudNI.Student_ID"""

    str_last_date_time = request.json['DateTime']
    last_date_time = parser.parse(str_last_date_time)
    result = db.session.execute(q, {'id': id, 'dt': last_date_time})
    res = list()
    for row in result:
        res.append(row._asdict())  # convert to dict keyed by column names
    return jsonify(res), 200

# Sample json request body
# {
    # "DateTime": "2021-10-26 13:10:38",
# }

# First time use


@app.route("/get_all_chats",  methods=['GET'])
@jwt_required()
def get_all_chats():
    pid = request.args.get('pid', -1, type=int)
    id = get_jwt_identity()
    chats = Messages.query.filter((Messages.Sender_ID == id) | (
        Messages.Receiver_ID == id)).order_by(Messages.timestamp.asc())
    res = list()
    for message in chats:
        curr_message = dict()
        curr_message['Message_ID'] = message.Message_ID
        curr_message['Sender_ID'] = message.Sender_ID
        curr_message['Receiver_ID'] = message.Receiver_ID
        curr_message['text'] = message.text
        curr_message['timestamp'] = message.timestamp
        res.append(curr_message)
    return jsonify(res), 200


@app.route("/get_received_chats_after_last_cached",  methods=['GET', 'POST'])
@jwt_required()
def get_chats_after_last_cached():
    if request.method == "POST":
        id = get_jwt_identity()
        str_last_date_time = request.json['DateTime']
        last_date_time = parser.parse(str_last_date_time)

        chats = Messages.query.filter((
            Messages.Receiver_ID == id) & (
            Messages.timestamp > last_date_time)).order_by(Messages.timestamp.asc())
        res = list()
        for message in chats:
            curr_message = dict()
            curr_message['Message_ID'] = message.Message_ID
            curr_message['Sender_ID'] = message.Sender_ID
            curr_message['Receiver_ID'] = message.Receiver_ID
            curr_message['text'] = message.text
            curr_message['timestamp'] = message.timestamp
            res.append(curr_message)
        return jsonify(res), 200
# Sample json body
# {
    # "DateTime": "2021-10-23 13:59:13",
# }
# or "DateTime": "Tue, 26 Oct 2021 13:10:38 GMT"


if __name__ == "__main__":
    app.run(debug=True)
    # host = os.getenv(
    #     'Sidhant_IP_ADDRESS'),
