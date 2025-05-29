import Header from '../components/Header'
import SendSongForm from '../components/SendSongForm'

export default function HomePage() {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <SendSongForm />
      </main>
    </div>
  )
}