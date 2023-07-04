export const Category = (props) => {
  const { category } = props
  return (
    <div className="deck">
      <div className="deck-card" style={{rotate: '-.02turn'}}/>
      <div className="deck-card" style={{rotate: '-.01turn'}}/>
      <div className="deck-card">
      {category}
      </div>
    </div>
  )
}