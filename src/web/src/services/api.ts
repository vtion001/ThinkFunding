import axios, { AxiosInstance, AxiosError } from 'axios';
import { useAuthStore } from '@/context/auth.store';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5001/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  role: string;
  businessName?: string;
  businessId?: string;
}

export interface Merchant {
  id: number;
  businessId: string;
  legalName: string;
  dbaName?: string;
  ein?: string;
  businessType?: string;
  industry?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email?: string;
  monthlyRevenue?: number;
  averageDailyBalance?: number;
  nsfCount: number;
  merchantStatus: string;
  source?: string;
  brokerId?: number;
  createdAt: string;
}

export interface CreateMerchantRequest {
  legalName: string;
  dbaName?: string;
  ein?: string;
  businessType?: string;
  industry?: string;
  addressLine1?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  phone?: string;
  email: string;
  monthlyRevenue?: number;
  averageDailyBalance?: number;
  source?: string;
  brokerId?: number;
}

export interface Application {
  id: number;
  applicationNumber: string;
  merchantId: number;
  merchantName?: string;
  applicationStatus: string;
  loanAmountRequested?: number;
  useOfFunds?: string;
  submittedAt?: string;
  reviewedBy?: number;
  reviewedByName?: string;
  decisionNotes?: string;
  createdAt: string;
}

export interface CreateApplicationRequest {
  merchantId: number;
  loanAmountRequested?: number;
  useOfFunds?: string;
}

export interface Deal {
  id: number;
  dealNumber: string;
  applicationId: number;
  applicationNumber?: string;
  merchantId: number;
  merchantName?: string;
  principalId?: number;
  principalName?: string;
  dealStatus: string;
  advanceAmount?: number;
  factorRate?: number;
  purchasePrice?: number;
  dailyPaymentAmount?: number;
  paymentMethod?: string;
  startDate?: string;
  expectedEndDate?: string;
  createdAt: string;
}

export interface CreateDealRequest {
  applicationId: number;
  advanceAmount: number;
  factorRate: number;
  paymentMethod?: string;
  startDate?: string;
}

export interface Document {
  id: number;
  documentType: string;
  documentSubType?: string;
  applicationId?: number;
  merchantId?: number;
  dealId?: number;
  fileName?: string;
  blobPath?: string;
  contentType?: string;
  fileSizeBytes?: number;
  uploadedAt?: string;
  reviewStatus: string;
}

