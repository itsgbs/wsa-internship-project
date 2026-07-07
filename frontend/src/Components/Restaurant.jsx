import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteRestaurant, analyzeReviews } from "../redux/actions/restaurantAction";

const Restaurant = ({ restaurant }) => {
  const dispatch = useDispatch();
  const [showAI, setShowAI] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const { isAuthenticated, user } = useSelector(
    (state) => state.user || {}
  );

  useEffect(() => {
    // Set up any initial effects if needed
  }, [restaurant]);

  const handleShowAI = async () => {
    if (!showAI && !restaurant.reviewSentiment) {
      // Trigger AI analysis if not done yet
      setAnalyzing(true);
      try {
        await dispatch(analyzeReviews(restaurant._id));
        setShowAI(true);
      } catch (error) {
        console.error("Analysis failed:", error);
        alert("Failed to analyze reviews");
      } finally {
        setAnalyzing(false);
      }
    } else {
      setShowAI(!showAI);
    }
  };

  //DELETE
  const handleDelete = () => {
    if (!window.confirm("Delete this restaurant?")) return;

    dispatch(deleteRestaurant(restaurant._id)).catch(() => {
      alert("Unable to delete");
    });
  };
  return (
    <div className="col-12 my-3">
    <div className="card restaurant-card p-3">

  <Link to={`/eats/stores/${restaurant._id}/menus`}>
    <img
      className="restaurant-image"
      src={restaurant.images?.[0]?.url}
      alt={restaurant.name}
    />
  </Link>

  <div className="restaurant-info">

    <h4>{restaurant.name}</h4>

    <p className="rest_address">
      {restaurant.address}
    </p>

    <div className="ratings">
      <div className="rating-outer">
        <div
          className="rating-inner"
          style={{
            width: `${(restaurant.ratings / 5) * 100}%`,
          }}
        ></div>
      </div>

      <span>
        ({restaurant.numOfReviews} Reviews)
      </span>
    </div>

    {restaurant.numOfReviews > 0 && (
      <>
        <button
          className="ai-btn"
          onClick={handleShowAI}
          disabled={analyzing}
        >
          {analyzing
            ? "⏳ Analyzing..."
            : showAI
            ? "➖ Hide Summary"
            : "💬 View Review Summary"}
        </button>
      </>
    )}

  </div>

    {showAI && (
      <div className="ai-insights-box">

      <div className="ai-status">
      Review Summary : 
          😊 <strong>
            {restaurant.reviewSentiment || "Analyzing..."}
          </strong>
       
        </div>

        <ul>
          {(restaurant.reviewSummaryBullets || []).map(
            (point, index) => (
              <li key={index}>{point}</li>
            )
          )}
        </ul>

        <div className="mentions">
          {(restaurant.reviewTopMentions || []).map(
            (item, index) => (
              <span
                key={index}
                className="mention-tag"
              >
                #{item}
              </span>
            )
          )}
        </div>

      </div>
    )}

</div>

 {isAuthenticated && user && user.role === "admin" && (
            <button
              className="btn btn-danger btn-sm mt-2"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
    </div>
  );
};

export default Restaurant;