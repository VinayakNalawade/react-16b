import './index.css'

import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {appointments: [], filtered: false, date: '', title: ''}

  takeTitle = event => {
    this.setState({title: event.target.value})
  }

  takeDate = event => {
    this.setState({date: event.target.value})
  }

  submit = event => {
    event.preventDefault()

    const {appointments, date, title} = this.state

    const appointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStarred: false,
    }

    this.setState({
      appointments: [...appointments, appointment],
      date: '',
      title: '',
    })
  }

  sortStarred = () => {
    this.setState(prevState => ({filtered: !prevState.filtered}))
  }

  toggleStar = id => {
    const {appointments} = this.state

    this.setState({
      appointments: appointments.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }

        return each
      }),
    })
  }

  render() {
    const {appointments, filtered, date, title} = this.state

    let filteredList
    if (filtered === true) {
      filteredList = appointments.filter(each => each.isStarred === true)
    } else {
      filteredList = appointments
    }

    return (
      <div className="mainContainer">
        <div className="card">
          <div className="inputSection">
            <form onSubmit={this.submit} className="inputform">
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                className="input"
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={this.takeTitle}
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                className="input"
                id="date"
                type="date"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={this.takeDate}
              />
              <button type="submit" className="submitbutton">
                Add
              </button>
            </form>
            <img
              className="mainimg"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </div>
          <div className="appointmentsection">
            <div className="starredheadingContainer">
              <h1 className="appointmentheading">Appointments</h1>
              <button
                className={filtered ? 'starredbutton' : 'starbutton'}
                type="button"
                onClick={this.sortStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointmentsContainer">
              {filteredList.map(each => (
                <AppointmentItem
                  key={each.id}
                  object={each}
                  toggleStar={this.toggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
