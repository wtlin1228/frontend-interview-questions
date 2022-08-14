export default function Row({
  startArea,
  name,
  children,
}: {
  startArea?: React.ReactNode
  name: string
  children?: React.ReactNode
}) {
  return (
    <>
      <div
        style={{
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {startArea && (
          <div
            style={{
              display: 'grid',
              placeContent: 'center',
              minWidth: '40px',
            }}
          >
            {startArea}
          </div>
        )}
        <p>{name}</p>
      </div>
      <div style={{ marginLeft: '40px' }}>{children}</div>
    </>
  )
}
