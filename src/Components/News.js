import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const  News= (props)=> {
 
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResult]=useState(0)

   const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

    // document.title = `${this.capitalizeFirstLetter(props.category)} -news`;


  const updateNews= async()=> {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=52291ea527ec4ffba1e55a2a5732bf96&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: true });
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30)
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResult(parsedData.totalResults);
    setLoading(false)
    props.setProgress(100)

  }

  useEffect(()=>{
     document.title = `${capitalizeFirstLetter(props.category)} -news`;
    updateNews();
  },[])

  // async componentDidMount() {
  //   // console.log("dfsadf")
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bc94b06b07a744e7bce5aef56dda365f&page=1&pageSize=${props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log({ articles: parsedData.articles })
  //   // this.setState({
  //   //   articles: parsedData.articles,
  //   //   totalResults: parsedData.totalResults,
  //   //   loading: false
  //   // });
  //   this.updateNews();

  // }
   const handlePrevClick = async () => {
    // console.log("previous")
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bc94b06b07a744e7bce5aef56dda365f&page=${this.state.page - 1}&pageSize=${props.pageSize} `;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    setPage(page-1)
    updateNews();

  }
  const handleNextClick = async () => {
    // if (this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)) {

    // }
    // else {

      // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=bc94b06b07a744e7bce5aef56dda365f&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
      // this.setState({ loading: true });
      // let data = await fetch(url);
      // let parsedData = await data.json();
      // // this.setState({loading:false});
      // this.setState({
      //   page: this.state.page + 1,
      //   articles: parsedData.articles,
      //   loading: false
      // })
      // this.setState({ page: this.state.page + 1 })
      setPage(page+1)
      updateNews();


    // }

  }
   const fetchMoreData = async () => {
    setPage(page+1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=52291ea527ec4ffba1e55a2a5732bf96&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log({ articles: parsedData.articles })
    setArticles(articles.concat(parsedData.articles))
    setTotalResult(parsedData.totalResults);
  

  };
    return ( 
       <>
         <h2 className='text-center ' style={{marginTop:'100px'}}>Top  {capitalizeFirstLetter(props.category)} HeadLines</h2>
        {/* {/* {this.state.loading && <Spinner />}  */}

        <InfiniteScroll

          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          // loader={<Spinner/>}

          
          >

            <div className="container">

            <div className="row">
              {articles.map((element) => {

                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
            </div>
        </InfiniteScroll>

          </>

   ) 
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: 'general',

}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News 
