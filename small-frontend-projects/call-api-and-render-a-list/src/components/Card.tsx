import useImageWithPlaceholder from '../hooks/useImageWithPlaceholder'
import Ability from './Ability'

const Card = ({
  id,
  ThumbnailImage,
  ThumbnailAltText,
  name,
  type,
  number,
}: {
  id: number
  ThumbnailImage: string
  ThumbnailAltText: string
  name: string
  type: string[]
  number: string
}) => {
  const imageSrc = useImageWithPlaceholder(ThumbnailImage)

  return (
    <div
      key={id}
      style={{
        maxWidth: '340px',
        width: '100%',
      }}
    >
      <figure
        style={{
          background: '#f2f2f2',
          borderRadius: '5px',
          width: '100%',
        }}
      >
        <img style={{ width: '100%' }} src={imageSrc} alt={ThumbnailAltText} />
      </figure>
      <div style={{ paddingLeft: '6px' }}>
        <p
          style={{
            fontWeight: '500',
            color: '#919191',
            fontSize: '10px',
            marginTop: '4px',
          }}
        >
          #{number}
        </p>
        <h5
          style={{
            color: '#313131',
            marginTop: '10px',
            fontSize: '18px',
          }}
        >
          {name}
        </h5>
        <div
          style={{
            marginTop: '10px',
          }}
        >
          {type.map((ability, idx) => (
            <Ability key={idx} ability={ability} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
