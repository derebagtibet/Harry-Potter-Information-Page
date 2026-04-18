import PageHeader from '../components/PageHeader'
import HogwartsMap from '../components/HogwartsMap'

export default function Map() {
  return (
    <div className="relative min-h-screen pb-20">
      <PageHeader
        icon="🗺️"
        title="Interactive Hogwarts Map"
        subtitle="An SVG map of the grounds — click the Great Hall, Quidditch pitch, and Forbidden Forest. Hover for a quick tooltip; click for the full detail panel."
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-12">
        <HogwartsMap />
      </section>
    </div>
  )
}
