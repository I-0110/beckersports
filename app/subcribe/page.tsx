import SubscribeForm from "@/app/ui/subscribe/subscribe-form";

export default function SubscribePage() {
  return (
    <div className="min-h-screen bg-chiefs-dark">
      {/* Hero */}
      <div className="bg-chiefs-1 py-16 px-6 text-center">
        <h1 className="font-logo text-4xl lg:text-5xl text-chiefs-a mb-3">
          Stay in the game
        </h1>
        <p className="font-post-content text-base text-chiefs-light max-w-md mx-auto">
          Get the latest Chiefs coverage and NFL analysis delivered straight to your inbox.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <SubscribeForm />
        </div>
      </div>
    </div>
  );
}