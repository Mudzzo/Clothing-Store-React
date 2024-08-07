import SignInForm from '../../sign-in-form/sign-in-form.component.js';
import SignUpForm from '../../sign-up-form/sign-up-form.component.js';

import "./authentication.styles.scss"

const Authentication = () => {

    return (
        <div className='authentication-container'>
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;