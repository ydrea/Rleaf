import { useRef, useState } from 'react'

let _id = 1

export const useNumericId = () => {
  const idRef = useRef(_id++)
  const [id] = useState(idRef.current)

  return id
}
