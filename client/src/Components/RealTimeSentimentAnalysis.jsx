
import PhotoUpload from "./PhotoUpload";
import PostList from "./PostList";
import SentimentGraph from "./SentimentGraph";

function App() {
  return (
    <div className="bg-orange-50">
      <div>
        <PhotoUpload />
        <PostList />
        <SentimentGraph />
      </div>
    </div>
  );
}

export default App;
