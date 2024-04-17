import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResult] = useState(0)

  // document.title = this.capitalizeFirstLetter(this.props.category) + " - NewsMonkey";

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const fetchNews = async (props) => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let response = await fetch(url);
    props.setProgress(30)
    setLoading(true);
    response = await response.json();
    props.setProgress(70)
    setArticle(response.articles); 
    setTotalResult(response.totalResults); 
    setLoading(false); 
    props.setProgress(100)
  }

  useEffect(() => {
    fetchNews();
  }, [])

  const handleNextClick = async () => {
    setPage(page+1);
    fetchNews();
  };

  const handlePrevClick = async () => {
    setPage(page-1);
    fetchNews();
  };

  const fetchMoreData = async (props) => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setPage(page+1);
    // this.fetchNews();
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let response = await fetch(url);
    setLoading(true);
    response = await response.json();
    setArticle(article.concat(response.articles)); 
    setTotalResult(response.totalResults); 
    setLoading(false); 
  };

 
  return (
    <>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length <= totalResults}
        loader={<Spinner />}
      >
        <div className="container my-3">
          <h1 className="mb-3">
            {capitalizeFirstLetter(props.category)}
          </h1>
          <div className="row">
            {article.map((article, idx) => {
              if (article.title !== null && article.description !== null) {
                return (
                  <div className="col-md-3 mb-3" key={idx}>
                    <NewsItem
                      title={article.title.slice(0, 45)}
                      description={article.description.slice(0, 88)}
                      imgUrl={
                        article.urlToImage
                          ? article.urlToImage
                          : "https://demofree.sirv.com/nope-not-here.jpg"
                      }
                      newsUrl={article.url}
                      author={article.author ? article.author : "Unknown"}
                      publishedAt={article.publishedAt}
                      source={
                        article.source.name ? article.source.name : "Unknown"
                      }
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page <= 1} className="btn btn-sm btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-sm btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
      </div> */}
    </>
  );
}

News.defaultProps = {
  country: "in",
  pageSize: 4,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
