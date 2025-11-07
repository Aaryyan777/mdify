// YouTube video utilities

export function getYouTubeEmbed(videoId: string, autoplay = true): string {
  const params = new URLSearchParams();
  params.append("autoplay", autoplay ? "1" : "0");
  params.append("controls", "0");

  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?si=lk_Epge1DV4JaaJT&${params.toString()}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}
