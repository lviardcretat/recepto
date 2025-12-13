export interface SidebarDynamicSectionConfig {
  routes: Record<string, string | null>;
  defaultComponent: string | null;
}

export const getSidebarDynamicSectionConfig = (): SidebarDynamicSectionConfig => {
  return {
    routes: {
      '/recipes/all': 'FilterPanelComponent',
      '/recipes/:id': 'FilterPanelComponent',
    },
    defaultComponent: null,
  };
};

export function matchRoute(currentPath: string, routePattern: string): boolean {
  // Handle exact matches
  if (currentPath === routePattern) {
    return true;
  }

  // Convert route pattern to regex
  // Replace :param with regex pattern
  const regexPattern = routePattern
    .replace(/:[^/]+/g, '[^/]+')
    .replace(/\//g, '\\/');

  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(currentPath);
}

export function getComponentForRoute(currentPath: string, config: SidebarDynamicSectionConfig): string | null {
  // Check each route pattern
  for (const [routePattern, componentName] of Object.entries(config.routes)) {
    if (matchRoute(currentPath, routePattern)) {
      return componentName;
    }
  }

  // Return default if no match
  return config.defaultComponent;
}
