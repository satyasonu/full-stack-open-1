import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import AnecdoteForm from './features/anecdotes/AnecdoteForm'
import Footer from './components/Footer'
import AnecdoteList from './features/anecdotes/AnecdotesList'
import About from './components/About'
import Anecdote from './features/anecdotes/anecdote'

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/create">Create New</Link>
        <Link style={padding} to="/about">About</Link>
      </div>

      <Routes>
        <Route path="/" element={<AnecdoteList />} />
        <Route path="/create" element={<AnecdoteForm />} />
        <Route path="/about" element={<About />} />
        <Route path='/anecdotes/:id' element={<Anecdote />} />

      </Routes>

      <div>
        <Footer />
      </div>
    </Router>
  )
}

export default App