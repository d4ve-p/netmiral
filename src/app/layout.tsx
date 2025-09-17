import ModalManager from "@/components/modals/modal-manager"
import { ModalProvider } from "@/contexts/modal-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style = {{ minHeight: '100vh', width: '100vw', padding: 0, margin: 0}}>
        <ModalProvider>
          { children }
          <ModalManager />
        </ModalProvider>
      </body>
    </html>
  )
}