export interface StoreConfigResponseDto {
  success: boolean;
  data: {
    store: {
      name: string;
      logo: {
        url: string | null;
        alt: string;
        width: number;
        height: number;
      };
      contactEmail: string | null;
      socialMedia: {
        [key: string]: string;
      };
    };
    theme: {
      colors: {
        primary: string;
        secondary: string;
        background: string;
      };
    };
    hero: {
      enabled: boolean;
      slides: Array<{
        id: string;
        title: string;
        subtitle: string | null;
        description: string | null;
        imageUrl: string;
        imageUrlMobile: string | null;
        cta: {
          text: string | null;
          link: string | null;
          style: string;
        };
        secondaryCta?: {
          text: string | null;
          link: string | null;
          style: string | null;
        };
        alignment: string;
        backgroundColor: string | null;
        textColor: string | null;
        overlay: boolean;
        overlayOpacity: number;
        order: number;
      }>;
    };
  };
}
