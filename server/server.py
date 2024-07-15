from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from colorthief import ColorThief
import random
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from prophet import Prophet
from sklearn.metrics import mean_squared_error, mean_absolute_error
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///myntra.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
UPLOAD_FOLDER = os.path.join(app.instance_path, 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
FORECAST_FOLDER = os.path.join(app.instance_path, 'forecasts')
app.config['FORECAST_FOLDER'] = FORECAST_FOLDER
CORS(app)
db = SQLAlchemy(app)

# Ensure the upload and forecast folders exist
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])
if not os.path.exists(app.config['FORECAST_FOLDER']):
    os.makedirs(app.config['FORECAST_FOLDER'])

# Models
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String(255), nullable=False)
    hashtags = db.Column(db.String(255), nullable=True)
    likes = db.Column(db.Integer, default=0)
    followers = db.Column(db.Integer, default=0)
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
            "image_url": f'/uploads/{os.path.basename(post.image_path)}',
            "hashtags": post.hashtags,
            "likes": post.likes,
            "followers": post.followers,
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

@app.route('/follow/<int:post_id>', methods=['POST'])
def follow_post(post_id):
    post = Post.query.get(post_id)
    if post:
        post.followers += 1
        db.session.commit()
        return jsonify({"message": "Post followed successfully", "followers": post.followers}), 200
    return jsonify({"message": "Post not found"}), 404

# below code is for the forecasts

# Load the data from CSV
df = pd.read_csv('Fashion_Retail_Sales.csv')

# Convert the 'Date Purchase' column to datetime
df['Date Purchase'] = pd.to_datetime(df['Date Purchase'])

