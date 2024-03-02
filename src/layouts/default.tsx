import Header from '@/components/Header'
 
export default function Layout({ children }) {
  return (
    <>
      <Header />

      <main className="container mx-auto">
        { children }
      </main>
    </>
  )
}