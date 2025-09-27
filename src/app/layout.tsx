import { ModalProvider } from "@/contexts/modal-context"
import { CssVarsProvider } from "@mui/joy"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style = {{ minHeight: '100vh', width: '100vw', padding: 0, margin: 0}}>
        <CssVarsProvider defaultMode="dark">
          <ModalProvider>
            { children }
          </ModalProvider>
        </CssVarsProvider>
      </body>
    </html>
  )
}