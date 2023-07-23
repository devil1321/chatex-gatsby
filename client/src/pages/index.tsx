import * as React from "react"
import { GlobalComponents } from "../components/global"

const IndexPage: React.FC = () => {
  return (
    <GlobalComponents.Layout title="Home" className="home">
      <div>Home</div>
    </GlobalComponents.Layout>
  )
}

export default IndexPage

