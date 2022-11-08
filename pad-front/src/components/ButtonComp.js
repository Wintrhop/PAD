

const ButtonComp = ({disabled,setClick,className,selected,child}) => {
  return (
    <button disabled={disabled} onClick={setClick} className={`${className} ${selected}`} >
    {child}      
</button >
  )
}

export default ButtonComp