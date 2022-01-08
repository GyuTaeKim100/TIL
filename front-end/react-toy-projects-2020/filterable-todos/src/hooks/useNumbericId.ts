import { useRef } from 'react'

const useNumbericId = (initialNumbericId: number) => {
  const nextNumbericIdRef = useRef(initialNumbericId)

  const generateNumbericId = (): number => {
    const nextId = nextNumbericIdRef.current
    nextNumbericIdRef.current++
    return nextId
  }
  return {
    generateNumbericId,
  }
}

export default useNumbericId
