"use client";
import {WelcomeHeader} from "../components/welcome/WelcomeHeader";
import { WelcomeBody } from "../components/welcome/WelcomeBody";
import { Testimonials } from "../components/welcome/Testimonials";
import { Feature } from "../components/welcome/Features";
export default function WelcomePage() {
    return (
        <div>
            <WelcomeHeader />
            <WelcomeBody />
            <Testimonials />
            <Feature />
        </div>
    );
}
