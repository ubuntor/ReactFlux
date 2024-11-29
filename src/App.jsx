import { Button, Layout, Notification } from "@arco-design/web-react"
import { useStore } from "@nanostores/react"
import { useEffect } from "react"

import "./App.css"
import Main from "./components/Main/Main"
import Sidebar from "./components/Sidebar/Sidebar"
import useFeedIconsSync from "./hooks/useFeedIconsSync"
import useLanguage, { polyglotState } from "./hooks/useLanguage"
import useScreenWidth from "./hooks/useScreenWidth"
import useTheme from "./hooks/useTheme"
import useVersionCheck from "./hooks/useVersionCheck"
import { GITHUB_REPO_PATH } from "./utils/constants"
import hideSpinner from "./utils/loading"

import { unreadTotalState } from "@/store/dataState"

const App = () => {
  useLanguage()
  useTheme()
  useFeedIconsSync()

  const { isBelowLarge } = useScreenWidth()

  const { polyglot } = useStore(polyglotState)

  useEffect(() => {
    hideSpinner()
  }, [])

  const unreadTotal = useStore(unreadTotalState)

  // unread total dynamic favicon
  useEffect(() => {
    const faviconLink = document.querySelector('link[rel~="icon"]') // hack...
    if (unreadTotal === 0) {
      faviconLink.href = "/favicon.ico"
    } else {
      const canvas = document.createElement("canvas")
      canvas.width = 48
      canvas.height = 48
      const ctx = canvas.getContext("2d")
      ctx.font = "36px sans-serif"
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, 48, 48)
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const text = "" + unreadTotal
      const measure = ctx.measureText(text)
      ctx.fillText(
        text,
        24,
        24 + (measure.actualBoundingBoxAscent - measure.actualBoundingBoxDescent) / 2,
      )
      faviconLink.href = canvas.toDataURL("image/png")
    }
  }, [unreadTotal])

  return (
    polyglot && (
      <div className="app">
        {isBelowLarge ? null : (
          <Layout.Sider
            breakpoint="lg"
            className="sidebar"
            collapsible={false}
            trigger={null}
            width={240}
          >
            <Sidebar />
          </Layout.Sider>
        )}
        <Main />
      </div>
    )
  )
}

export default App
