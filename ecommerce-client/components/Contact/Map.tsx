export default function Map() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <iframe
          title="ShopEase Location"
          src="https://maps.google.com/maps?q=Basra&t=&z=13&ie=UTF8&iwloc=&output=embed"
          className="h-[450px] w-full rounded-2xl border"
          loading="lazy"
        />
      </div>
    </section>
  );
}
