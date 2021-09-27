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
                                       backref=db.backref('see_skills', lazy=True))

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


@app.route('/get_domains_and_its_skills', methods=['GET'])
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
    return jsonify(res_ids_domains_skills)
    # return jsonify(ids_skills)


if __name__ == "__main__":
    app.run(debug=True, port=8000)
