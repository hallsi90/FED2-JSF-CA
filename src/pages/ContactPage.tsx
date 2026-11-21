import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "../schemas/contactSchema";

const fieldClassName =
  "min-h-12 w-full rounded-lg border border-slate-500 bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700 aria-invalid:border-red-700";

const errorClassName = "text-sm text-red-700";

function ContactPage() {
  const [messageChecked, setMessageChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  });

  function handleValidSubmit() {
    setMessageChecked(true);
  }

  function clearFeedback() {
    setMessageChecked(false);
  }

  return (
    <section>
      <title>Contact | Veya</title>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4">
        Get in touch with us by filling out the form below. We look forward to
        hearing from you!
      </p>

      <form
        className="mt-6 grid max-w-xl gap-5"
        noValidate
        onChange={clearFeedback}
        onSubmit={handleSubmit(handleValidSubmit, clearFeedback)}
      >
        <div className="grid gap-2">
          <label htmlFor="fullName" className="font-medium">
            Full name
          </label>
          <input
            {...register("fullName")}
            id="fullName"
            type="text"
            autoComplete="name"
            required
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className={fieldClassName}
          />
          {errors.fullName && (
            <p id="fullName-error" className={errorClassName}>
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="subject" className="font-medium">
            Subject
          </label>
          <input
            {...register("subject")}
            id="subject"
            type="text"
            required
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={fieldClassName}
          />
          {errors.subject && (
            <p id="subject-error" className={errorClassName}>
              {errors.subject.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClassName}
          />
          {errors.email && (
            <p id="email-error" className={errorClassName}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`${fieldClassName} resize-y`}
          />
          {errors.message && (
            <p id="message-error" className={errorClassName}>
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="min-h-12 w-full rounded-lg bg-purple-700 px-6 py-3 font-semibold text-white hover:bg-purple-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-700 sm:w-auto sm:justify-self-start"
        >
          Send message
        </button>

        <div role="status">
          {messageChecked && (
            <p className="rounded-lg border border-emerald-700 bg-emerald-50 p-4 text-emerald-900">
              Thank you for contacting us! We have received your message and
              will get back to you as soon as possible.
            </p>
          )}
        </div>
      </form>
    </section>
  );
}

export default ContactPage;
