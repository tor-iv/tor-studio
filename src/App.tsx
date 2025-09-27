import Studio from './components/Studio'
import StudioTitle from './components/StudioTitle'
import InteractiveVases from './components/InteractiveVases'

export default function App() {
  return (
    <main>
      {/* Fixed title that doesn't pan with the background */}
      <StudioTitle />

      <Studio>
        {/* Interactive vases component handles client-side functionality */}
        <InteractiveVases />
      </Studio>
    </main>
  )
}