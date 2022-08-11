const LoadMoreButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div
      style={{
        margin: '50px 0',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <button
        style={{
          backgroundColor: '#30a7d7',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          padding: '12px 60px',
          fontSize: '20px',
        }}
        onClick={() => handleClick()}
      >
        More Pokemon!
      </button>
    </div>
  )
}

export default LoadMoreButton
