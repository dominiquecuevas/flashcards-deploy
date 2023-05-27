import { FormEventHandler, ReactEventHandler, SyntheticEvent } from "react"
import { FunctionExpression } from "typescript"

export type Props = {
  sideA: string
  setSideA: ReactEventHandler
  sideB: string
  setSideB: ReactEventHandler
  onSubmit: FormEventHandler
}

export const Form = (props: Props) => {
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