export interface MedicalProfile {
    bloodType?: string;
    allergies: string[];
    medications: string[];
    conditions: string[];
    emergencyContacts: {
        name: string;
        relation: string;
        phone: string;
    }[];
    height?: string;
    weight?: string;
    updatedAt?: Date;
}

export interface UserProfile {
    uid: string;
    email: string;
    displayName: string;
    createdAt: Date;
    profile?: MedicalProfile;
}

export interface ShareToken {
    tokenId: string;
    userId: string;
    createdAt: number; // Timestamp
    expiresAt: number; // Timestamp
    scopes: string[]; // ["allergies", "medications", etc.]
    active: boolean;
}

export interface AccessLog {
    logId: string;
    userId: string;
    tokenId: string;
    accessedAt: number;
    ipAddress?: string;
    userAgent?: string;
}
