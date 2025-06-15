import PasswordInput from "./PasswordInput";

const RegisterForm = ({ formAction }) => {
  return (
    <form
      action={formAction}
      className="mx-auto grid max-w-md grid-rows-4 space-y-5"
    >
      <div className="flex justify-between gap-4">
        <div className="formInputContainer">
          <input
            id="name"
            name="name"
            type="text"
            className="peer formInput"
            required
          />
          <label htmlFor="name" className="label">
            Prénom
          </label>
        </div>
        <div className="formInputContainer">
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="peer formInput"
            required
          />
          <label htmlFor="lastName" className="label">
            Nom
          </label>
        </div>
      </div>
      <div className="formInputContainer">
        <input
          id="email"
          name="email"
          type="email"
          className="peer formInput"
          required
        />
        <label htmlFor="email" className="label">
          Email
        </label>
      </div>
      <PasswordInput />

      <button
        type="submit"
        className="bg-orange hover:bg-lemon mt-5 rounded-xl px-5 py-3 text-lg text-white transition active:scale-90"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default RegisterForm;
