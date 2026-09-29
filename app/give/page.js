import { getSettings } from '@/lib/content';
import CopyButton from '@/components/CopyButton';

export const metadata = { title: 'Give | HisGatesChristianHub' };

export default function Give() {
  const { offering = {} } = getSettings();
  const hasDetails = offering.accountNumber;

  return (
    <>
      <div className="page-title">
        <div className="wrap">
          <h1>Give</h1>
          <p>Voluntary offerings that support the work of the fellowship.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {hasDetails ? (
            <div className="card">
              <p><strong>Account name:</strong> {offering.accountName}</p>
              <p><strong>Bank:</strong> {offering.bank}</p>
              <p>
                <strong>Account number:</strong> {offering.accountNumber}
                <CopyButton text={offering.accountNumber} />
              </p>
            </div>
          ) : (
            <p>Our giving details will be available here soon.</p>
          )}

          <div className="notice">
            Before you send anything, check that the account name shown in your banking app matches
            the name above. These are the only official giving details of the fellowship.
          </div>
        </div>
      </section>
    </>
  );
}