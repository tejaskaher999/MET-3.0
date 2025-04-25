
export interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  children?: Omit<NavItem, 'children'>[];
}
