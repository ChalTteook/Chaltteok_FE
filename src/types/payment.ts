export interface PaymentMethod {
  method: string;
  label: string;
}

export interface PaymentRequest {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  customerEmail: string;
  successUrl: string;
  failUrl: string;
}

export interface PaymentResponse {
  success: boolean;
  errorCode?: string;
  errorMsg?: string;
  paymentKey?: string;
  orderId?: string;
  amount?: number;
} 