import Hero from "@/components/Contact/Hero";
import ContactForm from "@/components/Contact/ContactForm";
import ContactInfo from "@/components/Contact/ContactInfo";
import Map from "@/components/Contact/Map";

export default function ContactPage() {
  return (
    <main>
      <Hero />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-20 lg:grid-cols-2">
        <ContactForm />

        <ContactInfo />
      </section>

      <Map />
    </main>
  );
}
