import React from 'react'

const MovieCard = ({movie : {title , vote_average,vote_count,poster_path,release_date,original_language}}) => {
  return (
    <div className='movie-card '>
      <img src={poster_path?`https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png' } alt={title}/>
    
    <div className='p-4 text-white'><h3>{title}</h3>
    <div className=' mt-1'>
      
         <img src='star.svg' className="w-4 h-4 object-contain inline-block align-middle mr-1"/>
         <p className='inline-block align-middle'>{vote_average ? vote_average.toFixed(1) :" N/A"}</p>
      
      <span className='ml-1 mr-1 align-middle'>•</span>
      <span className="align-middle uppercase text-sm text-gray-400">
        {original_language}
      </span>
      <span className='ml-1 mr-1 align-middle'>•</span>
      <span className="align-middle uppercase text-sm text-gray-400">
        {release_date ? release_date.split('-')[0] : 'N/A' }
      </span>
    </div></div>
    </div>
  )
}

export default MovieCard
