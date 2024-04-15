import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: "in", 
    pageSize: 4, 
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string, 
    pageSize: PropTypes.number, 
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1); 
  }

  constructor(props) {
    super(props); 
    this.state = { articles: [], loading: false, page: 1 }
    document.title = this.capitalizeFirstLetter(this.props.category)+" - NewsMonkey"; 
  }

  async fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2b98c9fc37b842cd85dd54abb673f30c&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
    let response = await fetch(url); 
    this.setState({loading: true}); 
    response = await response.json();
    this.setState({articles: response.articles, totalResults: response.totalResults, loading: false})
  }

  async componentDidMount() {
    this.fetchNews()
  }

  handleNextClick = async () => {
    await this.setState({page: this.state.page+1})
    this.fetchNews(); 
  }

  handlePrevClick = async () => {
    await this.setState({page: this.state.page-1})
    this.fetchNews()
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='mb-3'>{this.capitalizeFirstLetter(this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
            {!this.state.loading && this.state.articles.map((article, idx) => {
                if(article.title !== null && article.description !== null) {
                  return <div className="col-md-3 mb-3" key={idx}>
                          <NewsItem title={article.title.slice(0, 45)} description={article.description.slice(0, 88)} imgUrl={article.urlToImage ? article.urlToImage : "https://demofree.sirv.com/nope-not-here.jpg"} newsUrl={article.url} author={article.author ? article.author : "Unknown"} publishedAt={article.publishedAt} source={article.source.name ? article.source.name : "Unknown"} />
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
