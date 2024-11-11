function SignUp() {
  return (
    <section className="signForm">
      <form action="">
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
