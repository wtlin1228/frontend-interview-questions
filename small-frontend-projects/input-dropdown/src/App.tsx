import { useEffect, useMemo, useRef, useState } from 'react'

interface IOption {
  uuid: string
  name: string
}

const categoryOptions: IOption[] = [
  {
    uuid: '1',
    name: 'facebook',
  },
  {
    uuid: '2',
    name: 'amazon',
  },
  {
    uuid: '3',
    name: 'apple',
  },
  {
    uuid: '4',
    name: 'netflix',
  },
  {
    uuid: '5',
    name: 'google',
  },
  {
    uuid: '6',
    name: 'facebook2',
  },
  {
    uuid: '7',
    name: 'amazon2',
  },
  {
    uuid: '8',
    name: 'apple2',
  },
  {
    uuid: '9',
    name: 'netflix2',
  },
  {
    uuid: '10',
    name: 'google2',
  },
]

const useClickOutside = ({
  element,
  onClickOutside,
  shouldUseCapture = true,
}: {
  element: null | HTMLElement
  onClickOutside: () => void
  shouldUseCapture?: boolean
}) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (element && !element.contains(e.target as Node)) {
        onClickOutside()
      }
    }

    document.addEventListener(
      'click',
      (e) => handleClickOutside(e),
      shouldUseCapture
    )

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        shouldUseCapture
      )
    }
  }, [onClickOutside, element, shouldUseCapture])
}

const InputDropdown = ({
  options,
  value,
  onChange,
}: {
  options: IOption[]
  value: IOption
  onChange: (value: IOption) => void
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [showOptions, setShowOptions] = useState(false)

  const maxOptionLength = useMemo(
    () => options.reduce((acc, curr) => Math.max(acc, curr.name.length), 0),
    [options]
  )

  const filteredOptions =
    value.name.length > maxOptionLength
      ? []
      : options.filter((option) => option.name.includes(value.name))

  useClickOutside({
    element: wrapperRef.current,
    onClickOutside: () => setShowOptions(false),
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      uuid: '',
      name: e.target.value,
    })
  }

  const handleBlur = () => {
    const oldOption = options.find((option) => option.name === value.name)
    if (oldOption) {
      onChange(oldOption)
    }
  }

  return (
    <div ref={wrapperRef} style={{ backgroundColor: 'red', maxWidth: 150 }}>
      <input
        value={value.name}
        onChange={handleChange}
        onFocus={() => setShowOptions(true)}
        onBlur={() => handleBlur()}
      />
      <ul>
        {showOptions &&
          filteredOptions.map((option) => (
            <li key={option.uuid} onClick={() => onChange(option)}>
              {option.name}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<IOption>({
    name: '',
    uuid: '',
  })

  const { name, uuid } = selectedCategory

  return (
    <div>
      <p>
        {selectedCategory.uuid !== ''
          ? `use old option, uuid: ${uuid}, name: ${name}`
          : `create new option, name: ${name}`}
      </p>
      <InputDropdown
        options={categoryOptions}
        value={selectedCategory}
        onChange={setSelectedCategory}
      />
    </div>
  )
}
