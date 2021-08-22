import { useHistory } from 'react-router-dom';
import Cancel from './common/Cancel';
import Auth from './auth/Auth';
import NonAuthNav from './common/NonAuthNav';

const inputs = [
  {
    name: 'name',
    label: "Name",
    type: "text",
  },
  {
    name: 'email',
    label: "Email",
    type: "email",
  },
  {
    name: 'password',
    label: "Password",
    type: "password",
  },
  {
    name: 'password_confirmation',
    label: "Confirm password",
    type: "password",
  }
];

const formInputs = inputs.map(input => {
  return (
    <div key={input.name} className="mt-2 flex flex-col text-left text-sm">
      <input type={input.type} name={input.name} placeholder={input.label} className='mt-1 px-2 py-1 text-sm border border-green-400'></input>
    </div>
  );
});

function SignUp() {
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();
    let userInfo = {};

    e.target.querySelectorAll('input').forEach(input => {
      userInfo[input.name] = input.value;
    });

    try {
      await Auth.signUp({ user: userInfo });
      history.push("/linked-accounts");
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
      <NonAuthNav />
      <div className="pt-12 flex flex-col w-screen h-screen bg-gray-700">
        <div className="my-4 rounded-lg w-full mx-auto flex flex-col items-center justify-center bg-gray-700">
          <img className='h-36'
            src={process.env.PUBLIC_URL + '/images/logos/timehub_color_graphic.svg'}
            alt="A time tracker logo" />
          <h1 className='font-bold text-5xl text-center text-white'>Create an Account</h1>
        </div>
        <div className='mx-auto items-stretch rounded-xl max-w-lg py-8 px-10 w-10/12 text-center flex bg-white flex-col items-center'>
          <p className='text-sm font-light'>Enter your information below.</p>
          <form className="mt-5"
            onSubmit={e => handleSubmit(e)}>
            {formInputs}
            <button type="submit" className='mt-8 mb-2 hover:bg-green-500 hover:text-green-800 text-lg w-full py-2 rounded-lg bg-green-300'>
              Sign Up
            </button>
            <Cancel />
          </form>

        </div>
      </div>
    </div>
  );
}

export default SignUp;