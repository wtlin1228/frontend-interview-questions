import { dreams151 } from './data'

const HEADERS = {
  number: {
    id: 'number',
    dataType: 'string',
    querySelector: '#dream-table-header #number',
    text: 'Number',
  },
  name: {
    id: 'name',
    dataType: 'string',
    querySelector: '#dream-table-header #name',
    text: 'Name',
  },
  height: {
    id: 'height',
    dataType: 'number',
    querySelector: '#dream-table-header #height',
    text: 'Height',
  },
  weight: {
    id: 'weight',
    dataType: 'number',
    querySelector: '#dream-table-header #weight',
    text: 'Weight',
  },
}

const HEADER_IDS = [
  HEADERS.number.id,
  HEADERS.name.id,
  HEADERS.height.id,
  HEADERS.weight.id,
]

const dreamTableBody = document.getElementById('dream-table-body')
const searchInput = document.getElementById('search')

let parsedData
let currentDisplayedData

const SORTING_TYPE = {
  increment: 'increment',
  decrement: 'decrement',
  none: 'none',
}
const currentSortingSetting = {
  header: null,
  sortingType: SORTING_TYPE.none,
}

/* -------------------------------------------------------------------------- */
/*                            Create HTML Elements                            */
/* -------------------------------------------------------------------------- */
const createDreamTableRow = (pokemon) => {
  const row = document.createElement('tr')

  HEADER_IDS.forEach((header) => {
    const cell = document.createElement('td')
    cell.innerText = pokemon[header]
    cell.headers = header
    row.append(cell)
  })

  return row
}

const renderDreamTableRows = () => {
  dreamTableBody.innerHTML = ''
  dreamTableBody.append(
    ...currentDisplayedData.map(({ rowElement }) => rowElement)
  )
}

/* -------------------------------------------------------------------------- */
/*                                   Search                                   */
/* -------------------------------------------------------------------------- */
const handleSearch = (keyword) => {
  currentDisplayedData = parsedData.filter(({ rawData }) =>
    rawData.name.toLowerCase().includes(keyword.toLowerCase())
  )

  renderDreamTableRows()
}

const debounce = (fn, delay) => {
  let timeoutId

  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

const debouncedHandleSearch = debounce(handleSearch, 300)

searchInput.addEventListener('input', (e) =>
  debouncedHandleSearch(e.target.value)
)

/* -------------------------------------------------------------------------- */
/*                                    Sort                                    */
/* -------------------------------------------------------------------------- */
const compareString = (a, b) => {
  const { header, sortingType } = currentSortingSetting

  if (sortingType === SORTING_TYPE.increment) {
    return a.rawData[header].localeCompare(b.rawData[header])
  }

  return b.rawData[header].localeCompare(a.rawData[header])
}

const compareNumber = (a, b) => {
  const { header, sortingType } = currentSortingSetting

  if (sortingType === SORTING_TYPE.increment) {
    return a.rawData[header] - b.rawData[header]
  }

  return b.rawData[header] - a.rawData[header]
}

const sortCurrentDisplayedData = () => {
  const { header, sortingType } = currentSortingSetting

  if (header === null || sortingType === SORTING_TYPE.none) {
    return
  }

  if (HEADERS[header].dataType === 'string') {
    currentDisplayedData.sort(compareString)
  } else if (HEADERS[header].dataType === 'number') {
    currentDisplayedData.sort(compareNumber)
  }

  renderDreamTableRows()
}

const handleSortingSettingChange = (header, sortingType) => {
  currentSortingSetting.header = header
  currentSortingSetting.sortingType = sortingType

  sortCurrentDisplayedData()
}

const updateTableHeader = () => {
  const { header, sortingType } = currentSortingSetting

  Object.keys(HEADERS).forEach((key) => {
    const { id, querySelector, text } = HEADERS[key]
    if (id === header) {
      if (sortingType === SORTING_TYPE.increment) {
        document.querySelector(querySelector).innerText = `${text} ^`
      } else if (sortingType === SORTING_TYPE.decrement) {
        document.querySelector(querySelector).innerText = `${text} v`
      }
    } else {
      document.querySelector(querySelector).innerText = text
    }
  })
}

const handleTableHeaderClick = (clickedHeader) => {
  const { header, sortingType } = currentSortingSetting

  if (header !== clickedHeader) {
    handleSortingSettingChange(clickedHeader, SORTING_TYPE.increment)
  } else if (sortingType === SORTING_TYPE.increment) {
    handleSortingSettingChange(clickedHeader, SORTING_TYPE.decrement)
  } else {
    handleSortingSettingChange(clickedHeader, SORTING_TYPE.increment)
  }

  updateTableHeader()
}

HEADER_IDS.forEach((header) =>
  document
    .querySelector(HEADERS[header].querySelector)
    .addEventListener('click', () => handleTableHeaderClick(header))
)

/* -------------------------------------------------------------------------- */
/*                               Initialization                               */
/* -------------------------------------------------------------------------- */
parsedData = dreams151.map((pokemon) => {
  return {
    rawData: pokemon,
    rowElement: createDreamTableRow(pokemon),
  }
})

currentDisplayedData = parsedData

renderDreamTableRows()
