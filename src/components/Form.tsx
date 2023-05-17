import React, { useState } from 'react'

export const Form: React.FC = (props) => {
  const { sideA, setSideA, sideB, setSideB, onSubmit } = props
  return (
    <form onSubmit={onSubmit}>
      <input
        autoFocus
        placeholder="Front text"
        type="text"
        value={sideA}
        onChange={(e) => setSideA(e.target.value)}
      />
      <input
        autoFocus
        placeholder="Back text"
        type="text"
        value={sideB}
        onChange={(e) => setSideB(e.target.value)}
      />
      <input disabled={!sideA || !sideB} type="submit" value="Create" />
    </form>
  )
}