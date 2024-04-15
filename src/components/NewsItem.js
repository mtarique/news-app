import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title, description, imgUrl, newsUrl, author, publishedAt, source} = this.props; 
    return (
      <div>
        <div className="card h-100" style={{width: "18rem"}}>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%', zIndex: 1}}>{source}</span>
            <img src={imgUrl} className="card-img-top img-thumbnail" alt="..."  style={{maxHeight: "160px", minHeight: "160px"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
