import MovieComponent from './MovieComponent'

const MovieListComponent = ({ data, currentPage, getMovies }) => {
  return (
    <main className='main'>
        {data?.length === 0 && <div>No Movies. Please add a movie.</div>}
        <ul className='movie__list'>
            {data?.length > 0 && data.map(movie => <MovieComponent movie={movie} key={movie.id} />)} 
        </ul>
        {data?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <a onClick={() => getMovies(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                { data && [...Array(data.totalPages).keys()].map((page) => 
                    <a onClick={() => getMovies(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}


                <a onClick={() => getMovies(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>            
            }
     </main>
  )
}

export default MovieListComponent