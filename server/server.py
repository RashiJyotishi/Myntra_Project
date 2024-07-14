from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from colorthief import ColorThief
import random
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myntra.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
UPLOAD_FOLDER = os.path.join(app.instance_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)
db = SQLAlchemy(app)

# Ensure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Models
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String(255), nullable=False)
    hashtags = db.Column(db.String(255), nullable=True)
    likes = db.Column(db.Integer, default=0)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    sentiment = db.Column(db.String(50), nullable=True)

# List of image filenames
image_filenames = [
    'Img1.png', 'Img2.png', 'Img3.png', 'Img4.png', 'Img5.png', 'Img6.png', 'Img7.png', 'Img8.png', 'Img9.png', 'Img10.png', 'Img11.png', 'Img12.png', 'Img13.png', 'Img14.png', 'Img15.png'
]

def get_top_colors(image_path, num_colors=5):
    color_thief = ColorThief(image_path)
    palette = color_thief.get_palette(color_count=num_colors)
    hex_colors = ['#%02x%02x%02x' % color for color in palette]
    return hex_colors

@app.route('/get-colors', methods=['GET'])
def get_colors():
    results = []
    for image_name in image_filenames:
        image_path = os.path.join('bg-removed-images', image_name)
        if os.path.exists(image_path):
            top_colors = get_top_colors(image_path)
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

# Route to handle file uploads
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save file to UPLOAD_FOLDER
    filename = secure_filename(file.filename)
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    # Create new post entry in database
    new_post = Post(image_path=os.path.join(app.config['UPLOAD_FOLDER'], filename), hashtags=request.form.get('hashtags', ''))
    db.session.add(new_post)
    db.session.commit()

    return jsonify({"message": "File uploaded successfully"}), 201

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    posts_data = []
    for post in posts:
        comments = Comment.query.filter_by(post_id=post.id).all()
        comments_data = [{"content": comment.content, "sentiment": comment.sentiment} for comment in comments]
        posts_data.append({
            "id": post.id,
            "image_path": post.image_path,
            "image_url": f'/uploads/{os.path.basename(post.image_path)}',  # Add this line to include the image URL
            "hashtags": post.hashtags,
            "likes": post.likes,
            "comments": comments_data
        })
    return jsonify(posts_data), 200

@app.route('/like/<int:post_id>', methods=['POST'])
def like_post(post_id):
    post = Post.query.get(post_id)
    if post:
        post.likes += 1
        db.session.commit()
        return jsonify({"message": "Post liked successfully"}), 200
    return jsonify({"message": "Post not found"}), 404

@app.route('/comment', methods=['POST'])
def add_comment():
    data = request.json
    new_comment = Comment(post_id=data['post_id'], content=data['content'], sentiment=data.get('sentiment'))
    db.session.add(new_comment)
    db.session.commit()
    return jsonify({"message": "Comment added successfully"}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
