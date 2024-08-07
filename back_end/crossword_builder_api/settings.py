from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "production"
    DEBUG: bool = False
    ADD_TIMINGS_TO_LOGS: bool = False

    class Config:
        env_file = '.env'

settings = Settings()
