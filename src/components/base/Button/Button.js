import React from 'react'

const Button = ({ className,type,title}) => {
    return (
      <div>
          <button className={className} type={type} >{title}</button>
      </div>
  )
}
Button.defaultProps = {
    type :'submit'
}


export default Button