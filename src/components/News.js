import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super(); 
        this.state = { articles: [], loading: false }
    }

    async componentDidMount() {
        let response = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=2b98c9fc37b842cd85dd54abb673f30c"); 
        response = await response.json()
        //console.log(response);
        this.setState({articles: response.articles})
    }
  render() {
    return (
      <div className='container my-3'>
        <h1>Top Headlines</h1>
        
        <div className="row">
            {this.state.articles.map((article, idx) => {
                if(article.title !== null && article.description !== null) {
                return <div className="col-md-3 mb-3" key={idx}>
                        <NewsItem title={article.title.slice(0, 45)} description={article.description.slice(0, 88)} imgUrl={article.urlToImage ? article.urlToImage : "https://demofree.sirv.com/nope-not-here.jpg"} newsUrl={article.url} />
                    </div>
                }
            })}
        </div>
      </div>
    )
  }
}

export default News
