import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            🌱 EcoCity PPY Token Dashboard
          </h1>
          <p className="text-xl text-green-600 mb-8">
            Transforming Urban Waste into Digital Value
          </p>
          <div className="text-lg font-semibold text-green-700 bg-green-100 inline-block px-6 py-3 rounded-full">
            1 PPY = 1 KG = 1K COP = 1K COPe
          </div>
        </header>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <MetricCard
            title="Community Holders"
            value="2,847"
            icon="👥"
            change="+12.5%"
          />
          <MetricCard
            title="Daily Volume"
            value="45.2K COP"
            icon="💰"
            change="+8.3%"
          />
          <MetricCard
            title="Waste Recovered"
            value="1,234 kg"
            icon="♻️"
            change="+15.7%"
          />
          <MetricCard
            title="Solar Energy"
            value="89.4 kWh"
            icon="☀️"
            change="+9.1%"
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon="🏛️"
            title="Community Governance"
            description="Democratic decision-making for environmental initiatives"
          />
          <FeatureCard
            icon="🌱"
            title="Smart Cities"
            description="Energy-autonomous waste collection points"
          />
          <FeatureCard
            icon="📱"
            title="International Compliance"
            description="Following latest environmental regulations"
          />
        </div>

        {/* Footer */}
        <footer className="text-center py-8 text-green-600">
          <p className="mb-2">Built with 💚 for a sustainable future</p>
          <p className="text-sm">
            Transforming cities through community-driven waste recovery and renewable energy
          </p>
        </footer>
      </div>
    </main>
  );
}

function MetricCard({ title, value, icon, change }: {
  title: string;
  value: string;
  icon: string;
  change: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-medium text-green-600">{change}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-2xl font-bold text-green-700">{value}</p>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
