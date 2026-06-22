const API_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export interface CategoryGroup {
  id: number;
  name: string;
  sortOrder: number;
  categories: Category[];
}

export interface Category {
  id: number;
  name: string;
  sortOrder: number;
  applicationCount: number;
}

export interface Application {
  id: number;
  categoryId: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  description: string | null;
  status: string;
  createdAt: string;
  categoryName: string;
  groupName: string;
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Bir hata oluştu" }));
    throw new Error(err.error || "Bir hata oluştu");
  }
  return res.json();
}

export const api = {
  login: (username: string, password: string) =>
    apiFetch<{ token: string; username: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),

  getCategories: () => apiFetch<CategoryGroup[]>("/categories"),

  createApplication: (data: {
    categoryId: number;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    description?: string;
  }) =>
    apiFetch<{ id: number; message: string }>("/applications", {
      method: "POST",
      body: JSON.stringify({
        categoryId: data.categoryId,
        companyName: data.companyName,
        contactPerson: data.contactPerson,
        email: data.email,
        phone: data.phone,
        description: data.description,
      }),
    }),

  getApplications: (status?: string, categoryId?: number) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (categoryId) params.set("categoryId", String(categoryId));
    const qs = params.toString();
    return apiFetch<Application[]>(`/applications${qs ? "?" + qs : ""}`);
  },

  updateApplicationStatus: (id: number, status: string) =>
    apiFetch<{ message: string }>(`/applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  createCategory: (groupId: number, name: string) =>
    apiFetch<{ id: number; name: string }>("/categories", {
      method: "POST",
      body: JSON.stringify({ groupId, name }),
    }),

  updateCategory: (id: number, groupId: number, name: string, sortOrder: number) =>
    apiFetch<{ id: number; name: string }>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify({ groupId, name, sortOrder }),
    }),

  deleteCategory: (id: number) =>
    apiFetch<{ message: string }>(`/categories/${id}`, {
      method: "DELETE",
    }),

  getSlides: () => apiFetch<Slide[]>("/slides"),

  getAllSlides: () => apiFetch<Slide[]>("/slides/all"),

  createSlide: (data: {
    imageUrl: string;
    title?: string;
    subtitle?: string;
    description?: string;
    linkUrl?: string;
    linkText?: string;
    sortOrder: number;
    isActive: boolean;
  }) =>
    apiFetch<Slide>("/slides", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateSlide: (id: number, data: {
    imageUrl: string;
    title?: string;
    subtitle?: string;
    description?: string;
    linkUrl?: string;
    linkText?: string;
    sortOrder: number;
    isActive: boolean;
  }) =>
    apiFetch<Slide>(`/slides/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteSlide: (id: number) =>
    apiFetch<{ message: string }>(`/slides/${id}`, {
      method: "DELETE",
    }),

  getSocialMedia: () => apiFetch<SocialMediaItem[]>("/settings/social-media"),

  getAllSocialMedia: () => apiFetch<SocialMediaItem[]>("/settings/social-media/all"),

  createSocialMedia: (data: {
    platform: string;
    url: string;
    icon?: string;
    isActive: boolean;
  }) =>
    apiFetch<SocialMediaItem>("/settings/social-media", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateSocialMedia: (id: number, data: {
    platform: string;
    url: string;
    icon?: string;
    isActive: boolean;
  }) =>
    apiFetch<SocialMediaItem>(`/settings/social-media/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteSocialMedia: (id: number) =>
    apiFetch<{ message: string }>(`/settings/social-media/${id}`, {
      method: "DELETE",
    }),

  getContactInfo: () => apiFetch<ContactInfoItem[]>("/settings/contact"),

  uploadImage: async (file: File): Promise<{ url: string }> => {
    const token = getToken();
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "Yükleme hatası" }));
      throw new Error(err.error || "Yükleme hatası");
    }
    return res.json();
  },

  upsertContactInfo: (data: { type: string; value: string }[]) =>
    apiFetch<ContactInfoItem[]>("/settings/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export interface Slide {
  id: number;
  imageUrl: string;
  title: string | null;
  subtitle: string | null;
  description: string | null;
  linkUrl: string | null;
  linkText: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface SocialMediaItem {
  id: number;
  platform: string;
  url: string;
  icon: string | null;
  isActive: boolean;
}

export interface ContactInfoItem {
  id: number;
  type: string;
  value: string;
}
