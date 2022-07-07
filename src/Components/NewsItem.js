import React from 'react'

const NewsItem= (props)=> {

    let {title,description,imageUrl,newsUrl,author,date}=props;
    return (
      <div className='my-3'>
         <div className="card" >
           <img src={!imageUrl?"https://static.toiimg.com/photo/92595751.cms":imageUrl }  className="card-img-top" alt="..."/>
               <div className="card-body" >
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author?"unknown" :author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read more</a>
              </div>
         </div>
    </div>
    )
}

export default NewsItem
