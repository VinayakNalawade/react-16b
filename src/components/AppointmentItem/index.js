import './index.css'

const AppointmentItem = props => {
  const {toggleStar, object} = props

  const onStar = () => {
    toggleStar(object.id)
  }

  return (
    <li className="li">
      <div className="liheadingSection">
        <p className="liheading">{object.title}</p>
        <button
          data-testid="star"
          type="button"
          className="favouritebutton"
          onClick={onStar}
        >
          {object.isStarred && (
            <img
              className="starimg"
              alt="star"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
            />
          )}
          {!object.isStarred && (
            <img
              className="starimg"
              alt="star"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
            />
          )}
        </button>
      </div>
      <p className="datepara">{`Date: ${object.date}`}</p>
    </li>
  )
}

export default AppointmentItem
