import bcrypt
class PasswordHandler:
    @staticmethod
    def hash_password(password: str) -> str:
        if len(password.encode("utf-8")) > 72:
            raise ValueError("Password must be 72 bytes or fewer.")
        password_bytes = password.encode("utf-8")
        hashed_password = bcrypt.hashpw(password_bytes, bcrypt.gensalt())
        return hashed_password.decode("utf-8")
    @staticmethod
    def verify_password(plain_text_password: str, hashed_password: str) -> bool:
        try:
            return bcrypt.checkpw(
                plain_text_password.encode("utf-8"),
                hashed_password.encode("utf-8"),
            )
        except ValueError:
            return False
