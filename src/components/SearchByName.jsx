import { useState } from 'react'
import { supabase } from '../supabases/supabaseClient'

export default function CheckSongs() {
  const [name, setName] = useState('')
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const fetchSongs = async () => {
  setLoading(true)
  setSearched(true)

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('receiver', name)
    .order('created_at', { ascending: false }) // ini yang bikin urutannya dari yang terbaru

  if (!error) {
    setSongs(data)
  }

  setLoading(false)
}

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-6 text-center">Search by Name 🔍</h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
  <input
    type="text"
    placeholder="Enter name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="flex-grow px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm placeholder-gray-400 transition w-full sm:w-auto"
  />
  <button
    onClick={fetchSongs}
    disabled={loading}
    className={`px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold shadow-md transition 
      ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} w-full sm:w-auto`}
  >
    {loading ? 'Searching...' : 'Search'}
  </button>
</div>

      {searched && songs.length === 0 && (
        <p className="text-center text-gray-600">No songs found for "{name}".</p>
      )}

      <div className="space-y-4">
        {songs.map((song) => (
          <div
            key={song.id}
            className="flex items-center gap-4 p-4 rounded-xl shadow-md bg-white border border-gray-100"
          >
            <img
              src={song.cover || 'https://via.placeholder.com/100'}
              alt="Album Cover"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <span className="text-lg font-semibold">{song.song_title}</span>
              <span className="text-sm text-gray-600">{song.artist}</span>
              <span className="text-sm text-gray-500 mt-1">Sent by: {song.sender}</span>
              <span className="text-xs text-gray-500 mt-1">{new Date(song.created_at).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}