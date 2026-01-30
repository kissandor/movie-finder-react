import '../style/components.css'

function Error({err}) {
    return (
       
        <div className="loader-container">
            <p>{err.message || 'Something went wrong'}</p>
        </div>
    )
}

export default Error