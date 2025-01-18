import {Switch, Route} from 'react-router-dom'
import CoursesList from './components/CoursesList'
import CoursesDetails from './components/CoursesDetails'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={CoursesList} />
    <Route exact path="/courses/:id" component={CoursesDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
