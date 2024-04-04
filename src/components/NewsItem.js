import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title, description, imgUrl, newsUrl} = this.props; 
    return (
      <div>
        <div className="card h-100" style={{width: "18rem"}}>
            <img src={imgUrl} className="card-img-top img-thumbnail" alt="..."  style={{maxHeight: "160px", minHeight: "160px"}}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
