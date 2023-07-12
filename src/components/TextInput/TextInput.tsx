import React, { useEffect, useState } from 'react'
import styles from './TextInput.module.scss'
import { useDebounce } from '../../hooks'

type Props = {
  onSearch: ((text: string) => void) | undefined
}

export const TextInput: React.FC<Props> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('')
  const debouncedInputValue = useDebounce(inputValue, 300)

  useEffect(() => {
    if (onSearch) {
      onSearch(inputValue)
    }
  }, [debouncedInputValue])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <div className={styles.inputGroup}>
      <input type='text' required onChange={handleInput} />
      <span className='highlight'></span>
      <span className='bar'></span>
      <label>Search</label>
    </div>
  )
}
