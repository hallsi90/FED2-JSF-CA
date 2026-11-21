const fieldClassName =
  "min-h-12 w-full rounded-lg border border-slate-500 bg-white px-3 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-700";

function ContactPage() {
  return (
    <section>
      <title>Contact | Veya</title>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4">Get in touch with us.</p>

      <form className="mt-6 grid max-w-xl gap-5">
        <div className="grid gap-2">
          <label htmlFor="fullName" className="font-medium">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            className={fieldClassName}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="subject" className="font-medium">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className={fieldClassName}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClassName}
          />
        </div>

        <div className="grid gap-2">
          <label htmlFor="message" className="font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className={`${fieldClassName} resize-y`}
          />
        </div>
      </form>
    </section>
  );
}

export default ContactPage;
