import { dreams151 } from './data'

const receiverSection = document.getElementById('receiver')
const input = document.getElementById('receiver-name')
const inputArea = document.getElementById('input-area')
const suggestionArea = document.getElementById('suggestion-area')

const CLASSNAMES = {
  openSuggestion: 'open-suggestion',
  hideSuggestion: 'hide-suggestion',

  suggestionRow: 'suggestion-row',
  suggestionRowActive: 'suggestion-row--active',
  suggestionRowAvatar: 'suggestion-row__avatar',
  suggestionRowRightArea: 'suggestion-row__right-area',
  suggestionRowPokemonName: 'suggestion-row__pokemon-name',
  suggestionRowPokemonNumber: 'suggestion-row__pokemon-number',

  chip: 'chip',
  chipAvatar: 'chip__avatar',
  chipDeleteButton: 'chip__delete-button',
}

const KEYCODE = {
  TAB: 9,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

let currentInput = ''
let currentActiveSuggestionRowIdx = 0
const chipSet = new Set()

/* -------------------------------------------------------------------------- */
/*                           Create HTML elements                             */
/* -------------------------------------------------------------------------- */
const createElement = (tagName, innerText, ...classList) => {
  const element = document.createElement(tagName)
  element.classList.add(...classList)
  element.innerText = innerText
  return element
}

const createAvatar = (letter) =>
  createElement('div', letter, CLASSNAMES.suggestionRowAvatar)
const createPokemonName = (name) =>
  createElement('h3', name, CLASSNAMES.suggestionRowPokemonName)
const createPokemonNumber = (number) =>
  createElement('p', number, CLASSNAMES.suggestionRowPokemonNumber)

const generateSuggestionRow = (pokemon) => {
  const { name, number } = pokemon

  const avatar = createAvatar(name[0])
  const pokemonName = createPokemonName(name)
  const pokemonNumber = createPokemonNumber(number)

  const rightArea = document.createElement('div')
  rightArea.classList.add(CLASSNAMES.suggestionRowRightArea)
  rightArea.append(pokemonName, pokemonNumber)

  const row = document.createElement('div')
  row.classList.add(CLASSNAMES.suggestionRow)
  row.append(avatar, rightArea)
  row.dataset.pokemonName = name

  return row
}

const generateChip = (name) => {
  const avatar = createElement('div', name[0], CLASSNAMES.chipAvatar)
  const deleteButton = createElement('button', 'x', CLASSNAMES.chipDeleteButton)
  deleteButton.addEventListener('click', function () {
    this.parentNode.remove()
    chipSet.delete(name)
  })

  const chip = document.createElement('div')
  chip.classList.add(CLASSNAMES.chip)
  chip.append(avatar, name, deleteButton)

  return chip
}

/* -------------------------------------------------------------------------- */
/*                        Handle active suggestion row                        */
/* -------------------------------------------------------------------------- */
const activateSuggestionRow = (rowIdx) => {
  currentActiveSuggestionRowIdx = rowIdx
  suggestionArea.childNodes[rowIdx].classList.add(
    CLASSNAMES.suggestionRowActive
  )
}

const deactivateSuggestionRow = (rowIdx) => {
  suggestionArea.childNodes[rowIdx].classList.remove(
    CLASSNAMES.suggestionRowActive
  )
}

const getSuggestionRowCount = () => {
  return suggestionArea.childElementCount
}

const activateNextSuggestionRow = () => {
  if (currentActiveSuggestionRowIdx + 1 < getSuggestionRowCount()) {
    deactivateSuggestionRow(currentActiveSuggestionRowIdx)
    activateSuggestionRow(currentActiveSuggestionRowIdx + 1)
  }
}

const activatePreviousSuggestionRow = () => {
  if (currentActiveSuggestionRowIdx - 1 >= 0) {
    deactivateSuggestionRow(currentActiveSuggestionRowIdx)
    activateSuggestionRow(currentActiveSuggestionRowIdx - 1)
  }
}

const selectSuggestionRow = () => {
  const selectedRow = suggestionArea.childNodes[currentActiveSuggestionRowIdx]
  const chip = generateChip(selectedRow.dataset.pokemonName)
  chipSet.add(selectedRow.dataset.pokemonName)
  inputArea.prepend(chip)

  // to recalculate suggestion's position
  showAutoSuggestion()
}

const onKeydown = (e) => {
  switch (e.keyCode) {
    case KEYCODE.TAB:
      e.preventDefault()
      selectSuggestionRow()
      break
    case KEYCODE.DOWN:
      e.preventDefault()
      activateNextSuggestionRow()
      break
    case KEYCODE.UP:
      e.preventDefault()
      activatePreviousSuggestionRow()
      break
  }
}

input.addEventListener('keydown', onKeydown)

/* -------------------------------------------------------------------------- */
/*                         Open and close suggestion                          */
/* -------------------------------------------------------------------------- */
const openSuggestionArea = () => {
  if (currentInput === '') {
    return
  }

  suggestionArea.classList.add(CLASSNAMES.openSuggestion)
  suggestionArea.classList.remove(CLASSNAMES.hideSuggestion)
}

const hideSuggestionArea = () => {
  suggestionArea.classList.remove(CLASSNAMES.openSuggestion)
  suggestionArea.classList.add(CLASSNAMES.hideSuggestion)
}

const showAutoSuggestion = () => {
  const { bottom, left, width } = inputArea.getBoundingClientRect()
  suggestionArea.style.left = `${left}px`
  suggestionArea.style.top = `${bottom + 2}px`
  suggestionArea.style.width = `${width}px`
  openSuggestionArea()
}

const handleClickOutsideOfReceiverSection = (e) => {
  if (!receiverSection.contains(e.target)) {
    hideSuggestionArea()
  }
}

document.addEventListener('click', handleClickOutsideOfReceiverSection, true)
input.addEventListener('click', showAutoSuggestion)

/* -------------------------------------------------------------------------- */
/*                         Get suggestions from input                         */
/* -------------------------------------------------------------------------- */
const clearSuggestionArea = () => {
  suggestionArea.innerHTML = ''
}

const handleInputChange = (inputValue) => {
  currentInput = inputValue

  if (inputValue === '') {
    hideSuggestionArea()
    clearSuggestionArea()
    return
  }

  const suggestionRows = dreams151
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
    )
    .map(generateSuggestionRow)

  if (suggestionRows.length === 0) {
    hideSuggestionArea()
    clearSuggestionArea()
    return
  }

  clearSuggestionArea()
  suggestionArea.append(...suggestionRows)
  openSuggestionArea()

  activateSuggestionRow(0)
}

input.addEventListener('input', (e) => handleInputChange(e.target.value))
