import type { MovieCredits } from "../types/movie";

type MovieProfileProps = {
  credits: MovieCredits | null;
};

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

export default function MovieProfile({ credits }: MovieProfileProps) {
  if (!credits) return null;

  return (
    <section className="relative z-20 mx-auto max-w-7xl px-6 pb-16 text-white">
      <div className="space-y-16">
        <div>
          <h2 className="mb-6 text-2xl font-bold sm:text-3xl">출연진</h2>

          {credits.cast?.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {credits.cast.map((person, index) => (
                <div
                  key={`cast-${person.original_name}-${person.name}-${index}`}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
                >
                  {person.profile_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${person.profile_path}`}
                      alt={person.name}
                      className="h-64 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-64 w-full items-center justify-center bg-gray-800 text-sm text-gray-400">
                      No Image
                    </div>
                  )}

                  <div className="p-4">
                    <p className="text-base font-semibold">{person.name}</p>
                    <p className="mt-1 text-sm text-gray-400">
                      {person.original_name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">출연진 정보가 없습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}