
import os
from PIL import Image

def convert_images_to_png(directory):
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    for filename in os.listdir(directory):
        if filename.lower().endswith(('.jpg', '.jpeg', '.jfif', '.webp')):
            filepath = os.path.join(directory, filename)
            try:
                with Image.open(filepath) as img:
                    new_filename = os.path.splitext(filename)[0] + ".png"
                    new_filepath = os.path.join(directory, new_filename)
                    # Convert to RGB to handle potentially RGBA or other modes if saving as PNG (though PNG supports RGBA)
                    # Just saving as PNG is usually fine, but ensuring compatibility
                    img.save(new_filepath, "PNG")
                    print(f"Converted: {filename} -> {new_filename}")
            except Exception as e:
                print(f"Failed to convert {filename}: {e}")

if __name__ == "__main__":
    convert_images_to_png("images")
