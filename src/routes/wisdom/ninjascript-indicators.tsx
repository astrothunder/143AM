import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/wisdom/ninjascript-indicators')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/wisdom/ninjascript-indicators"!</div>
}
