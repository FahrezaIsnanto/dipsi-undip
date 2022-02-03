import * as React from "react"

const divStyle = {
  height:"100vh",
  marginTop: "50px",
  marginLeft: "10px"
}

const NotFoundPage = () => (
  <div style={divStyle}>
    <h1>404: Not Found</h1>
    <br/>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </div>
)

export default NotFoundPage
