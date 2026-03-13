import factory
from factory.alchemy import SQLAlchemyModelFactory
from app.models.user import User
from app.models.project import Project
from app.models.task import Task
from app.utils.password_handler import PasswordHandler

DEFAULT_PASSWORD = "testpass123"
class BaseFactory(SQLAlchemyModelFactory):
    class Meta:
        abstract = True
        sqlalchemy_session = None
        sqlalchemy_session_persistence = "commit"

class UserFactory(BaseFactory):
    class Meta:
        model = User
    email = factory.Sequence(lambda n: f"user{n}@test.com")
    full_name = factory.Faker("name")
    hashed_password = factory.LazyFunction(lambda: PasswordHandler.hash_password(DEFAULT_PASSWORD))

class ProjectFactory(BaseFactory):
    class Meta:
        model = Project
    name = factory.Sequence(lambda n: f"Project {n}")
    description = factory.Faker("sentence")
    owner = factory.SubFactory(UserFactory)

class TaskFactory(BaseFactory):
    class Meta:
        model = Task
    title = factory.Sequence(lambda n: f"Task {n}")
    description = factory.Faker("sentence")
    status = "todo"
    project = factory.SubFactory(ProjectFactory)