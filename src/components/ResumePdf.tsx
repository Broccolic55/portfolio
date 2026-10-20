import { useEffect, useRef, useState } from 'react'
import type { PDFDocumentProxy } from 'pdfjs-dist'

export default function ResumePdf({ src }: { src: string }) {
  const pagesRef = useRef<HTMLDivElement>(null)
  const canvasesRef = useRef<HTMLCanvasElement[]>([])
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let canceled = false
    let destroyLoadingTask: (() => Promise<void>) | undefined
    setPdfDocument(null)
    setLoading(true)
    setError('')

    const loadDocument = async () => {
      try {
        const [pdfjs, worker] = await Promise.all([
          import('pdfjs-dist'),
          import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
        ])
        if (canceled) return
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default
        const loadingTask = pdfjs.getDocument({ url: src })
        destroyLoadingTask = () => loadingTask.destroy()
        const document = await loadingTask.promise
        if (!canceled) setPdfDocument(document)
      } catch (cause) {
        if (!canceled) {
          setError(cause instanceof Error ? cause.message : 'The resume could not be rendered.')
          setLoading(false)
        }
      }
    }

    void loadDocument()
    return () => {
      canceled = true
      void destroyLoadingTask?.()
    }
  }, [src])

  useEffect(() => {
    if (!pdfDocument) return
    let canceled = false
    const renderTasks: Array<{ cancel: () => void }> = []

    const renderPages = async () => {
      try {
        const container = pagesRef.current
        if (!container) return
        for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
          if (canceled) return
          const page = await pdfDocument.getPage(pageNumber)
          const canvas = canvasesRef.current[pageNumber - 1]
          const context = canvas?.getContext('2d')
          if (!canvas || !context) throw new Error('Canvas rendering is unavailable.')
          const baseViewport = page.getViewport({ scale: 1 })
          const availableWidth = Math.max(280, container.clientWidth - 36)
          const scale = availableWidth / baseViewport.width
          const viewport = page.getViewport({ scale })
          // A 2× backing bitmap stays sharp on high-density screens without oversized canvases.
          const outputScale = Math.min(Math.max(window.devicePixelRatio || 1, 1), 2)
          canvas.width = Math.ceil(viewport.width * outputScale)
          canvas.height = Math.ceil(viewport.height * outputScale)
          canvas.style.width = `${Math.floor(viewport.width)}px`
          canvas.style.height = `${Math.floor(viewport.height)}px`
          const task = page.render({ canvas, canvasContext: context, viewport, transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0] })
          renderTasks.push(task)
          await task.promise
        }
        if (!canceled) setLoading(false)
      } catch (cause) {
        if (!canceled) {
          setError(cause instanceof Error ? cause.message : 'The resume page could not be rendered.')
          setLoading(false)
        }
      }
    }

    void renderPages()
    return () => {
      canceled = true
      renderTasks.forEach(task => task.cancel())
    }
  }, [pdfDocument])

  return <div className="resume-pages" ref={pagesRef} aria-label="Resume pages" role="document">
    {loading && <span className="resume-loading">Opening resume…</span>}
    {error && <p className="resume-error">The PDF preview could not be loaded. Use Download to open the file.</p>}
    {pdfDocument && Array.from({ length: pdfDocument.numPages }, (_, index) => <canvas className="resume-page-canvas" key={`${src}-${index}`} ref={canvas => { if (canvas) canvasesRef.current[index] = canvas }}/>) }
  </div>
}
