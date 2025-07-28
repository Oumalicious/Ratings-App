const HeaderComponent = ({ toggleModal, dataSize}) => {

  return (
    <header className='header'>
        <div className='container'>
            <h3>Movie List: ({dataSize})</h3>
            <button className='btn' onClick={() => toggleModal(true)}>
                <i className='bu bi-plus-quare'></i>Add New Movie
            </button>
        </div>
    </header>
  )
}

export default HeaderComponent;