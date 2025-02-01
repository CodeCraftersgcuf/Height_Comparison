import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type ContactFormProps = {
  onSubmit: (values: ContactFormValues) => void;
};

export type ContactFormValues = {
  email: string;
  name: string;
  subject: string;
  message: string;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const initialValues: ContactFormValues = {
    email: "",
    name: "",
    subject: "",
    message: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().required("Name is required"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form className="max-w-lg mx-auto p-6 border rounded-md shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Your email"
              className="w-full border p-2 rounded-md"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full border p-2 rounded-md"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Subject Field */}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium">
              Subject <span className="text-red-500">*</span>
            </label>
            <Field as="select" name="subject" className="w-full border p-2 rounded-md">
              <option value="">Choose</option>
              <option value="General Inquiry">General Inquiry</option>
              <option value="Support">Support</option>
              <option value="Feedback">Feedback</option>
            </Field>
            <ErrorMessage name="subject" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              name="message"
              placeholder="Your message"
              className="w-full border p-2 rounded-md h-24"
            />
            <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Submit
            </button>
            <button
              type="reset"
              className="text-gray-600 px-4 py-2 rounded-md hover:underline"
            >
              Clear form
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
