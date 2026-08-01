import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout } from './layout/RootLayout'
import { AboutPage } from '@/pages/AboutPage'
import { GlossaryPage } from '@/pages/GlossaryPage'
import { GlossaryTermPage } from '@/pages/GlossaryTermPage'
import { HomePage } from '@/pages/HomePage'
import { LearnIndexPage } from '@/pages/LearnIndexPage'
import { LearnModulePage } from '@/pages/LearnModulePage'
import { SimulatePage } from '@/pages/SimulatePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="learn" element={<LearnIndexPage />} />
          <Route path="learn/:slug" element={<LearnModulePage />} />
          <Route path="simulate" element={<SimulatePage />} />
          <Route path="glossary" element={<GlossaryPage />} />
          <Route path="glossary/:termId" element={<GlossaryTermPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
