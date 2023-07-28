import * as React from "react"
import { GlobalComponents } from "../components/global"
import { HomeComponents } from "../components/home"

const IndexPage: React.FC = () => {
  return (
    <GlobalComponents.Layout title="Home" className="home">
      <div className="home__inner-wrapper">
        <HomeComponents.Hero />
        <HomeComponents.Intro />
      </div>
    </GlobalComponents.Layout>
  )
}

export default IndexPage

