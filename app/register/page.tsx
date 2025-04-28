import Form from "next/form";

const RegisterPage = () => {
  return (
    <Form action="/api/register">
      Add something
      <label htmlFor="email">
        Email:
        <input type="email" id="email" color="white" />
      </label>
      <label htmlFor="password">
        Password:
        <input type="password" id="password" />
      </label>
      <button className="btn btn-primary">Submit</button>
    </Form>
  );
};

export default RegisterPage;
