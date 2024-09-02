import { RouteSegments, StaticRoutes } from 'expo-router';
import { renderRouter, screen, waitFor } from 'expo-router/testing-library';

export function renderRouterPaia(
  segments: RouteSegments<StaticRoutes>,
  options?: Parameters<typeof renderRouter>[1],
) {
  renderRouter('src/app', options);

  return waitFor(() => {
    expect(screen).toHaveSegments(segments);
  });
}
