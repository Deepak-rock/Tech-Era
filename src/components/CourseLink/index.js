import {Link} from 'react-router-dom'
import './index.css'

const CourseLink = props => {
  const {courses} = props
  const {id, logoUrl, name} = courses
  return (
    <li className="courses-item">
      <Link className="link" to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} className="courses-img" />
        <p className="courses-name">{name}</p>
      </Link>
    </li>
  )
}
export default CourseLink
