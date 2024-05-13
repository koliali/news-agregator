
const SingleNews = ({title,description,image,url}) => {
  return (
    <div className="col-12 col-md-4 col-xl-3" >
      <div className="card h-100" >
          <img src={image} className="card-img-top img-fluid" alt={image?"":"No Image"}
          style={{ minHeight: '200px' }} 
           />
          <div className="card-body">
          <h5 className="card-title">{title?title.slice(0,40):""}</h5>
          <p className="card-text">{description?description.slice(0,90):""}</p>
          <a href={url} className="btn btn-primary">Read More</a>
          </div>
      </div>
    </div>
  )
}

export default SingleNews
