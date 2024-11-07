function SignIn() {
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
        <button>Sign In</button>
      </form>
    </section>
  );
}

export { SignIn };
