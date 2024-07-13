from flask import Flask, jsonify
from flask_cors import CORS
import os
from colorthief import ColorThief
import random

app = Flask(__name__)
CORS(app)

# List of image filenames
image_filenames = [
    'Img1.png', 'Img2.png', 'Img3.png', 'Img4.png', 'Img5.png', 'Img6.png', 'Img7.png', 'Img8.png', 'Img9.png', 'Img10.png', 'Img11.png', 'Img12.png', 'Img13.png', 'Img14.png', 'Img15.png'
]

def get_top_colors(image_path, num_colors=5):
    color_thief = ColorThief(image_path)
    # Get the top num_colors colors
    palette = color_thief.get_palette(color_count=num_colors)
    # Convert RGB to hex
    hex_colors = ['#%02x%02x%02x' % color for color in palette]
    return hex_colors

@app.route('/get-colors', methods=['GET'])
def get_colors():
    results = []
    for image_name in image_filenames:
        image_path = os.path.join('bg-removed-images', image_name)  # Assumes images are in an 'assets' folder
        if os.path.exists(image_path):  # Check if image exists
            top_colors = get_top_colors(image_path)
            # Adding random sentiment and engagement scores for demo purposes
            sentiment_score = round(random.uniform(0, 1), 2)
            engagement_score = round(random.uniform(0, 100), 2)
            results.append({
                'image': image_name,
                'top_colors': top_colors,
                'sentimentScore': sentiment_score,
                'engagementScore': engagement_score
            })
        else:
            results.append({
                'image': image_name,
                'error': 'Image not found'
            })
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
