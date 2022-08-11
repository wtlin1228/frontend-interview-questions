const abilityStyle = {
  grass: {
    color: '#212121',
    backgroundColor: '#9bcc50',
  },
  poison: {
    color: '#fff',
    backgroundColor: '#b97fc9',
  },
  fire: {
    color: '#fff',
    backgroundColor: '#fd7d24',
  },
  flying: {
    color: '#212121',
    backgroundColor: 'linear-gradient(180deg, #3dc7ef 50%, #bdb9b8 50%)',
  },
  water: {
    color: '#fff',
    backgroundColor: '#4592c4',
  },
  bug: {
    color: '#fff',
    backgroundColor: '#729f3f',
  },
  normal: {
    color: '#212121',
    backgroundColor: '#a4acaf',
  },
  electric: {
    color: '#212121',
    backgroundColor: '#eed535',
  },
  ground: {
    color: '#212121',
    backgroundColor: 'linear-gradient(180deg, #f7de3f 50%, #ab9842 50%)',
  },
  fairy: {
    color: '#212121',
    backgroundColor: '#fdb9e9',
  },
  fighting: {
    color: '#fff',
    backgroundColor: '#d56723',
  },
}

const Ability = ({ ability }: { ability: string }) => {
  return (
    <span
      style={{
        marginRight: '4px',
        // @ts-expect-error
        background: abilityStyle[ability]?.backgroundColor,
        // @ts-expect-error
        color: abilityStyle[ability]?.color,
        padding: '1px 40px',
        borderRadius: '6px',
        fontSize: '11px',
      }}
    >
      {ability}
    </span>
  )
}

export default Ability
