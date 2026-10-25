import { motion } from 'motion/react'
import { useState } from 'react'

const INITIAL_FORM_STATE = {
  buildName: '',
  baseKit: '',
  layoutSize: '65%',
  mountingStyle: 'Gasket Mount',
  switchModel: '',
  switchType: 'Linear',
  keycapSet: '',
  soundProfile: 'Thocky',
  estimatedCost: '',
}

export default function BuildForm({ onAddBuild }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      !formData.buildName.trim() ||
      !formData.baseKit.trim() ||
      !formData.switchModel.trim() ||
      !formData.keycapSet.trim() ||
      !formData.estimatedCost
    ) {
      setErrorMessage('Please complete all technical specification fields.')
      return
    }

    const newBuildItem = {
      id: `kb-${Date.now()}`,
      buildName: formData.buildName.trim(),
      baseKit: formData.baseKit.trim(),
      layoutSize: formData.layoutSize,
      mountingStyle: formData.mountingStyle,
      switchModel: formData.switchModel.trim(),
      switchType: formData.switchType,
      keycapSet: formData.keycapSet.trim(),
      soundProfile: formData.soundProfile,
      estimatedCost: Number(formData.estimatedCost),
    }

    onAddBuild(newBuildItem)
    setFormData(INITIAL_FORM_STATE)
  }

  const inputBaseClass =
    'w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/70 transition-colors hover:border-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/25'
  const labelBaseClass = 'mb-2 block text-sm font-medium text-foreground'

  return (
    <section aria-labelledby="build-form-title" className="p-6 sm:p-9">
      <div className="mb-8 pr-12">
        <h2 id="build-form-title" className="text-2xl font-semibold tracking-tight text-foreground">
          Add a build
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Note the kit, switches and keycaps that make it yours. Every field is needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="buildName" className={labelBaseClass}>
            Build name
          </label>
          <input
            id="buildName"
            name="buildName"
            type="text"
            value={formData.buildName}
            onChange={handleInputChange}
            placeholder="e.g. Obsidian Nocturne 65"
            className={inputBaseClass}
          />
        </div>

        <div>
          <label htmlFor="baseKit" className={labelBaseClass}>
            Base kit
          </label>
          <input
            id="baseKit"
            name="baseKit"
            type="text"
            value={formData.baseKit}
            onChange={handleInputChange}
            placeholder="e.g. Mode Envoy / Neo65"
            className={inputBaseClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="layoutSize" className={labelBaseClass}>
              Layout size
            </label>
            <select
              id="layoutSize"
              name="layoutSize"
              value={formData.layoutSize}
              onChange={handleInputChange}
              className={`${inputBaseClass} cursor-pointer`}
            >
              <option value="60%">60% Compact</option>
              <option value="65%">65% Standard</option>
              <option value="75%">75% Exploded</option>
              <option value="TKL">80% TKL</option>
              <option value="Alice">Arisu / Alice</option>
            </select>
          </div>

          <div>
            <label htmlFor="mountingStyle" className={labelBaseClass}>
              Mounting
            </label>
            <select
              id="mountingStyle"
              name="mountingStyle"
              value={formData.mountingStyle}
              onChange={handleInputChange}
              className={`${inputBaseClass} cursor-pointer`}
            >
              <option value="Gasket Mount">Gasket Mount</option>
              <option value="Top Mount">Top Mount</option>
              <option value="Lattice Block">Lattice Block</option>
              <option value="O-Ring Burger">O-Ring Mount</option>
              <option value="Tray Mount">Tray Mount</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="switchModel" className={labelBaseClass}>
            Switch model
          </label>
          <input
            id="switchModel"
            name="switchModel"
            type="text"
            value={formData.switchModel}
            onChange={handleInputChange}
            placeholder="e.g. Gateron Oil King (Lubed 205g0)"
            className={inputBaseClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4">
          <div>
            <label htmlFor="switchType" className={labelBaseClass}>
              Switch type
            </label>
            <select
              id="switchType"
              name="switchType"
              value={formData.switchType}
              onChange={handleInputChange}
              className={`${inputBaseClass} cursor-pointer`}
            >
              <option value="Linear">Linear</option>
              <option value="Tactile">Tactile</option>
              <option value="Clicky">Clicky</option>
            </select>
          </div>

          <div>
            <label htmlFor="soundProfile" className={labelBaseClass}>
              Sound profile
            </label>
            <select
              id="soundProfile"
              name="soundProfile"
              value={formData.soundProfile}
              onChange={handleInputChange}
              className={`${inputBaseClass} cursor-pointer`}
            >
              <option value="Thocky">Deep Thock</option>
              <option value="Clacky">Bright Clack</option>
              <option value="Creamy">Marbly / Creamy</option>
              <option value="Silent">Muted / Silent</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="keycapSet" className={labelBaseClass}>
            Keycap set
          </label>
          <input
            id="keycapSet"
            name="keycapSet"
            type="text"
            value={formData.keycapSet}
            onChange={handleInputChange}
            placeholder="e.g. GMK WoB ABS Double-Shot"
            className={inputBaseClass}
          />
        </div>

        <div>
          <label htmlFor="estimatedCost" className={labelBaseClass}>
            Estimated cost <span className="font-normal text-muted-foreground">(IDR)</span>
          </label>
          <input
            id="estimatedCost"
            name="estimatedCost"
            type="number"
            min="0"
            step="50000"
            value={formData.estimatedCost}
            onChange={handleInputChange}
            placeholder="e.g. 3250000"
            className={`${inputBaseClass} tabular-nums`}
          />
        </div>

        {errorMessage && (
          <p role="alert" className="text-sm font-medium text-destructive">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">New builds appear first in your collection.</p>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary px-7 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:w-auto"
          >
            Tambah
          </motion.button>
        </div>
      </form>
    </section>
  )
}
