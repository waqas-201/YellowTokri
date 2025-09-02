import { Resend } from 'resend';
import * as React from 'react';
import { NextRequest } from 'next/server';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {

    try {
        const { firstName, payload, userEmail } = await request.json();

        const customerEmailPromise = resend.emails.send({
            from: 'Yellow Tokri <no-reply@yellowtokri.com>',
            to: userEmail,
            subject: 'Order Confirmation',
            react: EmailTemplate({ firstName, payload }) as React.ReactElement,
        });

        const internalEmailPromise = resend.emails.send({
            from: 'Yellow Tokri <no-reply@yellowtokri.com>',
            to: 'yellowtokri@gmail.com',
            subject: 'New Order Received',
            react: EmailTemplate({ firstName, payload }) as React.ReactElement,
        });

        const [customerEmail, internalEmail] = await Promise.allSettled([customerEmailPromise, internalEmailPromise]);


        

        return Response.json({
            customerEmail: customerEmail.status === 'fulfilled' ? customerEmail.value : { error: customerEmail.reason },
            internalEmail: internalEmail.status === 'fulfilled' ? internalEmail.value : { error: internalEmail.reason },
        });
    } catch (error) {
        console.log(error);

        return Response.json({ error }, { status: 500 });
    }
}
