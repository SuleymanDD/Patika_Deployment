FROM python:3.14-slim
WORKDIR /server
COPY dependencies.txt .
RUN pip install -r dependencies.txt
COPY app/ .
CMD python server.py