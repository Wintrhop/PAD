

const PetUser = (props) => {
    const user = props.item
  return (
    <div className="infoClientFlex">
      <div className="profileImgContainer">
        <img className="profileImg" src={props.profileImg} alt="profile img"></img>
      </div>
      <div className="infoClient">
        <div className="nameClient">{user.name}</div>
        <div className="emailClient">{user.email}</div>
      </div>
    </div>
  )
}

export default PetUser