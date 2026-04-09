import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AllergyLinkProvider } from './context/AllergyLinkProvider'
import { AppLayout } from './layouts/AppLayout'
import { AddSharePage } from './pages/AddSharePage'
import { FamilyPage } from './pages/FamilyPage'
import { HomePage } from './pages/HomePage'
import { ProfileEditorPage } from './pages/ProfileEditorPage'
import { ProfileIdPage } from './pages/ProfileIdPage'
import { ProfileTabPage } from './pages/ProfileTabPage'
import { PublicViewPage } from './pages/PublicViewPage'
import { SettingsPage } from './pages/SettingsPage'
import { SharedPage } from './pages/SharedPage'
import { SignInPage } from './pages/SignInPage'

export default function App() {
  return (
    <AllergyLinkProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="profile" element={<ProfileTabPage />} />
            <Route path="profile/new" element={<ProfileEditorPage />} />
            <Route path="profile/:id/edit" element={<ProfileEditorPage />} />
            <Route path="profile/:id" element={<ProfileIdPage />} />
            <Route path="shared" element={<SharedPage />} />
            <Route path="shared/new" element={<AddSharePage />} />
            <Route path="family" element={<FamilyPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          <Route path="view/:id" element={<PublicViewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AllergyLinkProvider>
  )
}
