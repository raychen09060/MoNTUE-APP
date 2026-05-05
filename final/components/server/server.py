from collections import Counter
from flask import Flask, jsonify
from PIL import Image
from pathlib import Path
import re
import numpy as np
from sklearn.cluster import KMeans
import colorsys

app = Flask(__name__)

EXHIBIT_DATA_PATH = Path(__file__).resolve().parent.parent / "ExhibitData.js"
IMAGE_PATH = None

with EXHIBIT_DATA_PATH.open("r", encoding="utf-8") as f:
    exhibit_text = f.read()

match = re.search(r"img:\s*['\"](.+?)['\"]", exhibit_text)
if match:
    relative_image_path = match.group(1)
    IMAGE_PATH = (EXHIBIT_DATA_PATH.parent / relative_image_path).resolve()
else:
    raise RuntimeError("Could not find img path in ExhibitData.js")

if not IMAGE_PATH.exists():
    raise RuntimeError(f"Image file not found: {IMAGE_PATH}")


def get_most_common_color(image_path: Path) -> str:
    img = Image.open(image_path).convert("RGB")
    img = img.resize((100, 100)) 
    pixels = np.array(img.getdata())
    
    kmeans = KMeans(n_clusters=5, n_init='auto')
    kmeans.fit(pixels)
    
    colors = kmeans.cluster_centers_
    
    def get_vibrancy(rgb):
        r, g, b = rgb / 255.0
        h, s, v = colorsys.rgb_to_hsv(r, g, b)
        return s * v

    vibrancies = [get_vibrancy(c) for c in colors]
    dominant_rgb = colors[np.argmax(vibrancies)]
    r, g, b = dominant_rgb.astype(int)
    return "#{:02x}{:02x}{:02x}".format(r, g, b)

@app.route("/dominant-color")
def dominant_color():
    color = get_most_common_color(IMAGE_PATH)
    return jsonify(color=color)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)