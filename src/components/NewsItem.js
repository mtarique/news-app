import React from "react";

const NewsItem = (props) => {
  let { title, description, imgUrl, newsUrl, author, publishedAt, source } = props;
  return (
    <div>
      <div className="card h-100 w-100" styles={{ width: "18rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0",
          }}
        >
          <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
        <img
          src={imgUrl}
          className="card-img-top img-thumbnail-"
          alt="..."
          style={{ maxHeight: "160px", minHeight: "160px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {author} on {new Date(publishedAt).toGMTString()}
            </small>
          </p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
