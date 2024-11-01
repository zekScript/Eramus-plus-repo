import Footer from '@/components/layout/navs/footer'
import { TopBar } from '@/components/layout/navs/top-bar'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <TopBar />
      {children}
      <Footer />
    </>
  )
}
export default Layout
