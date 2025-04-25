import { type ComponentType } from 'react';

export interface NavItem {
  title: string;
  path?: string;
  href?: string;
  icon?: ComponentType;
  isExternal?: boolean;
  children?: NavItem[];
}