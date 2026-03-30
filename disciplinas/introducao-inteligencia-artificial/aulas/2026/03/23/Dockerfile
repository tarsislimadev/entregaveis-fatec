# docker build -t tmvdl/ai:roboflow-chicken .

# docker run --net host -e input=input.jpg -e output=output.jpg tmvdl/ai:roboflow-chicken

FROM python:3.9-slim

RUN pip install inference>=1.2.0 supervision>=0.12.0 opencv-python

COPY app.py /app/app.py

COPY assets/ /app/assets/

CMD python /app/app.py
