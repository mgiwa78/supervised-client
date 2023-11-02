const Spinner = () => {
  const styles = {
    borderRadius: '0.475rem',
    boxShadow: '0 0 50px 0 rgb(82 63 105 / 15%)',
    backgroundColor: '#fff',
    color: '#7e8299',
    fontWeight: '500',
    margin: '0',
    width: 'max-content',
    padding: '1rem 2rem',
  }

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        padding: '50px 0',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{...styles, textAlign: 'center'}}> Loading...</div>
    </div>
  )
}

export {Spinner}
