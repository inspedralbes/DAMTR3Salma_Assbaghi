FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install mysql-connector-python -r requirements.txt

COPY stats_generator.py .

CMD ["python", "stats_generator.py"]
