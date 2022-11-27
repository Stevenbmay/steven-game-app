import { useState } from "react"

const useText = (letter) => {
    const [letss, setletss] = useState([])

    setletss([letter])
    return { letss }
}

export default useText;