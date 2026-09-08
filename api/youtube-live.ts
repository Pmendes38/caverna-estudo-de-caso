type ApiRequest = { method?: string };
type ApiResponse = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  end: () => void;
};

const channelLiveUrl = 'https://www.youtube.com/@acaverna396/live';

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'GET') {
    response.status(405).end();
    return;
  }

  response.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=60');

  try {
    const youtubeResponse = await fetch(channelLiveUrl, {
      headers: {
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
        'User-Agent': 'Mozilla/5.0 (compatible; IgrejaACLiveCheck/1.0)',
      },
    });
    const html = await youtubeResponse.text();
    const live = youtubeResponse.ok && (
      /"isLiveNow"\s*:\s*true/.test(html)
      || /"isLiveBroadcast"\s*:\s*true/.test(html)
    );

    response.status(200).json({ live });
  } catch {
    response.status(200).json({ live: false });
  }
}
