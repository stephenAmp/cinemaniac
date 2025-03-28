from sqlalchemy import Integer,String,DateTime,Float,ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped,mapped_column,relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id:Mapped[int] = mapped_column(Integer, autoincrement= True, primary_key=True)
    name:Mapped[str] = mapped_column(String)
    email:Mapped[str] = mapped_column(String, unique=True)
    hashed_password:Mapped[str] = mapped_column(String)
    preference:Mapped[dict] = mapped_column(JSONB)
    created_at:Mapped[datetime] = mapped_column(DateTime, default = datetime.now())

class Movie(Base):
    __tablename__ = "movies"

    id:Mapped[int]= mapped_column(Integer, primary_key=True,autoincrement=True)
    title:Mapped[str] = mapped_column(String, nullable=False)
    description:Mapped[str] = mapped_column(String)
    release_date:Mapped[datetime] = mapped_column(String)
    genre_id:Mapped[int] = mapped_column(Integer,ForeignKey('genres.id'))
    genres = relationship('Genre')
    poster_url:Mapped[str] = mapped_column(String)
    imdb_rating:Mapped[int] = mapped_column(Float)
    movie_metadata:Mapped[dict] = mapped_column(JSONB)
    created_at:Mapped[datetime] = mapped_column(DateTime, default =datetime.now())


class Genre(Base):
    __tablename__ = 'genres'

    id:Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name:Mapped[str] = mapped_column(String)
    description:Mapped[str] = mapped_column(String)


class WatchList(Base):
    __tablename__ = 'watchlist'

    id:Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    user_id:Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    user = relationship('User')
    movie_id:Mapped[int] = mapped_column(Integer, ForeignKey('movies.id'))
    movie = relationship('Movie')

class Review(Base):
    __tablename__ = 'reviews'

    id:Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    score:Mapped[int] = mapped_column(Integer)
    comment:Mapped[str] = mapped_column(String)
    user_id:Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    user = relationship('User')
    movie_id:Mapped[int] = mapped_column(Integer, ForeignKey('movies.id'))
    movie = relationship('Movie')