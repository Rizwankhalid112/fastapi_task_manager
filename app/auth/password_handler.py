from passlib.context import CryptContext

password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class PasswordHandler:
    @staticmethod
    def hash_password(password: str):
        return password_context.hash(password)

    @staticmethod
    def verify_password(plain_text_password: str, hashed_password: str) -> bool:
        return password_context.verify(plain_text_password, hashed_password)
