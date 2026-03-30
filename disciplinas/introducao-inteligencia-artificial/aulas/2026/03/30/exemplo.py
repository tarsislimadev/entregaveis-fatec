# python -m pip install ultralytics

from ultralytics import YOLO
import cv2

model = YOLO("yolo26n.pt")  
results = model("https://ultralytics.com/images/bus.jpg")

for i, result in enumerate(results):
  annotated_image = result.plot()  
  output_path = f"resultado_{i}.jpg"
  cv2.imwrite(output_path, annotated_image)
  print(f"Imagem salva em: {output_path}")
