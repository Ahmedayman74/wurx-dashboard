import React from 'react'
import { Input } from "../ui/input.jsx"


const EditUser = () => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
    <Input id="picture" type="file" />
  </div>
  )
}

export default EditUser