'use client'

import VaseItem from '@/components/VaseItem'
import ShelfVase from '@/components/ShelfVase'
import ShelfVase4 from '@/components/ShelfVase4'
import ShelfLine from '@/components/ShelfLine'
import { vaseData } from '@/lib/vase-data'

export default function InteractiveVases() {
  const handleVaseClick = (vaseId: string) => {
    console.log(`Clicked on vase: ${vaseId}`)
    // TODO: Open project modal
  }

  const handleShelfVaseClick = () => {
    console.log('Clicked on shelf vase')
    // TODO: Open project modal for shelf vase
  }

  const handleVase4Click = () => {
    console.log('Clicked on vase4')
    // TODO: Open project modal for vase4
  }

  // Get only the GODO vase (center table)
  const godoVase = vaseData.find(vase => vase.id === 'godo')

  return (
    <ShelfLine>
      {/* Shelf vase on central table */}
      <ShelfVase onVaseClick={handleShelfVaseClick} />

      {/* Vase4 aligned with shelf line */}
      <ShelfVase4 onVaseClick={handleVase4Click} />

      {/* Render single vase for testing */}
      {godoVase && (
        <VaseItem
          vaseData={godoVase}
          onClick={() => handleVaseClick(godoVase.id)}
        />
      )}
    </ShelfLine>
  )
}
