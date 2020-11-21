import React from 'react'
import { Spring } from 'react-spring/renderprops'

interface MyProps {
  from: any
  to: any
  config: any
}

const Animate: React.FC<MyProps> = (props) => {
  return (
    <Spring from={props.from} to={props.to} config={props.config}>
      {(sprops) => <div style={sprops}>{props.children}</div>}
    </Spring>
  )
}

export default Animate
