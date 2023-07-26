const CarCard = ( props : any ) => {
  return (
    <a href="google.com" className="card w-96 bg-base-100 shadow-xl m-2">
        <figure><img className="w-96 h-64 object-cover" src={props.carPhoto} alt={props.carBrand} /></figure>
        <div className="card-body">
            <h2 className="card-title">
            {props.carBrand}
                <div className="badge badge-primary text-white translate-y-0.5">
                    {props.postType === 'Sell' ? 'Sell Post/売りポスト' : 'Buy Post/ 買いポスト'}
                </div>
            </h2>
            <p>{props.releaseYear}, {props.carModel}</p>
            <p className="text-xl font-bold">Price: {props.price}</p>
            <div className="card-actions justify-end">
            </div>
        </div>
    </a>
    )
  }
  
  export default CarCard