export interface ApplicationFilterRequest {
  status?: string;
  merchantId?: number;
  fromDate?: string;
  toDate?: string;
}

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiResponse<unknown>>) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await this.client.post<ApiResponse<LoginResponse>>('/auth/login', {
      email,
      password,
    });
    if (!response.data.success || !response.data.data) {
      throw new Error(response.data.message || 'Login failed');
    }
    return response.data.data;
  }

  async register(data: {
    businessName: string;
    email: string;
    password: string;
    phone?: string;
    businessType?: string;
  }): Promise<void> {
    await this.client.post('/auth/register', data);
  }

  async getCurrentUser(): Promise<User> {
    const response = await this.client.get<ApiResponse<User>>('/auth/me');
    if (!response.data.success || !response.data.data) {
      throw new Error('Failed to get user');
    }
    return response.data.data;
  }

  async getMerchants(status?: string): Promise<Merchant[]> {
    const params = status ? { status } : {};
    const response = await this.client.get<ApiResponse<Merchant[]>>('/merchants', { params });
    return response.data.data || [];
  }

  async getMerchant(id: number): Promise<Merchant> {
    const response = await this.client.get<ApiResponse<Merchant>>(`/merchants/${id}`);
    if (!response.data.data) {
      throw new Error('Merchant not found');
    }
    return response.data.data;
  }

  async createMerchant(data: CreateMerchantRequest): Promise<Merchant> {
    const response = await this.client.post<ApiResponse<Merchant>>('/merchants', data);
    if (!response.data.data) {
      throw new Error('Failed to create merchant');
    }
    return response.data.data;
  }

  async updateMerchant(id: number, data: Partial<CreateMerchantRequest>): Promise<Merchant> {
    const response = await this.client.put<ApiResponse<Merchant>>(`/merchants/${id}`, data);
    if (!response.data.data) {
      throw new Error('Failed to update merchant');
    }
    return response.data.data;
  }

  async getApplications(filter?: ApplicationFilterRequest): Promise<Application[]> {
    const response = await this.client.get<ApiResponse<Application[]>>('/applications', {
      params: filter,
    });
    return response.data.data || [];
  }

  async getApplication(id: number): Promise<Application> {
    const response = await this.client.get<ApiResponse<Application>>(`/applications/${id}`);
    if (!response.data.data) {
      throw new Error('Application not found');
    }
    return response.data.data;
  }

  async createApplication(data: CreateApplicationRequest): Promise<Application> {
    const response = await this.client.post<ApiResponse<Application>>('/applications', data);
    if (!response.data.data) {
      throw new Error('Failed to create application');
    }
    return response.data.data;
  }

  async submitApplication(id: number): Promise<Application> {
    const response = await this.client.post<ApiResponse<Application>>(`/applications/${id}/submit`);
    if (!response.data.data) {
      throw new Error('Failed to submit application');
    }
    return response.data.data;
  }

  async approveApplication(id: number, notes?: string): Promise<Application> {
    const response = await this.client.post<ApiResponse<Application>>(`/applications/${id}/approve`, {
      decision: 'Approved',
      decisionNotes: notes,
    });
    if (!response.data.data) {
      throw new Error('Failed to approve application');
    }
    return response.data.data;
  }

  async declineApplication(id: number, notes: string): Promise<Application> {
    const response = await this.client.post<ApiResponse<Application>>(`/applications/${id}/decline`, {
      decision: 'Declined',
      decisionNotes: notes,
    });
    if (!response.data.data) {
      throw new Error('Failed to decline application');
    }
    return response.data.data;
  }

  async getDeals(filter?: { status?: string; merchantId?: number }): Promise<Deal[]> {
    const response = await this.client.get<ApiResponse<Deal[]>>('/deals', { params: filter });
    return response.data.data || [];
  }

  async getDeal(id: number): Promise<Deal> {
    const response = await this.client.get<ApiResponse<Deal>>(`/deals/${id}`);
    if (!response.data.data) {
      throw new Error('Deal not found');
    }
    return response.data.data;
  }

  async createDeal(data: CreateDealRequest): Promise<Deal> {
    const response = await this.client.post<ApiResponse<Deal>>('/deals', data);
    if (!response.data.data) {
      throw new Error('Failed to create deal');
    }
    return response.data.data;
  }

  async fundDeal(id: number, principalId: number, achData: {
    bankName: string;
    routingNumber: string;
    accountNumberLast4: string;
    accountType: string;
    authorizationType: string;
    authorizedBy: string;
  }): Promise<Deal> {
    const response = await this.client.post<ApiResponse<Deal>>(`/deals/${id}/fund`, {
      principalId,
      achAuthorization: achData,
    });
    if (!response.data.data) {
      throw new Error('Failed to fund deal');
    }
    return response.data.data;
  }

  async closeDeal(id: number, reason?: string): Promise<Deal> {
    const response = await this.client.post<ApiResponse<Deal>>(`/deals/${id}/close`, { reason });
    if (!response.data.data) {
      throw new Error('Failed to close deal');
    }
    return response.data.data;
  }

  async getDocuments(params?: {
    applicationId?: number;
    merchantId?: number;
  }): Promise<Document[]> {
    if (params?.applicationId) {
      const response = await this.client.get<ApiResponse<Document[]>>(`/documents/application/${params.applicationId}`);
      return response.data.data || [];
    }
    if (params?.merchantId) {
      const response = await this.client.get<ApiResponse<Document[]>>(`/documents/merchant/${params.merchantId}`);
      return response.data.data || [];
    }
    return [];
  }

  async uploadDocument(file: File, metadata: {
    documentType: string;
    documentSubType?: string;
    applicationId?: number;
    merchantId?: number;
    dealId?: number;
  }): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', metadata.documentType);
    if (metadata.documentSubType) {
      formData.append('documentSubType', metadata.documentSubType);
    }
    if (metadata.applicationId) {
      formData.append('applicationId', metadata.applicationId.toString());
    }
    if (metadata.merchantId) {
      formData.append('merchantId', metadata.merchantId.toString());
    }
    if (metadata.dealId) {
      formData.append('dealId', metadata.dealId.toString());
    }

    const response = await this.client.post<ApiResponse<Document>>('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (!response.data.data) {
      throw new Error('Failed to upload document');
    }
    return response.data.data;
  }

  async getDocumentDownloadUrl(id: number): Promise<string> {
    const response = await this.client.get<ApiResponse<{ url: string }>>(`/documents/${id}/download`);
    if (!response.data.data) {
      throw new Error('Failed to get download URL');
    }
    return response.data.data.url;
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await this.client.get<ApiResponse<{ status: string; timestamp: string }>>('/health');
    if (!response.data.data) {
      throw new Error('Health check failed');
    }
    return response.data.data;
  }
}

export const api = new ApiService();
export default api;