# Extract the biweek and year
df['Year'] = df['Date Purchase'].dt.year
df['Biweek'] = (df['Date Purchase'].dt.isocalendar().week // 2) + 1

# Add a count column to track the number of items sold
df['Count'] = 1

# Group by 'Year', 'Biweek', and 'Item Purchased' and aggregate the sums
biweekly_sales = df.groupby(['Year', 'Biweek', 'Item Purchased']).agg({'Count': 'sum', 'Purchase Amount (USD)': 'sum'}).reset_index()

# Identify the 10 most profitable items
most_profitable_items = df.groupby('Item Purchased')['Purchase Amount (USD)'].sum().sort_values(ascending=False).head(10).index.tolist()

# Filter biweekly sales for the most profitable items
biweekly_sales_profitable = biweekly_sales[biweekly_sales['Item Purchased'].isin(most_profitable_items)]

# Identify the 10 most sold items
most_sold_items = df.groupby('Item Purchased')['Count'].sum().sort_values(ascending=False).head(10).index.tolist()

# Filter biweekly sales for the most sold items
biweekly_sales_sold = biweekly_sales[biweekly_sales['Item Purchased'].isin(most_sold_items)]

# Function to plot biweekly sales graph for a specified item (most profitable items)
# def plot_biweekly_sales_profitable(item):
#     item_sales = biweekly_sales_profitable[biweekly_sales_profitable['Item Purchased'] == item]
#     plt.figure(figsize=(12, 6))
#     sns.lineplot(data=item_sales, x='Biweek', y='Purchase Amount (USD)', hue='Year', marker='o')
#     plt.title(f'Biweekly Sales of {item} (Most Profitable Items)')
#     plt.xlabel('Biweek')
#     plt.ylabel('Total Purchase Amount (USD)')
#     plt.legend(title='Year')
#     plt.show()

# Function to plot biweekly sales graph for a specified item (most sold items)
# def plot_biweekly_sales_sold(item):
#     item_sales = biweekly_sales_sold[biweekly_sales_sold['Item Purchased'] == item]
#     plt.figure(figsize=(12, 6))
#     sns.lineplot(data=item_sales, x='Biweek', y='Count', hue='Year', marker='o')
#     plt.title(f'Biweekly Sales of {item} (Most Sold Items)')
#     plt.xlabel('Biweek')
#     plt.ylabel('Total Items Sold')
#     plt.legend(title='Year')
#     plt.show()

# Function to forecast future sales for a specified item using Prophet
def forecast_sales(item, periods=12):
    item_sales = biweekly_sales_profitable[biweekly_sales_profitable['Item Purchased'] == item].copy()
    item_sales['Date'] = pd.to_datetime(item_sales['Year'].astype(str) + '-W' + item_sales['Biweek'].astype(str).str.zfill(2) + '-1', errors='coerce', format='%Y-W%W-%w')
    item_sales.set_index('Date', inplace=True)
    item_sales = item_sales.resample('2W').sum().reset_index()

    # Prepare data for Prophet
    prophet_data = item_sales[['Date', 'Purchase Amount (USD)']].rename(columns={'Date': 'ds', 'Purchase Amount (USD)': 'y'})

    # Fit the Prophet model with hyperparameters
    model_prophet = Prophet(
        yearly_seasonality=True,
        weekly_seasonality=False,
        daily_seasonality=False,
        changepoint_prior_scale=0.5,
        seasonality_prior_scale=10.0,
        seasonality_mode='multiplicative'
    )
    model_prophet.add_seasonality(name='biweekly', period=14, fourier_order=5)
    model_prophet.fit(prophet_data)

    # Create future dataframe
    future = model_prophet.make_future_dataframe(periods=periods, freq='2W')

    # Forecast the future sales using Prophet
    forecast_prophet = model_prophet.predict(future)

    # Plot the actual sales and forecasts
    plt.figure(figsize=(12, 6))
    plt.plot(prophet_data['ds'], prophet_data['y'], label='Actual Sales')
    plt.plot(forecast_prophet['ds'], forecast_prophet['yhat'], label='Prophet Forecast', color='green')
    plt.fill_between(forecast_prophet['ds'], forecast_prophet['yhat_lower'], forecast_prophet['yhat_upper'], color='green', alpha=0.2)
    plt.title(f'Forecasted Biweekly Sales of {item}')
    plt.xlabel('Date')
    plt.ylabel('Total Purchase Amount (USD)')
    plt.legend()

    # Save the plot as an image file
    forecast_image_path = os.path.join(app.config['FORECAST_FOLDER'], f'{item}_forecast.png')
    plt.savefig(forecast_image_path)
    plt.close()

    # Calculate and print evaluation metrics
    test_data = prophet_data[prophet_data['ds'] >= '2023-01-01']
    test_forecast = forecast_prophet[forecast_prophet['ds'].isin(test_data['ds'])]
    mse_prophet = mean_squared_error(test_data['y'], test_forecast['yhat'])
    mae_prophet = mean_absolute_error(test_data['y'], test_forecast['yhat'])
    rmse_prophet = mean_squared_error(test_data['y'], test_forecast['yhat'], squared=False)

    return forecast_image_path

@app.route('/forecast/<item>', methods=['GET'])
def get_forecast(item):
    if item not in most_profitable_items:
        return jsonify({"error": "Item not found"}), 404
    
    forecast_image_path = os.path.join(app.config['FORECAST_FOLDER'], f'{item}_forecast.png')
    if os.path.exists(forecast_image_path):
        return send_from_directory(app.config['FORECAST_FOLDER'], os.path.basename(forecast_image_path))
    else:
        return jsonify({"error": "Forecast image not found"}), 404

@app.route('/top-profitable-items', methods=['GET'])
def get_top_profitable_items():
    top_items = most_profitable_items[:5]
    return jsonify(top_items), 200

@app.route('/engagement-by-hashtags', methods=['GET'])
def get_engagement_by_hashtags():
    posts = Post.query.all()
    hashtag_engagement = {}

    for post in posts:
        hashtags = post.hashtags.split(',')  # Assuming hashtags are comma-separated
        engagement_score = calculate_engagement_score(post.id)  # Calculate engagement score for each post

        for hashtag in hashtags:
            if hashtag.strip() not in hashtag_engagement:
                hashtag_engagement[hashtag.strip()] = []
            hashtag_engagement[hashtag.strip()].append(engagement_score)

    average_engagement_by_hashtag = {}
    for hashtag, scores in hashtag_engagement.items():
        average_engagement_by_hashtag[hashtag] = sum(scores) / len(scores)

    return jsonify(average_engagement_by_hashtag)


def analyze_sentiment(posts):
    analyzer = SentimentIntensityAnalyzer()
    results = {"Hashtag": [], "Positive": [], "Negative": [], "Neutral": []}

    for post in posts:
        # Compute sentiment scores based on post attributes like hashtags, likes, comments
        sentiment = analyzer.polarity_scores(post.hashtags)  # Example, adjust as per your data
        results["Hashtag"].append(post.hashtags)
        results["Positive"].append(sentiment['pos'])
        results["Negative"].append(sentiment['neg'])
        results["Neutral"].append(sentiment['neu'])

    return results

@app.route('/sentiment', methods=['GET'])
def get_sentiment():
    posts = Post.query.all()  # Fetch all posts (you may need to optimize this query)
    results = analyze_sentiment(posts)
    return jsonify(results)



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
