import { Redirect } from 'expo-router';

// Explore tab is hidden (href: null). Redirect to home if somehow reached.
export default function ExploreRedirect() {
  return <Redirect href="/(tabs)" />;
}
