FROM python:3.7.3

ENV PYTHONFAULTHANDLER=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONHASHSEED=random \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100

WORKDIR /code

COPY requirements.txt /code

RUN pip install -r requirements.txt

COPY . /code
EXPOSE 5000

CMD ["python", "app.py"]