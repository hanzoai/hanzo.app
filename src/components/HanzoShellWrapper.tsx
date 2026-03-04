import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { HanzoHeader, HanzoCommandPalette, useHanzoAuth } from '@hanzo/ui/navigation'
import type { HanzoCommandItem } from '@hanzo/ui/navigation'

const APP_COMMANDS: HanzoCommandItem[] = [
  { id: 'pricing', title: 'Pricing', description: 'Plans and pricing', href: '/pricing', category: 'Pages', keywords: ['cost', 'plan'] },
  { id: 'ai', title: 'AI & Models', description: 'Foundation models API', href: '/ai', category: 'Products', keywords: ['llm', 'model'] },
  { id: 'cloud', title: 'Cloud', description: 'Complete cloud platform', href: '/cloud', category: 'Products', keywords: ['hosting', 'deploy'] },
  { id: 'platform', title: 'Platform', description: 'Open source PaaS', href: '/platform', category: 'Products', keywords: ['self-host'] },
  { id: 'dev', title: 'Hanzo Dev', description: 'Multi-agent coding', href: '/dev', category: 'Products', keywords: ['code', 'agent'] },
  { id: 'operative', title: 'Operative', description: 'AI agents & automation', href: '/operative', category: 'Products', keywords: ['agent'] },
  { id: 'docs', title: 'Documentation', description: 'API docs and guides', href: 'https://docs.hanzo.ai', category: 'Resources', external: true, keywords: ['api', 'guide'] },
  { id: 'status', title: 'Status', description: 'System status', href: '/status', category: 'Resources', keywords: ['uptime'] },
  { id: 'contact', title: 'Contact', description: 'Get in touch', href: '/contact', category: 'Resources', keywords: ['support'] },
  { id: 'zen', title: 'Zen Models', description: 'Open source AI models', href: '/zen', category: 'Company', keywords: ['ai', 'models'] },
  { id: 'enterprise', title: 'Enterprise', description: 'Enterprise solutions', href: '/enterprise', category: 'Company', keywords: ['sales'] },
]

const HanzoShellWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, organizations, currentOrgId, switchOrg, signOut } = useHanzoAuth()
  const navigate = useNavigate()

  const handleNavigate = useCallback(
    (href: string, external?: boolean) => {
      if (external) window.open(href, '_blank')
      else navigate(href)
    },
    [navigate],
  )

  return (
    <div className="flex min-h-dvh flex-col">
      <HanzoHeader
        currentApp="Hanzo"
        currentAppId="hanzo-app"
        user={user}
        organizations={organizations}
        currentOrgId={currentOrgId}
        onOrgSwitch={switchOrg}
        onSignOut={signOut}
      />
      <div className="flex-1">{children}</div>
      <HanzoCommandPalette
        commands={APP_COMMANDS}
        currentAppId="hanzo-app"
        onNavigate={handleNavigate}
      />
    </div>
  )
}

export default HanzoShellWrapper
