import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight">🎶 SongShare</h1>
      <nav style={{ marginTop: '5px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Send a Song</Link>
        <Link to="/check">Check Songs</Link>
      </nav>
    </header>
  )
}