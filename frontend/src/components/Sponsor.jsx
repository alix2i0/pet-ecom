// Sample logos for demonstration purposes
const sponsors = [
  { id: 1, name: "Coca-cola", logo: "/../../1x/coca-cola.svg" },
  { id: 2, name: "Spotify", logo: "/../../1x/spotify.svg" },
  { id: 3, name: "Adobe XD", logo: "/../../1x/adobe-xd.svg" },
  { id: 4, name: "Google", logo: "/../../1x/google.svg" },
  { id: 5, name: "Coca-cola", logo: "/../../1x/coca-cola.svg" },
  { id: 6, name: "Spotify", logo: "/../../1x/spotify.svg" },
  { id: 7, name: "Adobe XD", logo: "/../../1x/adobe-xd.svg" },
  { id: 8, name: "Google", logo: "/../../1x/google.svg" },
];

const Sponsor = () => {
  return (
    <div className="sponsor-ticker overflow-hidden w-full bg-gradient-to-r from-gray-50 via-gray-200 to-gray-50">
      <div className="animate-marquee flex items-center justify-end ">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="flex flex-col items-center justify-center mx-10"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-32 my-4 opacity-75 hover:opacity-100 transition-opacity duration-300"
            />
            <h3 className="text-lg font-bold text-gray-800">{sponsor.name}</h3>
            <p className="text-sm text-center text-gray-600">
              {sponsor.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsor;
