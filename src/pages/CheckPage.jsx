import Header from '../components/Header'
import SearchByName from '../components/SearchByName'

export default function CheckPage() {
  return (
    <div>
      <Header />
      <main style={{ padding: '20px' }}>
        <SearchByName />
      </main>
    </div>
  )
}