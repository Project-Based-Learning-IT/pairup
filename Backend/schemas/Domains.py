class Domains(db.Model):
    __tablename__ = 'Domains'
    Domain_ID = db.Column(db.Integer, primary_key=True)
    Domain_name = db.Column(db.String(64), nullable=False, unique=True)

    def __repr__(self) -> str:
        return f"{self.Domain_ID} - {self.Domain_name}"