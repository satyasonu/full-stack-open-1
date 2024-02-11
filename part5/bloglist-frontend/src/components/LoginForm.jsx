const LoginForm = (props) => {
  const {handleLogin, usernameInput, setUsernameInput,passwordInput, setPasswordInput} = props.data
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin} autoComplete="off">
        <div>
          Username:
          <input placeholder="Enter Username" type="text" value={usernameInput} onChange={(({target}) => setUsernameInput(target.value))} required autoComplete="off"
         />
        </div>
        <div>
          Password:
          <input placeholder="Enter password" type="password" value={passwordInput} onChange={(({target}) => setPasswordInput(target.value))} required autoComplete="off"/>
        </div>
        <button>login</button>
      </form>
    </>
  )
}

export default LoginForm