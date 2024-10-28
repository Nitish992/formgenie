import { SignUp } from '@clerk/nextjs';

const SignUpForm = () => {
    const handleSignUpSuccess = () => {
        console.log('Sign-up successful!');
        // redirect to a new page, send a welcome email, etc.
    };

    return (
        <SignUp />

    );
};

