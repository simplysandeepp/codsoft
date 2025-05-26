
from PIL import Image
from transformers import BlipProcessor, BlipForConditionalGeneration

# Load the Processor and Model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-large")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-large")

# Load the Image
image_path = "./task 3/assets/image4.jpg"
raw_image = Image.open(image_path).convert('RGB')

# Prepare the Inputs
text = "a photography of"
inputs = processor(raw_image, text, return_tensors="pt")

# Generate the Caption
output = model.generate(**inputs)
print(f"\nDescription : {processor.decode(output[0], skip_special_tokens=True)}")