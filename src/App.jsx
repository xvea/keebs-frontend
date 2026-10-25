import BuildDialog from './components/BuildDialog'
import BuildForm from './components/BuildForm'
import BuildList from './components/BuildList'
import BuildSummary from './components/BuildSummary'
import Header from './components/Header'
import { motion, MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'

const INITIAL_KEYBOARD_BUILDS = [
  {
    id: 'kb-101',
    buildName: 'Envoy Obscura Edition',
    baseKit: 'Mode Envoy (Mirage Aluminum / Copper Weight)',
    layoutSize: '65%',
    mountingStyle: 'Lattice Block',
    switchModel: 'Gateron Oil King (Krytox 205g0)',
    switchType: 'Linear',
    keycapSet: 'GMK White-on-Black (WoB) ABS',
    soundProfile: 'Creamy',
    estimatedCost: 4650000,
  },
  {
    id: 'kb-102',
    buildName: 'Neo Studio Monolith',
    baseKit: 'Qwertykeys Neo65 (Anodized Silver / Brass)',
    layoutSize: '65%',
    mountingStyle: 'Gasket Mount',
    switchModel: 'Gazzew Boba U4T 62g',
    switchType: 'Tactile',
    keycapSet: 'PBTfans Resonance Double-Shot',
    soundProfile: 'Thocky',
    estimatedCost: 2850000,
  },
  {
    id: 'kb-103',
    buildName: 'Acoustica 75 Daily',
    baseKit: 'Monsgeek M1W V3 (Black CNC Aluminum)',
    layoutSize: '75%',
    mountingStyle: 'Gasket Mount',
    switchModel: 'Vertex V1 Linear (Factory Lubed)',
    switchType: 'Linear',
    keycapSet: 'Osume Dusk Cherry Profile PBT',
    soundProfile: 'Thocky',
    estimatedCost: 2150000,
  },
  {
    id: 'kb-104',
    buildName: 'Typist Tactile Archive',
    baseKit: 'Luminkey80 TKL (E-Coated Warm White)',
    layoutSize: 'TKL',
    mountingStyle: 'Top Mount',
    switchModel: 'Kailh Box Jade Clickbar',
    switchType: 'Clicky',
    keycapSet: 'CRP Tulip R4 Dye-Sub PBT',
    soundProfile: 'Clacky',
    estimatedCost: 3900000,
  },
]

const getInitialTheme = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default function App() {
  const [builds, setBuilds] = useState(INITIAL_KEYBOARD_BUILDS)

  // Presentation-only UI state — kept separate from the build data above.
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const handleAddBuild = (newBuild) => {
    setBuilds((prevBuilds) => [newBuild, ...prevBuilds])
  }

  const handleClearAll = () => {
    setBuilds([])
  }

  const handleRestoreDefaults = () => {
    setBuilds(INITIAL_KEYBOARD_BUILDS)
  }

  const openForm = () => setIsFormOpen(true)
  const closeForm = () => setIsFormOpen(false)
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  // BuildForm only calls onAddBuild after validation passes, so the dialog closes on success only.
  const handleAddBuildFromDialog = (newBuild) => {
    handleAddBuild(newBuild)
    closeForm()
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* 1. Header Component */}
        <Header
          archiveTitle="Keebs"
          editionCode="Mechanical keyboard builds"
          totalCount={builds.length}
          onClearAll={handleClearAll}
          onRestoreDefaults={handleRestoreDefaults}
          onOpenForm={openForm}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main className="mx-auto w-full max-w-7xl flex-1 px-5 sm:px-8">
          {/* Introduction + 2. Summary Component */}
          <div className="grid gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-16 lg:pt-28 lg:pb-24">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <h1 className="text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-6xl lg:text-[4.25rem]">
                Keyboards worth keeping, <span className="text-muted-foreground">and everything inside them.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Keebs is a collection of mechanical keyboard builds. Each one keeps its kit, switches, keycaps, sound
                and cost together, so every board is easy to revisit and compare.
              </p>
            </motion.div>

            <div className="lg:col-span-5 lg:self-end">
              <BuildSummary builds={builds} />
            </div>
          </div>

          {/* 4 & 5. List & Card Components */}
          <BuildList builds={builds} onOpenForm={openForm} />
        </main>

        <footer className="mt-24 border-t border-border">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              <span className="font-semibold text-foreground">Keebs</span>. A collection of mechanical keyboard builds.
            </p>
            <p>Built with React</p>
          </div>
        </footer>

        {/* 3. Controlled Form Component, presented in an accessible dialog */}
        <BuildDialog open={isFormOpen} onClose={closeForm} labelledBy="build-form-title">
          <BuildForm onAddBuild={handleAddBuildFromDialog} />
        </BuildDialog>
      </div>
    </MotionConfig>
  )
}
