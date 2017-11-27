from PIL import Image

width = 256
height = 256

def resize_256(image_path):
    img = Image.open(image_path)
    img = img.resize((width, height), Image.ANTIALIAS)
    img.save(image_path)