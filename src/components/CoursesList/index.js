import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CourseLink from '../CourseLink'

import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'IN_PROGRESS',
  failure: 'FAILURE',
}
class CoursesList extends Component {
  state = {coursesData: [], apiStatus: apiConstant.initial}

  componentDidMount() {
    this.getCousesData()
  }

  onClickRetry = () => {
    this.getCousesData()
  }

  getCousesData = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const apiURL = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiURL)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.courses.map(eachItem => ({
        id: eachItem.id,
        logoUrl: eachItem.logo_url,
        name: eachItem.name,
      }))
      this.setState({coursesData: updateData, apiStatus: apiConstant.success})
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  renderCoursesSuccssView = () => {
    const {coursesData} = this.state
    return (
      <>
        <h1 className="heading">Courses</h1>
        <ul className="courses-list">
          {coursesData.map(courses => (
            <CourseLink key={courses.id} courses={courses} />
          ))}
        </ul>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-img"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCoursesList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderCoursesSuccssView()
      case apiConstant.failure:
        return this.renderFailureView()
      case apiConstant.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="app-container">
          <div className="responsive-container">{this.renderCoursesList()}</div>
        </div>
      </>
    )
  }
}
export default CoursesList
