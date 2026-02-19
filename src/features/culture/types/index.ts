export interface CultureCard {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  order: number;
}

export interface CultureSection {
  id: string;
  title: string;
  cards: CultureCard[];
}

export interface CulturePageAuthor {
  fullName: string;
  position: string;
  avatarUrl?: string;
}
