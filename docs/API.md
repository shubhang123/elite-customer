# Elite Customer API Documentation

Complete API specification for integrating the Elite Customer mobile app with your backend.

---

## Base Configuration

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

All endpoints require `Authorization: Bearer <token>` header.

---

## Data Models

### User
```typescript
interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
}
```

### Job
```typescript
interface Job {
  id: string;
  status: string;           // e.g., "In Production", "Design Phase"
  estimatedDelivery: string; // e.g., "Dec 30, 2024"
  createdAt: string;        // ISO date
  updatedAt: string;        // ISO date
}
```

### ProgressStep
```typescript
interface ProgressStep {
  label: string;            // Step name, e.g., "Design Started"
  date: string;             // ISO date or empty string
  status: 'done' | 'inprogress' | 'pending';
  description?: string;     // Optional details
  estimatedDuration?: number; // Days (optional)
}
```

### ChatMessage
```typescript
interface ChatMessage {
  id: string;
  text: string;
  sender: 'customer' | 'designer';
  timestamp: string;        // ISO date
  imageUrl?: string;        // For attachments
  isDesignPreview?: boolean; // True for design approval cards
}
```

### Payment
```typescript
interface PaymentSummary {
  total: number;            // Total order amount
  paid: number;             // Amount paid
  due: number;              // Remaining balance
}

interface PaymentEntry {
  id?: string;
  date: string;             // ISO date
  amount: number;
  status: 'paid' | 'due';
  transactionId?: string;
  method?: string;          // 'card' | 'upi' | 'netbanking'
}
```

### Notification
```typescript
interface Notification {
  id: string;
  icon: string;             // Icon name (e.g., 'MdPayment')
  message: string;
  date: string;             // ISO date
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}
```

---

## API Endpoints

### Authentication

#### Login with Phone
```http
POST /auth/phone/send-otp
Content-Type: application/json

{
  "phone": "+449876543210"
}

Response: { "success": true, "verificationId": "xxx" }
```

#### Verify OTP
```http
POST /auth/phone/verify-otp
Content-Type: application/json

{
  "verificationId": "xxx",
  "otp": "123456"
}

Response: { "token": "jwt...", "user": User }
```

---

### User Profile

#### Get Profile
```http
GET /user/profile
Authorization: Bearer <token>

Response: User
```

#### Update Profile
```http
PUT /user/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}

Response: User
```

#### Get Active Job ID
```http
GET /user/active-job
Authorization: Bearer <token>

Response: { "jobId": "JOB12345" | null }
```

---

### Job & Progress

#### Get Job Summary
```http
GET /jobs/{jobId}
Authorization: Bearer <token>

Response: Job
```

#### Get Progress Steps
```http
GET /jobs/{jobId}/progress
Authorization: Bearer <token>

Response: ProgressStep[]
```

#### Get Full Job Details
```http
GET /jobs/{jobId}/details
Authorization: Bearer <token>

Response: {
  "job": Job,
  "progressSteps": ProgressStep[]
}
```

---

### Chat & Messaging

#### Get Chat Messages
```http
GET /jobs/{jobId}/chat
Authorization: Bearer <token>

Response: ChatMessage[]
```

#### Send Message
```http
POST /jobs/{jobId}/chat
Authorization: Bearer <token>
Content-Type: application/json

{
  "text": "Hello!",
  "imageUrl": "https://..." // optional
}

Response: ChatMessage
```

#### Submit Design Approval
```http
POST /jobs/{jobId}/design-approval
Authorization: Bearer <token>
Content-Type: application/json

{
  "messageId": "msg123",
  "approved": true,
  "feedback": "Optional feedback text"
}

Response: { "success": true }
```

#### Upload Image
```http
POST /jobs/{jobId}/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: <binary>

Response: { "url": "https://..." }
```

---

### Payments

#### Get Payment Summary
```http
GET /jobs/{jobId}/payments/summary
Authorization: Bearer <token>

Response: PaymentSummary
```

#### Get Payment History
```http
GET /jobs/{jobId}/payments/history
Authorization: Bearer <token>

Response: PaymentEntry[]
```

#### Initiate Payment
```http
POST /jobs/{jobId}/payments/initiate
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 25000,
  "method": "upi"
}

Response: {
  "paymentId": "pay123",
  "redirectUrl": "https://payment-gateway...",
  "orderId": "order123"
}
```

#### Verify Payment
```http
POST /jobs/{jobId}/payments/verify
Authorization: Bearer <token>
Content-Type: application/json

{
  "paymentId": "pay123"
}

Response: {
  "success": true,
  "transactionId": "txn123"
}
```

---

### Notifications

#### Get All Notifications
```http
GET /notifications
Authorization: Bearer <token>

Response: Notification[]
```

#### Mark as Read
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer <token>

Response: { "success": true }
```

#### Mark All as Read
```http
PUT /notifications/read-all
Authorization: Bearer <token>

Response: { "success": true }
```

#### Get Unread Count
```http
GET /notifications/unread-count
Authorization: Bearer <token>

Response: { "count": 3 }
```

---

## Page Data Requirements

| Page | Endpoints Required | Key Fields |
|------|-------------------|------------|
| **Home** | `/user/profile`, `/jobs/{id}`, `/jobs/{id}/progress`, `/notifications/unread-count` | user.name, job.status, job.estimatedDelivery, progress% |
| **Progress** | `/jobs/{id}`, `/jobs/{id}/progress` | job.status, progressSteps[] with label, date, status |
| **Chat** | `/jobs/{id}/chat` | messages[] with sender, text, timestamp, isDesignPreview |
| **Payments** | `/jobs/{id}/payments/summary`, `/jobs/{id}/payments/history` | total, paid, due, history[] |
| **Profile** | `/user/profile` | name, email, phone |
| **Notifications** | `/notifications` | notifications[] with message, date, read |

---

## Error Response Format

```typescript
interface ApiError {
  message: string;
  code?: string;
  status: number;
}

// Example
{
  "message": "Job not found",
  "code": "JOB_NOT_FOUND",
  "status": 404
}
```

---

## Demo Mode

When `NEXT_PUBLIC_API_URL` is not set, the app runs in demo mode with mock data. This allows testing without a backend.
