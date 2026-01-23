from ultralytics import YOLO

model = YOLO('yolo26n')

results = model('0', stream=True)

for result in results:
  for detection in result.summary():
    print('detection')
    print('name', detection['name'])
    print('box', detection['box'])

# continue
