import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    constructor() {
        super(); 
        this.state = { articles: [], loading: false, page: 1 }
    }

    async componentDidMount() {
        let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=2b98c9fc37b842cd85dd54abb673f30c&page=1&pageSize=${this.props.pageSize}`); 
        this.setState({loading: true}); 
        response = await response.json()
        //console.log(response);
        this.setState({articles: response.articles, totalResults: response.totalResults, loading: false})
    }

    handleNextClick = async () => {
      // console.log("Next");  
      if(!this.state.page + 1 < Math.ceil(this.state.totalResults/this.props.pageSize)) {
        let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=2b98c9fc37b842cd85dd54abb673f30c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`); 
        this.setState({loading: true});  
        response = await response.json()
        //console.log(response);
        
        this.setState({
          articles: response.articles,
          page: this.state.page+1, 
          loading: false
        }) 
      }
    }

    handlePrevClick = async () => {
      console.log("Previous")
      let response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=2b98c9fc37b842cd85dd54abb673f30c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`); 
      this.setState({loading: true}); 
      response = await response.json()
      //console.log(response);
      
      this.setState({
        articles: response.articles,
        page: this.state.page-1, 
        loading: false
      }) 
    }
  render() {
    return (
      <div className='container my-3'>
        <h1>Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
            {!this.state.loading && this.state.articles.map((article, idx) => {
                if(article.title !== null && article.description !== null) {
                return <div className="col-md-3 mb-3" key={idx}>
                        <NewsItem title={article.title.slice(0, 45)} description={article.description.slice(0, 88)} imgUrl={article.urlToImage ? article.urlToImage : "https://demofree.sirv.com/nope-not-here.jpg"} newsUrl={article.url} />
                    </div>
                }
            })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page <= 1} className="btn btn-sm btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-sm btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
