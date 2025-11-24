import { useParams } from "react-router-dom";
import "./TrackOrderPage.css";

const TrackOrderPage = () => {
  const { orderId } = useParams();

  return (
    <div className="track-container">
      <h2>Live Tracking</h2>
      <p>Order ID: {orderId}</p>

      <img
        src="/dummy-map.png"
        alt="Map"
        className="map-img"
      />
    </div>
  );
};

export default TrackOrderPage;
