// import { Link, useParams } from 'react-router-dom';
// import { getContact } from '../api/ContactService';
// import { toastError, toastSuccess } from '../api/ToastService';
import { useEffect, useState, useRef } from 'react';
import { saveMovie, getMovie, updateMovie } from '../api/MovieService';
import { data, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const MovieDetailComponent = ({ updateMovie, updateImage }) => {
    const [movie, setMovie] = useState({
        title: '',
        originalTitle: '',
        releaseYear: '',
        rating: '',
        country: '',
        originalFileName: '',
        data: [],
        fileType: ''
    });
    const fileRef = useRef();
    const { id } = useParams();

    const fetchMovie = async (id) => {
        try {
            const { data } = await getMovie(id);
            setMovie(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdatedMovie = async (e) => {
        // e.preventDefault();
        //     try {
        //       const {data: savedMovie} = await saveMovie(movie);
        //       const formData = new FormData();
        //       formData.append('file', file, file.name);
        //       formData.append('id', savedMovie.id);
        //       const {data: image} = await updatePhoto(formData);
        //       toggleModal(false);
        //       setFile(undefined);
        //       fileRef.current.value = null;
        //       setMovie({
        //         title: '',
        //         originalTitle: '',
        //         releaseYear: '',
        //         rating: '',
        //         country: '',
        //         originalFileName: '',
        //         fileType: ''
        //       })
        //       getMovies();
        //     } catch (err) {
        //       console.error(err);
        //     }
    };

    const selectPhoto = () => {
        fileRef.current.click();
    };

    const changePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let dataString = reader.result;
                dataString = dataString.substring(dataString.indexOf(";base64,")+8, dataString.length);
                setMovie({...movie, data: dataString});
            };
            reader.onerror = (readerErr) => {
                console.error({"FileReaderErr": readerErr});
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMovie(id);
    }, []);

    return (
        <>
            <Link to={"/movies"} className="link"><i className='bi bi-arrow-left'></i> Back to List </Link>
            <div className="profile">
                <div className="profile__details">
                    <img src={`data:${movie.fileType};base64,${movie.data}`} alt={`Image of movie ${movie.title}`} />
                    <div className="profile__metadata">
                        <p className="profile__name">{movie.title}</p>
                        <p className="profile__muted">JPG, GIF, or PNG</p>
                        <button onClick={selectPhoto} className='btn'><i className='bi bi-cloud-upload'></i>Change Photo</button>
                    </div>
                </div>
                <div className="profile__settings"> Settings </div>
            </div>
            <form style={{ display: "none" }}>
                <input type='file' ref={fileRef} onChange={(event) => changePhoto(event.target.files[0])} name="photo" accepts="image/*" />
            </form>
        </>
    )
}
// const ContactDetail = ({ updateContact, updateImage }) => {
//     const inputRef = useRef();
//     const [contact, setContact] = useState({
//         id: '',
//         name: '',
//         email: '',
//         phone: '',
//         address: '',
//         title: '',
//         status: '',
//         photoUrl: ''
//     });

//     const { id } = useParams();

//     const fetchContact = async (id) => {
//         try {
//             const { data } = await getContact(id);
//             setContact(data);
//             console.log(data);
//             //toastSuccess('Contact retrieved');
//         } catch (error) {
//             console.log(error);
//             toastError(error.message);
//         }
//     };

//     const selectImage = () => {
//         inputRef.current.click();
//     };

//     const udpatePhoto = async (file) => {
//         try {
//             const formData = new FormData();
//             formData.append('file', file, file.name);
//             formData.append('id', id);
//             await updateImage(formData);
//             setContact((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}?updated_at=${new Date().getTime()}` }));
//             toastSuccess('Photo updated');
//         } catch (error) {
//             console.log(error);
//             toastError(error.message);
//         }
//     };

//     const onChange = (event) => {
//         setContact({ ...contact, [event.target.name]: event.target.value });
//     };

//     const onUpdateContact = async (event) => {
//         event.preventDefault();
//         await updateContact(contact);
//         fetchContact(id);
//         toastSuccess('Contact Updated');
//     };

//     useEffect(() => {
//         fetchContact(id);
//     }, []);

//     return (
//         <>
//             <Link to={'/contacts'} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
//             <div className='profile'>
//                 <div className='profile__details'>
//                     <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
//                     <div className='profile__metadata'>
//                         <p className='profile__name'>{contact.name}</p>
//                         <p className='profile__muted'>JPG, GIF, or PNG. Max size of 10MG</p>
//                         <button onClick={selectImage} className='btn'><i className='bi bi-cloud-upload'></i> Change Photo</button>
//                     </div>
//                 </div>
//                 <div className='profile__settings'>
//                     <div>
//                         <form onSubmit={onUpdateContact} className="form">
//                             <div className="user-details">
//                                 <input type="hidden" defaultValue={contact.id} name="id" required />
//                                 <div className="input-box">
//                                     <span className="details">Name</span>
//                                     <input type="text" value={contact.name} onChange={onChange} name="name" required />
//                                 </div>
//                                 <div className="input-box">
//                                     <span className="details">Email</span>
//                                     <input type="text" value={contact.email} onChange={onChange} name="email" required />
//                                 </div>
//                                 <div className="input-box">
//                                     <span className="details">Phone</span>
//                                     <input type="text" value={contact.phone} onChange={onChange} name="phone" required />
//                                 </div>
//                                 <div className="input-box">
//                                     <span className="details">Address</span>
//                                     <input type="text" value={contact.address} onChange={onChange} name="address" required />
//                                 </div>
//                                 <div className="input-box">
//                                     <span className="details">Title</span>
//                                     <input type="text" value={contact.title} onChange={onChange} name="title" required />
//                                 </div>
//                                 <div className="input-box">
//                                     <span className="details">Status</span>
//                                     <input type="text" value={contact.status} onChange={onChange} name="status" required />
//                                 </div>
//                             </div>
//                             <div className="form_footer">
//                                 <button type="submit" className="btn">Save</button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>

//             <form style={{ display: 'none' }}>
//                 <input type='file' ref={inputRef} onChange={(event) => udpatePhoto(event.target.files[0])} name='file' accept='image/*' />
//             </form>
//         </>
//     )
// }

export default MovieDetailComponent;