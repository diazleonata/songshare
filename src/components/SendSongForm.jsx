import { useState, useEffect } from 'react'
import { supabase } from '../supabases/supabaseClient'

export default function SendSongForm() {
  const [receiver, setReceiver] = useState('')
  const [songTitle, setSongTitle] = useState('')
  const [sender, setSender] = useState('')
  const [message, setMessage] = useState('')

  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song`)
          .then(res => res.json())
          .then(data => {
            const songs = data.results.map(item => ({
                id: item.trackId,
                title: item.trackName,
                artist: item.artistName,
                artwork: item.artworkUrl100,
               }));
              setSearchResults(songs);
             })
            .catch(() => setSearchResults([]));
      } else {
        setSearchResults([])
      }
    }, 500)

    return () => clearTimeout(delayDebounce)
  }, [query])

  // 📤 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault()

  if (!selectedSong) {
    setMessage('Please select a song from suggestions!')
    return
  }

  const { error } = await supabase.from('songs').insert([
    {
      receiver,
      song_title: selectedSong.title,
      artist: selectedSong.artist,
      cover: selectedSong.artwork,
      sender: sender || 'Anonymous',
    },
  ])

  if (error) {
    setMessage('Failed to send the song 😢')
  } else {
    setMessage('Song sent successfully! 🎉')
    setReceiver('')
    setSongTitle('')
    setSender('')
    setSelectedSong(null)
    setQuery('')
  }
}

return (
  <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-4 bg-white rounded-2xl shadow-md">
    <h2 className="text-2xl font-bold text-gray-900 text-center">Send a Song 🎵</h2>

    <input
      type="text"
      placeholder="Recipient's name"
      value={receiver}
      onChange={e => setReceiver(e.target.value)}
      required
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    {!selectedSong ? (
      <div className="relative">
        <input
          type="text"
          placeholder="Type a song title..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setSongTitle(e.target.value);
          }}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {searchResults.length > 0 && (
          <ul className="absolute bg-white border border-gray-300 rounded-lg w-full max-h-60 overflow-y-auto z-20 shadow-lg p-5">
            {searchResults.map(song => (
              <li
                key={song.id}
                onClick={() => {
                  setSelectedSong(song);
                  setQuery(`${song.title} - ${song.artist}`);
                  setSongTitle(`${song.title} - ${song.artist}`);
                  setSearchResults([]);
                }}
                className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
              >
                <img
                  src={song.artwork}
                  alt="cover"
                  width="40"
                  height="40"
                  className="rounded"
                />
                <div>
                  <strong className="block text-gray-900">{song.title}</strong>
                  <small className="text-gray-600">{song.artist}</small>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    ) : (
      <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm flex items-center gap-4">
        <img
          src={selectedSong.artwork}
          alt="Album Art"
          className="rounded w-20 h-20 object-cover flex-shrink-0"
        />
        <div className="flex flex-col flex-grow">
          <div className="font-semibold text-gray-900">{selectedSong.title}</div>
          <div className="text-sm text-gray-600">{selectedSong.artist}</div>
          <button
            type="button"
            onClick={() => {
              setSelectedSong(null);
              setSongTitle('');
              setQuery('');
            }}
            className="self-start text-sm mt-2 hover:underline"
          >
            Change
          </button>
        </div>
      </div>
    )}

    <input
      type="text"
      placeholder="Your name (optional)"
      value={sender}
      onChange={e => setSender(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <button
      type="submit"
      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      Send
    </button>

    <p className="text-center text-sm text-gray-700 mt-2">{message}</p>
  </form>
);
}