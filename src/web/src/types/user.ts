export interface User {
  id: string
  email: string
  role: 'merchant' | 'admin' | 'underwriter' | 'viewer'
  businessName?: string
  firstName?: string
  lastName?: string
}

export interface Merchant extends User {
  role: 'merchant'
  businessName: string
  merchantId: string
}

export interface Employee extends User {
  role: 'admin' | 'underwriter' | 'viewer'
  firstName: string
  lastName: string
}
