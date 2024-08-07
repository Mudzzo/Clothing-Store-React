import './button.styles.scss'

const Button_Type_Classes = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

const Button =  ({children, buttontype, ...otherProps}) => {
    return (
        <button className={`button-container ${Button_Type_Classes[buttontype]}`}
        {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button;