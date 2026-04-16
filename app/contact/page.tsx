import ContactForm from "@/components/contact/ContactForm";
import ChannelCards from "@/components/contact/ChannelCards";

export const metadata = {
  title: "Contact — JKE Studio",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-brand-black px-6 pt-32 pb-20 md:px-20">
      <div className="grid gap-20 md:grid-cols-2">
        <div>
          <h1 className="mb-4 font-display text-6xl uppercase text-brand-white md:text-8xl">
            Get in <span className="text-brand-accent">Touch</span>
          </h1>
          <p className="mb-12 max-w-md font-body text-lg text-brand-white/60">
            Have a project in mind? Let&rsquo;s create something extraordinary
            together.
          </p>
          <ContactForm />
        </div>
        <div>
          <h2 className="mb-8 font-display text-3xl uppercase text-brand-white">
            Other Channels
          </h2>
          <ChannelCards />
        </div>
      </div>
    </main>
  );
}
