import { useState } from 'react'
import { Settings } from 'lucide-react'
import { Navigate } from 'react-router-dom'
import { ProfileAvatar } from '../components/profile/ProfileAvatar'
import { ProfileEditModal } from '../components/profile/ProfileEditModal'
import { QueryErrorCard, QueryLoadingCenter } from '../components/query/QueryStates'
import { useAuth } from '../hooks/useAuth'
import { useMyProfileQuery } from '../queries/myProfile'

export function MyPage() {
  const { ready, isAuthenticated, updateStoredUser } = useAuth()
  const [settingsOpen, setSettingsOpen] = useState(false)

  const { data, isPending, isError, error, refetch } = useMyProfileQuery(
    ready && isAuthenticated,
  )

  if (!ready) {
    return <QueryLoadingCenter label="확인 중..." />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isPending) {
    return <QueryLoadingCenter label="프로필을 불러오는 중..." />
  }

  if (isError) {
    return (
      <main className="flex min-h-0 flex-1 flex-col px-4 py-12">
        <QueryErrorCard
          message={
            error instanceof Error ? error.message : '프로필을 불러오지 못했습니다.'
          }
          onRetry={() => void refetch()}
        />
      </main>
    )
  }

  const profile = data.data

  return (
    <main className="flex min-h-0 flex-1 flex-col items-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="flex w-full items-start justify-between gap-4">
          <h1 className="text-2xl font-bold text-white">마이페이지</h1>
          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            aria-label="프로필 설정"
          >
            <Settings className="h-4 w-4" aria-hidden />
            설정
          </button>
        </div>

        <ProfileAvatar src={profile.avatar} name={profile.name} size="lg" />

        <div className="flex w-full flex-col items-center gap-2 text-center">
          <p className="text-xl font-semibold text-white">{profile.name}</p>
          {profile.bio ? (
            <p className="whitespace-pre-wrap text-sm leading-6 text-white/70">{profile.bio}</p>
          ) : (
            <p className="text-sm text-white/40">등록된 소개가 없습니다.</p>
          )}
          <p className="mt-2 text-xs text-white/35">{profile.email}</p>
        </div>
      </div>

      <ProfileEditModal
        key={profile.updatedAt}
        open={settingsOpen}
        profile={profile}
        onClose={() => setSettingsOpen(false)}
        onUpdated={(updated) => {
          updateStoredUser({ id: updated.id, name: updated.name })
        }}
      />
    </main>
  )
}
