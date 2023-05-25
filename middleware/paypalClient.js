import paypal from '@paypal/checkout-server-sdk';
import ENV from '../config.js';

class PayPalClient {
  constructor() {
    this.environment = new paypal.core.SandboxEnvironment(
      ENV.PAYPAL_CLIENT_ID,
      ENV.PAYPAL_CLIENT_SECRET
    );
    this.paypalClient = new paypal.core.PayPalHttpClient(this.environment);
  }

  getClient() {
    return this.paypalClient;
  }
}

export { PayPalClient };
