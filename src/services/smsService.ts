export interface SMSMessagePayload {
  toPhone: string;
  body: string;
  type: 'appointment_reminder' | 'vaccine_reminder' | 'security_code' | 'doctor_message';
}

export interface SMSProviderInterface {
  sendSMS(payload: SMSMessagePayload): Promise<{ success: boolean; messageId: string }>;
}

class SimulatedSMSProvider implements SMSProviderInterface {
  async sendSMS(payload: SMSMessagePayload): Promise<{ success: boolean; messageId: string }> {
    console.log(`[SMS DISPATCH - UZBEKISTAN CARRIER] To: ${payload.toPhone} | Text: ${payload.body}`);
    // Simulate carrier network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      messageId: `sms-${Date.now()}`
    };
  }
}

export const smsProvider: SMSProviderInterface = new SimulatedSMSProvider();
