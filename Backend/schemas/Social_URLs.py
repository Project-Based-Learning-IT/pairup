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