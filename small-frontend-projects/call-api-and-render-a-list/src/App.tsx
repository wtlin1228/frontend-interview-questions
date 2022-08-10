import { useEffect, useState } from 'react'

const endpoint = `http://localhost:8080/pokedex?limit=30&offset=0`

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
    backgroundColor: 'fdb9e9',
  },
  fighting: {
    color: '#fff',
    backgroundColor: '#d56723',
  },
}

function App() {
  const [pokemons, setPokemons] = useState([])

  console.log(pokemons)

  useEffect(() => {
    const fetchPokemons = () =>
      fetch(endpoint)
        .then((res) => res.json())
        .then((json) => json.data)
        .then(({ next, pokemons }) => {
          setPokemons(pokemons)
        })

    fetchPokemons()
  }, [])

  return (
    <div
      style={{
        padding: '0 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        justifyItems: 'center',
        gap: '30px 20px',
      }}
    >
      {pokemons.map(
        ({ id, ThumbnailImage, ThumbnailAltText, name, type, number }) => (
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
              <img
                src={ThumbnailImage}
                alt={ThumbnailAltText}
                style={{
                  width: '100%',
                }}
              />
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
                {(type as string[]).map((ability) => (
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
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default App
