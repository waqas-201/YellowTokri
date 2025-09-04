interface EmailTemplateProps {
    firstName: string;
    payload?: any; // optional if you want order details
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    payload,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
);
