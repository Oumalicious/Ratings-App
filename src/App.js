import { useEffect, useState, useRef } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { getAllMovies, saveMovie, updatePhoto } from './api/MovieService';
import HeaderComponent from './components/HeaderComponent';
import MovieListComponent from './components/MovieListComponent';
import MovieDetailComponent from './components/MovieDetailComponent';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    title: '',
    originalTitle: '',
    releaseYear: '',
    rating: '',
    country: '',
    originalFileName: '',
    data: []
  });
  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();
  const modalRef = useRef();
  const fileRef = useRef();

  const getMovies = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getAllMovies(page, size);
      setData(data);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewMovie = async (e) => {
    e.preventDefault();
    try {
      const {data: savedMovie} = await saveMovie(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', savedMovie.id);
      const {data: image} = await updatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        title: '',
        originalTitle: '',
        releaseYear: '',
        rating: '',
        country: '',
        originalFileName: ''
      })
      getMovies();
    } catch (err) {
      console.error(err);
    }
  }

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const disableArrowKeys = (event) => {
    if (event.key == 'ArrowUp' || event.key == 'ArrowDown') {
      event.preventDefault();
    }
  }

  const updateMovie = async (movie) => {
    try {
      const { data } = await saveMovie(movie);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updateImage(formData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <HeaderComponent toggleModal={toggleModal} dataSize={data.length} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/movies"} />} />
            <Route path="/movies" element={<MovieListComponent data={data} currentPage={currentPage} getMovies={getMovies} />} />
            <Route path="/movies/:id" element={<MovieDetailComponent updateMovie={updateMovie} updateImage={updateImage} />} />
          </Routes>
        </div>
      </main>

      {/* Modal : Adding movie */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewMovie}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.title} onChange={onChange} placeholder="e.g.:Parasite" name="title" required />
              </div>
              <div className="input-box">
                <span className="details">Original Title</span>
                <input type="text" value={values.originalTitle} onChange={onChange} placeholder="e.g.:기생충" name="originalTitle" />
              </div>
              <div className="input-box">
                <span className="details">Counter</span>
                <input type="text" value={values.country} placeholder="e.g.: South Korea" onChange={onChange} name="country" required />
              </div>
              <div className="input-box">
                <span className="details">Release Year</span>
                <input className="no-spinner" type="number" min="1" max="9999" value={values.releaseYear} placeholder="XXXX" onChange={onChange} onKeyDown={disableArrowKeys} name="releaseYear" required />
              </div>
              <div className="input-box">
                <span className="details">Rating</span>
                <input className="no-spinner" type="number" min="0" max="10" step="0.1" value={values.rating} placeholder="0.0 - 5.0" onChange={onChange} onKeyDown={disableArrowKeys} name="rating" required />
              </div>
              <div className="file-input">
                <span className="details">Image</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name="photo" required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type="button" className="btn btn-danger">Cancel</button>
              <button type="submit" className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>



  );
}

export default App;
