# Chicken Detection and Tracking Detection API
# https://universe.roboflow.com/chickens/chicken-detection-and-tracking/model/11

# conda create -n roboflow-env python=3.9 -y
# conda activate roboflow-env
# python -m pip install inference supervision opencv-python

from inference import get_model
import supervision as sv
import cv2

# define the image url to use for inference
image_file = "./assets/chicken-1.jpeg"
image = cv2.imread(image_file)

# load a pre-trained rfdetr model
model = get_model(model_id="chicken-detection-and-tracking/11")

# run inference on our chosen image, image can be a url, a numpy array, a PIL image, etc.
results = model.infer(image)[0]

# load the results into the supervision Detections api
detections = sv.Detections.from_inference(results)

# create supervision annotators
bounding_box_annotator = sv.BoxAnnotator()
label_annotator = sv.LabelAnnotator()

# annotate the image with our inference results
annotated_image = bounding_box_annotator.annotate(scene=image, detections=detections)
annotated_image = label_annotator.annotate(scene=annotated_image, detections=detections)

# display the image
sv.plot_image(annotated_image)

# save the image
cv2.imwrite("./assets/chicken-1-annotated.jpeg", annotated_image)
