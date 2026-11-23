import BuildDialog from './components/BuildDialog'
import BuildForm from './components/BuildForm'
import BuildList from './components/BuildList'
import BuildSummary from './components/BuildSummary'
import Header from './components/Header'
import { motion, MotionConfig } from 'motion/react'
import { useEffect, useState } from 'react'

const API_URL = 'http://localhost:3001/builds'

const getInitialTheme = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default function App() {
  const [builds, setBuilds] = useState([])
  const [editingBuild, setEditingBuild] = useState(null)

  // Presentation-only UI state — kept separate from the build data above.
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const fetchBuilds = async () => {
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch builds')
      const data = await response.json()
      setBuilds(data)
    } catch (error) {
      console.error('Error fetching builds:', error)
    }
  }

  useEffect(() => {
    fetchBuilds()
  }, [])

  const handleAddBuild = async (newBuild) => {
    const { id: _id, ...payload } = newBuild
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      const message = Array.isArray(err.message) ? err.message.join(', ') : err.message
      throw new Error(message || 'Failed to create build')
    }

    const created = await response.json()
    setBuilds((prevBuilds) => [created, ...prevBuilds])
  }

  const handleUpdateBuild = async (id, updatedData) => {
    const { id: _id, ...payload } = updatedData
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      const message = Array.isArray(err.message) ? err.message.join(', ') : err.message
      throw new Error(message || 'Failed to update build')
    }

    const updated = await response.json()
    setBuilds((prevBuilds) => prevBuilds.map((b) => (b.id === id ? updated : b)))
  }

  const handleDeleteBuild = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Failed to delete build')
      setBuilds((prevBuilds) => prevBuilds.filter((b) => b.id !== id))
    } catch (error) {
      console.error('Error deleting build:', error)
    }
  }

  const handleClearAll = async () => {
    await Promise.all(builds.map((b) => fetch(`${API_URL}/${b.id}`, { method: 'DELETE' })))
    setBuilds([])
  }

  const handleRestoreDefaults = () => {
    fetchBuilds()
  }

  const openForm = () => {
    setEditingBuild(null)
    setIsFormOpen(true)
  }
  const openEditForm = (build) => {
    setEditingBuild(build)
    setIsFormOpen(true)
  }
  const closeForm = () => {
    setIsFormOpen(false)
    setEditingBuild(null)
  }
  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  // BuildForm only calls onAddBuild after validation passes, so the dialog closes on success only.
  const handleSubmitFromDialog = async (buildData) => {
    if (editingBuild) {
      await handleUpdateBuild(editingBuild.id, buildData)
    } else {
      await handleAddBuild(buildData)
    }
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
          <BuildList
            builds={builds}
            onOpenForm={openForm}
            onEditBuild={openEditForm}
            onDeleteBuild={handleDeleteBuild}
          />
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
          <BuildForm onAddBuild={handleSubmitFromDialog} initialData={editingBuild} />
        </BuildDialog>
      </div>
    </MotionConfig>
  )
}
