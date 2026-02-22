export const typeDefs = `#graphql
  type Service {
    id: ID!
    name: String!
    description: String!
    price: Float!
    duration: Int!
    category: String!
  }

  type User {
    id: ID!
    email: String!
    fullName: String!
    role: String!
  }

  type Appointment {
    id: ID!
    userId: ID!
    serviceId: ID!
    service: Service
    user: User
    date: String!
    status: String!
  }

  type ClinicalProgress {
    id: ID!
    userId: ID!
    treatmentName: String!
    progressPercent: Int!
    status: String!
    lastUpdate: String!
  }

  type AdminStats {
    totalUsers: Int!
    activeAppointments: Int!
    revenueMonth: Float!
    retentionRate: Float!
  }

  type Query {
    services: [Service]
    service(id: ID!): Service
    appointments(userId: ID!): [Appointment]
    allAppointments: [Appointment]
    allUsers: [User]
    clinicalProgress(userId: ID!): [ClinicalProgress]
    adminStats: AdminStats
    currentUser: User
  }

  type Mutation {
    bookAppointment(serviceId: ID!, date: String!): Appointment
    updateAppointmentStatus(id: ID!, status: String!): Appointment
    deleteAppointment(id: ID!): Boolean
    toggleUserStatus(id: ID!, role: String!): User
    updateProfile(fullName: String!): User
    login(email: String!, password: String!): User
  }
`;
