export type ContactInquiryInput = {
  name: string;
  phone: string;
  visitTime: string | null;
  /** A | B | C | D | E | 빈 문자열 */
  interestType: string;
  privacyConsent: boolean;
  privacyConsentAt: string;
};

export type ContactInquiryRecord = ContactInquiryInput & {
  id: string;
  createdAt: string;
};
