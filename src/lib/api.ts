const API_BASE_URL = 'http://sunnexgulf.com/admin/public/api';

export interface Project {
  id: number;
  heading: string;
  sub_heading: string;
  thumbnail: string;
  video_url: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export interface AboutData {
  id: number;
  image: string;
  content: string;
  vision: string;
  mission: string;
  values: string;
  excellence: string;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: number;
  name: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ServiceCategory {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  category_id: number;
  heading: string;
  sub_heading: string;
  image: string;
  overview: string;
  features: string[];
  status: string;
  created_at: string;
  updated_at: string;
  category: ServiceCategory;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface WhyChooseUs {
  id: number;
  heading: string;
  sub_heading: string;
  image: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CoreValue {
  id: number;
  heading: string;
  sub_heading: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ContactInfo {
  id: number;
  address: string;
  mobile_number: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface HomeDataResponse {
  status: string;
  data: {
    projects: Project[];
    about: AboutData;
    brands: Brand[];
    services: Service[];
    testimonials?: Testimonial[]; // Optional for future implementation
    why_choose_us?: WhyChooseUs[]; // Add this new field
    our_core_values?: CoreValue[]; // Add core values field
    contact_info?: ContactInfo; // Add contact info field
  };
}

export const fetchHomeData = async (): Promise<HomeDataResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/home-data`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: HomeDataResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching home data:', error);
    throw error;
  }
};

// Contact form submission types
export interface ContactFormValues {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  message?: string;
}

export interface ContactFormResponse {
  status: string;
  message: string;
  data: {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    type?: string;
    message?: string;
    created_at: string;
    updated_at: string;
  };
}

// Contact form submission function
export const submitContactForm = async (formData: ContactFormValues): Promise<ContactFormResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/queries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(Object.entries(formData).filter(([_, v]) => v !== undefined && v !== null)).toString()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ContactFormResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};
