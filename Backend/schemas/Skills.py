class Skills(db.Model):
    __tablename__ = 'Skills'
    Skill_ID = db.Column(db.Integer, primary_key=True)
    Skill_name = db.Column(db.String(64), nullable=False, unique=True)
    domains_in_skill = db.relationship('Domains', secondary=Skill_Domain_M_N, lazy='subquery',
                                       backref=db.backref('see_skills', lazy=True))

    def __repr__(self) -> str:
        return f"{self.Skill_ID} - {self.Skill_name}"