import clsx from 'clsx';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

export const FormStepFinalAgreement = ({ form }: { form: any }) => {
  return (
    <div>
      <h2 className="font-semibold text-[16px]/[24px] mb-4 text-center">
        Services Subscription Agreement
      </h2>

      <div className="text-[12px]/[1.2em] border-b border-amber-600 pb-3.5">
        <p className="mb-4">
          This <strong>Services Subscription Agreement</strong> (“Agreement”)
          governs the relationship between<strong> Goods2Load</strong>, a
          company registered under the laws of{' '}
          <strong>United Arab Emirates (UAE) </strong>, having trade license
          number 47010212 with its principal place of business at{' '}
          <strong>
            Compass Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras
            Al Khaimah (RAK), United Arab Emirates (UAE)
          </strong>
          (the “Company”), as the provider of the Platform, and
          <strong> you</strong>, the Subscriber (the “Subscriber”). <br />
          The Company and the Subscriber are collectively referred to as the “
          <strong>Parties</strong>” and individually as a “
          <strong>Party</strong>”.
          <br />
          <br />
          By completing the signup and enrollment process, you acknowledge that
          you have read, understood, and agreed to be bound by this Agreement.
        </p>

        <h2 className="mb-2 text-center text-xs">
          <strong>PREAMBLE:</strong>
        </h2>

        <ol className="letter-order mb-4">
          <li>
            <strong>Whereas</strong>, the Company offers an online platform
            (“Platform”) designed to simplify logistics for small and
            medium-sized businesses (“Users”);
          </li>
          <li>
            <strong>Whereas</strong>, the Company offers paid subscription plans
            allowing the Subscriber to list and promote their logistics services
            (“Offerings”) on the Platform;
          </li>
          <li>
            <strong>Whereas</strong>, the Subscriber wishes to subscribe to the
            Company’s services under the terms of this Agreement.
          </li>
          <p className={'mt-2 -ml-4'}>
            <strong>NOW, THEREFORE</strong>, the Parties agree as follows:
          </p>
        </ol>

        {/*Scope of this Agreement section*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>1. Scope of this Agreement</strong>
        </h2>

        <ol className="number-order mb-2">
          <li>
            The Company agrees to provide the Subscriber with access to its
            Platform and related subscription features (“Subscription Services”)
            in exchange for the applicable Subscription Fee.
          </li>
          <li>
            The Subscription Services may include, but are not limited to:
            <ul className={'unordered-list mt-1'}>
              <li>
                Generating leads by promoting the Subscriber’s Offerings to
                Users on the Platform;
              </li>
              <li>
                Providing a dashboard with insights and analytics about
                performance and market trends;
              </li>
              <li>Displaying sustainability rankings (e.g., green badges);</li>
              <li>
                Any additional features or services the Company may introduce
                from time to time.
              </li>
            </ul>
          </li>
        </ol>

        {/*Registration and Subscriber Obligations*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>2. Registration and Subscriber Obligations</strong>
        </h2>

        <ol className="number-order mb-2">
          <li>
            <strong> Accuracy of Information:</strong> The Subscriber shall
            provide accurate, current, and complete information during
            registration and promptly update it as needed. Providing false or
            misleading information may result in suspension or termination of
            the Subscription.
          </li>
          <li>
            <strong>Good Faith Representations:</strong> The Subscriber warrants
            that all service descriptions, qualifications, and claims made on
            the Platform are truthful and up to date
          </li>
          <li>
            <strong>Compliance with Laws:</strong> The Subscriber shall comply
            with all applicable laws, including licensing and permit
            requirements.
          </li>
          <li>
            <strong>Updates and Changes:</strong> The Subscriber must notify the
            Company at{' '}
            <a href={'mailto:legal@goods2load.com'} target="_blank">
              {' '}
              legal@goods2load.com
            </a>{' '}
            of any updates to their Offerings, including service changes or
            contact details.
          </li>
          <li>
            <strong>Restriction on Use:</strong> The Platform must be used
            solely for legitimate business purposes in compliance with
            applicable laws.
          </li>
        </ol>

        {/*Provision of Information*/}
        <h2 className="mb-2 text-center text-xs">
          <strong>3. Provision of Information</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Required Information: </strong> <br />
            The Subscriber shall provide all necessary and accurate information
            requested by the Company to ensure proper display and comparison of
            Offerings. Failure to do so may result in delayed or inaccurate
            listings, for which the Company is not liable.
          </li>
          <li>
            <strong>Content Standards:</strong> <br />
            All submitted information must be true, accurate, and compliant with
            applicable laws. Content violating intellectual property,
            advertising, or consumer protection laws will be removed at the
            Company’s discretion.
          </li>
          <li>
            <strong>Intellectual Property License: </strong> <br />
            The Subscriber grants the Company a non-exclusive, royalty-free,
            worldwide license to use the Subscriber’s name, logo, trademarks,
            and service details for Platform operations and promotional
            purposes. The Subscriber warrants ownership or authorization of all
            such materials and agrees to indemnify the Company against related
            third-party claims.
          </li>
          <li>
            <strong>Advertising:</strong> <br />
            The Company may display or create promotional content related to the
            Subscriber’s services on the Platform. The Company retains
            discretion over how such content appears.
          </li>
          <li>
            <strong>Google Reviews:</strong> <br />
            The Subscriber shall maintain an authentic Google Reviews page. The
            Company may display such reviews on the Platform but is not
            responsible for their verification.
          </li>
        </ol>

        {/*Offerings Comparison and Lead Generation*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>4. Lead Generation and Offerings</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            The Platform serves as an informational and promotional tool to
            connect Users with Subscribers.
          </li>
          <li>
            The Subscriber remains solely responsible for final quotes,
            negotiations, and terms offered to Users.
          </li>
          <li>
            The Company will make reasonable efforts to verify leads but does
            not guarantee their authenticity or conversion.
          </li>
          <li>
            The Company makes no guarantees regarding the volume or success of
            leads generated.
          </li>
        </ol>

        {/* Independent Transactions*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>5. Independent Transactions</strong>
        </h2>

        <p className={'mb-2'}>
          Any transactions or agreements resulting from Platform leads are
          concluded directly between the Subscriber and the User. The Company is
          not a party to such agreements and assumes no liability for their
          performance.
        </p>

        {/*Limitation of Liability*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>6. Limitation of Liability</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            The Company’s responsibility is limited to forwarding verified
            leads. It does not warrant the accuracy of User information or
            guarantee business results.
          </li>
          <li>
            To the fullest extent permitted by law, the Company’s total
            liability under this Agreement shall not exceed the total
            Subscription Fees paid by the Subscriber in the twelve (12) months
            preceding the claim.
          </li>
        </ol>

        {/*Payment Terms*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>7. Payment Terms</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Subscription Fees:</strong> <br />
            The Subscriber may choose between the following prepaid plans:
            <br />
            <br />
            <span className={'text-sm'}>
              <strong>- BUSINESS PACK, USD 699</strong> for a{' '}
              <strong>12-month (annual)</strong> subscription, paid in advance;
              or
              <br />
              <strong>- START PACK, USD 499</strong> for a{' '}
              <strong>6-month (semi-annual)</strong> subscription, paid in
              advance.
              <br />
            </span>
          </li>
          <li>
            The Subscription Fee must be paid in full before activation. Failure
            to pay will result in denial of access to the Platform.
          </li>
          <li>
            <strong>No Refunds or Reimbursements:</strong> <br />
            All payments made under this Agreement are{' '}
            <strong> final and non-refundable</strong>. The Company shall not
            issue any refunds or reimbursements, whether full or partial,
            including in cases of early termination, non-use of the Platform, or
            dissatisfaction with the services.
          </li>
          <li>
            <strong>Renewal Notice:</strong> <br />
            The Company shall notify the Subscriber
            <strong> 30 days prior to renewal</strong>. Renewal shall occur only
            upon payment of the applicable fee for the new term. The Company may
            adjust the Subscription Fee upon renewal, with prior written notice.
          </li>
        </ol>

        {/*Term and Termination*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>8. Term and Termination</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Term:</strong> <br />
            This Agreement becomes effective upon payment and continues for the
            selected Subscription Period (6 or 12 months).
          </li>
          <li>
            <strong>Termination:</strong> <br />
            Either Party may terminate this Agreement with written notice if the
            other Party breaches any material term and fails to remedy such
            breach within 15 days of written notice.
          </li>
          <li>
            <strong>Effect of Termination:</strong> <br />
            Upon termination, the Company shall provide a 30-day window for the
            Subscriber to export or retrieve data. After this period, the
            Company may delete all data unless otherwise required by law.
          </li>
        </ol>

        {/*Data Collection and Use*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>9. Data Collection and Use</strong>
        </h2>

        <p className={'mb-2'}>
          The Subscriber consents to the Company’s use of aggregated or
          pseudonymized data for analytics, market research, and service
          improvement. Such data will not identify the Subscriber or its
          personnel. The Company retains full discretion over the analysis and
          presentation of such data.
        </p>

        {/*Governing Law and Dispute Resolution*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>10. Governing Law and Dispute Resolution</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Governing Law:</strong> <br />
            This Agreement shall be governed by the laws of the{' '}
            <strong>United Arab Emirates (UAE).</strong>
          </li>
          <li>
            <strong>Jurisdiction:</strong> <br />
            Any disputes arising from this Agreement shall be subject to the
            <strong>exclusive jurisdiction of the Dubai Courts.</strong>
          </li>
        </ol>

        {/*Notices*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>11. Notices</strong>
        </h2>
        <div className={'mb-4'}>
          All notices shall be in writing and delivered via email as follows:{' '}
          <br />
          <br />
          <div className={'ml-2'}>
            <strong>To the Company:</strong> <br />
            <span className={'font-bold'}>Attn:</span> Goods2load Legal Team{' '}
            <br />
            <span className={'font-bold'}>Email: </span>
            <a
              href={'mailto:legal@goods2load.com'}
              className={'text-[#ff6720]'}
            >
              legal@goods2load.com
            </a>{' '}
            <br />
            <br />
            <strong>To the Subscriber:</strong> <br />
            <strong>Email:</strong> As provided during signup and enrollment.
          </div>
        </div>

        {/*Miscellaneous*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>12. Miscellaneous</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Entire Agreement:</strong> <br />
            This Agreement constitutes the entire understanding between the
            Parties.
          </li>
          <li>
            <strong>Amendments: </strong> <br />
            Must be in writing and signed by both Parties.
          </li>
          <li>
            <strong>Severability:</strong> <br />
            Invalid provisions shall not affect the remainder of the Agreement.
          </li>
          <li>
            <strong>Waiver: </strong> <br />
            Failure to exercise any right does not constitute a waiver of future
            rights.
          </li>
          <li>
            <strong>Headings:</strong> <br />
            Are for convenience only and do not affect interpretation.
          </li>
          <li>
            <strong>Counterparts: </strong> <br />
            This Agreement may be executed electronically and in counterparts.
          </li>
          <li>
            <strong>Confidentiality: </strong> <br />
            Both Parties agree to keep this Agreement and its terms confidential
            unless disclosure is required by law.
          </li>
        </ol>
      </div>

      <FormField
        control={form.control}
        name="finalAgreement"
        render={({ field }) => (
          <FormItem className="w-full mb-5 mt-4">
            <FormControl>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <div
                    className={clsx(
                      'w-4 h-4 rounded-[2px] border-2 border-gray-300 flex justify-center items-center cursor-pointer',
                    )}
                  >
                    <div
                      className={clsx(
                        'w-2 h-2 rounded-[1px]',
                        field.value === true ? 'bg-primaryOrange' : 'bg-white',
                      )}
                    />
                  </div>
                  <input
                    className="hidden"
                    type="radio"
                    value={'true'}
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                  />
                  <span className="cursor-pointer">I ACCEPT</span>
                </label>

                <label className="flex items-center gap-2">
                  <div
                    className={clsx(
                      'w-4 h-4 rounded-[2px] border-2 border-gray-300 flex justify-center items-center cursor-pointer',
                    )}
                  >
                    <div
                      className={clsx(
                        'w-2 h-2 rounded-[1px]',
                        field.value === false || !field.value
                          ? 'bg-primaryOrange'
                          : 'bg-white',
                      )}
                    />
                  </div>
                  <input
                    className="hidden"
                    type="radio"
                    value="false"
                    checked={field.value === false || !field.value}
                    onChange={() => field.onChange(false)}
                  />
                  <span className="cursor-pointer">I REJECT</span>
                </label>
                <FormMessage />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
