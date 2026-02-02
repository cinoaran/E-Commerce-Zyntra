export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-display font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Zyntra Shop
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Product Cards */}
        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">
            Produktkarten
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group/card bg-card text-card-foreground rounded-xl border p-6 hover:shadow-2xl transition-all hover:-translate-y-2">
              <div className="w-24 h-24 bg-linear-to-br from-primary/20 to-secondary/20 rounded-lg mb-4 flex items-center justify-center">
                👕
              </div>
              <h3 className="font-display text-xl font-bold mb-2">
                Premium T-Shirt
              </h3>
              <p className="text-muted-foreground mb-4">
                100% Baumwolle, OEKO-TEX
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-display font-bold text-primary">
                  €29,99
                </span>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-lg font-medium transition-all group-hover:scale-105">
                  In Warenkorb
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">
            Formulare
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {/* Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">E-Mail</label>
              <input
                type="email"
                placeholder="deine@email.de"
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              />
            </div>

            {/* Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Größe</label>
              <select className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent">
                <option>S</option>
                <option>M</option>
                <option>L</option>
                <option>XL</option>
              </select>
            </div>

            {/* Textarea */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Nachricht</label>
              <textarea
                rows={4}
                placeholder="Deine Nachricht..."
                className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical min-h-25"
              />
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-2xl font-display font-semibold mb-6">Buttons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-2xl">
            <button className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium shadow-lg hover:shadow-xl transition-all">
              Primary
            </button>
            <button className="w-full h-14 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl font-medium transition-all">
              Secondary
            </button>
            <button className="w-full h-14 border border-input hover:bg-accent/50 text-foreground rounded-xl font-medium transition-all">
              Outline
            </button>
            <button className="w-full h-14 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-xl font-medium transition-all">
              Delete
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
