import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CoursesDetails extends Component {
  state = {coursesDetails: {}, apiStatus: apiConstant.initial}

  componentDidMount() {
    this.getCoursesDetails()
  }

  onClickRetry = () => {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const {match} = this.props
    const {id} = match.params
    const apiURL = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiURL)
    if (response.ok) {
      const data = await response.json()
      const updateData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        coursesDetails: updateData,
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({apiStatus: apiConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseDetailsSuccssView = () => {
    const {coursesDetails} = this.state
    const {description, imageUrl, name} = coursesDetails
    return (
      <div className="course-details">
        <img src={imageUrl} className="courses-detail-image" alt={name} />
        <div className="content">
          <h1 className="course">{name}</h1>
          <p className="description">{description}</p>
        </div>
      </div>
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

  renderCoursesDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstant.success:
        return this.renderCourseDetailsSuccssView()
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
        <div className="courses-details-container">
          <div className="responsive-container">
            {this.renderCoursesDetails()}
          </div>
        </div>
      </>
    )
  }
}
export default CoursesDetails
