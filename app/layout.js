import './globals.css'

export const metadata = {
  title: 'Liga 1 Te Apuesto - Promiedos Perú',
  description: 'Resultados y formaciones en vivo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
