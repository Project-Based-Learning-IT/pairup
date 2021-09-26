from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

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


class Skills(db.Model):
    __tablename__ = 'Skills'
    Skill_ID = db.Column(db.Integer, primary_key=True)
    Skill_name = db.Column(db.String(64), nullable=False, unique=True)
    domains_in_skill = db.relationship('Domains', secondary=Skill_Domain_M_N, lazy='subquery',
                                       backref=db.backref('see_domains', lazy=True))

    def __repr__(self) -> str:
        return f"{self.Skill_ID} - {self.Skill_name}"


class Domains(db.Model):
    __tablename__ = 'Domains'
    Domain_ID = db.Column(db.Integer, primary_key=True)
    Domain_name = db.Column(db.String(64), nullable=False, unique=True)

    def __repr__(self) -> str:
        return f"{self.Domain_ID} - {self.Domain_name}"


@app.route("/",  methods=['GET', 'POST'])
def hello_world():
    # ids_skills = Skills.query.all()
    # print(ids_skills)
    return "<p>Hello, World!</p>"


@app.route('/get_skills', methods=['GET'])
def get_skills():
    '''
    For direct API calls trough request
    '''

    # For post
    # data = request.get_json(force=True)
    # prediction = model.predict([np.array(list(data.values()))])
    # output = prediction[0]
    ids_skills = Skills.query.all()

    res_ids_skills = list()
    for skill_obj in ids_skills:
        curr_id_skill = dict()
        curr_id_skill['skill_id'] = skill_obj.Skill_ID
        curr_id_skill['skill_name'] = skill_obj.Skill_name
        curr_id_skill['domains'] = list()
        for d in skill_obj.domains_in_skill:
            domains_of_skill = dict()
            domains_of_skill['domain_id'] = d.Domain_ID
            domains_of_skill['domain_name'] = d.Domain_name
            curr_id_skill['domains'].append(domains_of_skill)
        res_ids_skills.append(curr_id_skill)
    return jsonify(res_ids_skills)
    # return jsonify(ids_skills)


if __name__ == "__main__":
    app.run(debug=True, port=8000)
