"use client"
import Link from "next/link"
import ContactForm, { ContactFormValues } from "./component/ContactForm"

const page = () => {
    const handleSubmit = (values: ContactFormValues) => {
        console.log("Form Submitted", values);
        alert("Form Submitted Successfully!");
    };

    return (
        <div className="py-8 lg:max-w-[75vw] mx-auto my-10">
            <h1 className="text-center text-4xl font-bold">Contact</h1>
            <p className="text-center mb-10 block">If you have any questions/concerns or suggestions and feedback, feel free to send us a message at contact[at]heightcomparison.com</p>
            <ContactForm
                onSubmit={handleSubmit}
            />
        </div>
    )
}

export default page
