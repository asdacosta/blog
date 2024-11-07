function SignUp() {
  return (
    <section className="signForm">
      <form action="">
        <div>
          <label htmlFor="first-name">First Name</label>
          <input type="text" name="first-name" id="first-name" required />
        </div>
        <div>
          <label htmlFor="last-name">Last Name</label>
          <input type="text" name="last-name" id="last-name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input type="password" name="pwd" id="pwd" required />
        </div>
        <div>
          <label htmlFor="pwd-confirm">Confirm Password</label>
          <input type="password" name="pwd-confirm" id="pwd-confirm" required />
        </div>
        <button>Sign Up</button>
      </form>
    </section>
  );
}

export { SignUp };
