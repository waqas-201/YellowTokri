import { Resend } from 'resend';
import * as React from 'react';
import { EmailTemplate } from '@/components/email-template';
import { NextRequest } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log(resend);

export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json();
        const { firstName, payload } = body;
        

        const { data, error } = await resend.emails.send({
            from: 'Yellow Tokri <no-reply@yellowtokri.com>',

            to: "yellowtokri@gmail.com",
            subject: 'Hello world',
            react: EmailTemplate({ firstName: firstName, payload: payload }) as React.ReactElement,
        });


        
        
        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        
        
        return Response.json({ data });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
