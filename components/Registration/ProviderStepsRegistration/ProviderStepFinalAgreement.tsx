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
      <h1 className="font-semibold text-[16px]/[24px] mb-4 text-center">
        Services Subscription Agreement
      </h1>

      <div className="text-[10px]/[1.2em] border-b border-amber-600 pb-3.5">
        <p className="mb-4">
          This Services Subscription Agreement (“<strong>Agreement</strong>”)
          governs the relationship between Goods2Load, a company registered
          under the laws of United Arab Emirates (UAE), having trade license
          number 47010212 with its principal place of business at Compass
          Building, Al Shohada Road, Al Hamra Industrial Zone-FZ, Ras Al Khaimah
          (<strong>RAK</strong>), United Arab Emirates (UAE) (the “
          <strong>Company</strong>”), as the provider of the Platform, and
          <strong> you</strong>, the Subscriber (also referred to as “
          <strong>you</strong>,” “<strong>your</strong>,” or “
          <strong>Subscriber</strong>”). The Company and the Subscriber are
          collectively referred to as the “<strong>Parties</strong>” and
          individually as a “<strong>Party</strong>”.
          <br />
          <br />
          By completing the signup and enrollment process, you agree to these
          terms and conditions in their entirety.
        </p>

        <h2 className="mb-2 text-center text-xs">
          <strong>PREAMBLE:</strong>
        </h2>

        <ol className="letter-order mb-4">
          <li>
            Whereas the Company offers an online platform (&#34;
            <strong>Platform</strong>&#34;) under the terms and conditions as
            applicable thereto, to simplify logistics for small and medium-sized
            businesses (SMBs) who are the intended users of the Platform (“
            <strong>Users</strong>”);
          </li>
          <li>
            Whereas, the Company is offering a Subscription Plan for listing the
            Subscriber’s Offerings on the Platform and promoting the same to the
            Users through the Platform;
          </li>
          <li>
            Whereas the Subscriber agrees to avail the Subscription offered by
            the Company in accordance with the terms of this Agreement. However,
            the Company shall not charge the Subscription Fee to the Subscriber
            until the 1st May 2025;
          </li>
          <p className={'mt-2 -ml-4'}>
            NOW, THEREFORE, the Parties hereby agree to the following terms and
            conditions.
          </p>
        </ol>

        {/*Scope of this Agreement section*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>1. Scope of this Agreement</strong>
        </h2>

        <ol className="number-order mb-2">
          <li>
            The Company agrees to provide an annual membership to the Subscriber
            for the Subscription Fee (“<strong>Subscription</strong>”), and the
            Subscriber agrees to subscribe to the Subscription from the Company
            as per the terms of this Agreement.
          </li>
          <li>
            The Company’s offerings (“<strong>Subscription Services</strong>”)
            under the Subscription may be inclusive of but not limited to the
            following:
            <ul className={'unordered-list mt-1'}>
              <li>
                Generate leads for the Subscriber by promoting their
                transportation service offerings (&#34;
                <strong>Offerings</strong>&#34;) to Users on the Platform. These
                Offerings include, but are not limited to, industry-specific
                solutions, service availability, operational capabilities, and
                any additional useful logistical data about the Subscriber;
              </li>
              <li>
                Provide a dashboard where the Subscriber can access actionable
                insights, including information about Users;
              </li>
              <li>
                Display sustainability rankings and promote the Subscriber&#39;s
                Offerings to Users through green badge rankings;
              </li>
              <li>
                Any other offerings that the Company in its discretion may make
                available to Subscribers from time to time.
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
            provide accurate, current, and complete information during the
            registration process, including but not limited to personal details,
            business information, contact information, and any other data
            required by the Company. The Subscriber agrees to maintain and
            promptly update such information throughout the Term of this
            Agreement to ensure its accuracy and completeness. The Subscriber
            represents and warrants that all information provided is true,
            correct, and not misleading. Failure to provide accurate information
            may result in suspension or termination of the Subscriber&#39;s
            account.
          </li>
          <li>
            <strong>Good Faith Representations:</strong> All representations,
            warranties, and disclosures made by the Subscriber in relation to
            their Offerings on the Platform—including but not limited to service
            descriptions, qualifications, certifications, and availability—shall
            be made in good faith and must be truthful, accurate, and not
            misleading. The Subscriber agrees to promptly update any information
            at{' '}
            <a href={'mailto:legal@goods2load.com'} target="_blank">
              legal@goods2load.com
            </a>{' '}
            that becomes inaccurate, false, or misleading to maintain
            transparency and trust with users of the Platform. The Subscriber
            acknowledges that providing false or misleading information shall
            grant the Company the right to suspend the Subscription Plan of the
            Subscriber and at the Company’s sole option the right to terminate
            this Agreement.
          </li>
          <li>
            <strong>Compliance with Laws:</strong> The Subscriber shall comply
            with all applicable laws, statutes, regulations, and ordinances in
            the provision of its Offerings, including obtaining all necessary
            licenses and permits.
          </li>
          <li>
            <strong>Updates and Changes:</strong> The Subscriber shall promptly
            notify the Company at{' '}
            <a href={'mailto:legal@goods2load.com'} target="_blank">
              {' '}
              legal@goods2load.com
            </a>{' '}
            of any changes to their Offerings, including but not limited to
            modifications in industry-wise service offerings, availability,
            terms of service, contact information, or any other relevant
            details. The Subscriber is responsible for ensuring that all
            information displayed on the Platform regarding their Offerings is
            accurate, current, and complete. Failure to provide timely updates
            may result in the dissemination of incorrect information to Users,
            for which the Subscriber accepts full responsibility. The Company
            reserves the right to remove or modify any content that is outdated,
            inaccurate, or in violation of this Agreement.
          </li>
          <li>
            <strong>Restriction on Use:</strong> The Subscriber shall use the
            Platform and Features in compliance with the applicable laws and for
            legitimate purposes.
          </li>
        </ol>

        {/*Provision of Information*/}
        <h2 className="mb-2 text-center text-xs">
          <strong>3. Provision of Information</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Required Information: </strong> <br />
            a) The Subscriber shall, at the request of the Company, from time to
            time, provide all necessary, relevant, accurate, and up-to-date
            information required for the Company to generate Offering
            Comparisons as specified in clause 4.1. This information may
            include, but is not limited to, the Subscriber’s Offerings, delivery
            schedules, product or service availability, operational capacities,
            and any other relevant logistical data as requested by the Company.
            <br />
            <br />
            b) The Subscriber acknowledges that failure to provide complete and
            accurate information in a timely manner may delay or hinder the
            Company’s ability to deliver the Features effectively and could
            result in incomplete or inaccurate Offering comparisons. The Company
            shall not be held liable for any such delays or inaccuracies
            attributable to the Subscriber&#39;s failure to provide requisite
            information.
          </li>
          <li>
            <strong>Content Standards:</strong> <br />
            a) The Subscriber warrants that all information and content supplied
            to the Company for use on the Platform, including but not limited to
            Offerings, and business-related details, shall be true, accurate,
            complete, not misleading, and in compliance with all applicable
            laws, regulations, and industry standards, including advertising and
            consumer protection laws. <br />
            <br />
            b) The Subscriber further undertakes not to upload or provide any
            content that infringes on the intellectual property rights of third
            parties, violates any contractual obligations, or contains
            inappropriate, offensive, or illegal material. <br />
            <br />
            c) The Company reserves the right to review, modify, or remove any
            content provided by the Subscriber that does not adhere to the
            aforementioned standards, and the Subscriber agrees to promptly
            cooperate with any such requests for revisions or additional
            information to ensure compliance.
          </li>
          <li>
            <strong>Intellectual Property License: </strong> <br />
            a) The Subscriber hereby grants the Company a non-exclusive,
            royalty-free, worldwide, perpetual, irrevocable license to use,
            reproduce, display, distribute, or otherwise make available the
            Subscriber&#34;s trademarks, logos, trade names, service marks,
            service descriptions, and other branding elements (&#34;
            <strong>Subscriber Content</strong>&#34;) on the Platform as
            necessary for the proper delivery of the Features and for
            promotional and marketing purposes related to the Platform. <br />
            <br />
            b) The Subscriber represents and warrants that it owns or otherwise
            possesses all necessary rights, licenses, and authority to grant the
            aforementioned license to the Company, and that the Company’s use of
            the Subscriber Content in accordance with this agreement will not
            infringe on the rights of any third party. <br />
            <br />
            c) The Subscriber shall indemnify and hold the Company harmless from
            any and all claims, liabilities, damages, or expenses (including
            reasonable legal fees) arising out of or in connection with any
            third-party claims alleging infringement of intellectual property
            rights based on the Company’s use of the Subscriber Content as
            licensed hereunder.
          </li>
          <li>
            <strong>Advertising on the Platform</strong> <br />
            a)The Subscriber acknowledges and agrees that the Company may offer
            advertising services on the platform as part of the Subscription.
            The Subscriber consents to the Company creating, developing, and
            publishing advertising or marketing content on the platform as the
            Company deems appropriate. This content may be related to the
            Subscriber&#39;s activities or services, or other relevant subjects,
            as determined by the Company. <br />
            <br />
            b) The Subscriber further agrees that the Company has full
            discretion in the creation and presentation of such advertising
            material and waives any right to dispute, challenge, or request
            changes to the marketing or advertising content produced or
            displayed on the platform in connection with the Subscriber.
          </li>
          <li>
            <strong>Maintenance of Google Reviews</strong> <br />
            a)The Subscriber is responsible for maintaining an active and
            legitimate Google Reviews page. The Subscriber agrees to ensure that
            all reviews displayed on this page are authentic, representing the
            genuine opinions and experiences of its customers. The Subscriber
            shall not engage in any practices that involve fabricating,
            manipulating, or falsifying reviews. <br />
            <br />
            b) The Company may, at its discretion, display the Subscriber’s
            Google Reviews on the platform for the benefit of the Users,
            allowing them to consider these reviews when engaging with the
            Subscriber’s services. The Company is not responsible for verifying
            the accuracy of the reviews but will ensure they are presented as-is
            from the Subscriber’s Google Reviews page..
          </li>
        </ol>

        {/*Offerings Comparison and Lead Generation*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>4. Offerings Comparison and Lead Generation</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Offering Comparison:</strong> <br />
            a) The Platform is intended solely for informational and comparative
            purposes to assist Users in evaluating potential service options.
            <br />
            <br />
            b) The Subscriber retains sole responsibility for providing final,
            accurate, and binding quotes directly to Users who express interest
            in their Offerings.
            <br />
            <br />
            c) Any changes in the Offerings, or other service-related terms
            after publications of the same on the Platform shall be promptly
            communicated by the Subscriber to the Company and/or the relevant
            Users (as applicable), and the Subscriber shall indemnify the
            Company from any claims arising due to failure to communicate such
            changes in a timely manner.
          </li>
          <li>
            <strong>Lead Verification:</strong> <br />
            a) The Company will make reasonable efforts to verify the
            authenticity and genuineness of User inquiries before forwarding
            them to the Subscriber. However, the Subscriber acknowledges that
            these efforts may not always detect inaccuracies, and the Company
            does not guarantee the authenticity or accuracy of all inquiries or
            leads.
            <br />
            <br />
            b) The Subscriber agrees to independently review and assess the
            validity of any User inquiry or lead received via the Platform, and
            the Subscriber assumes full responsibility for its decision to
            engage with or respond to any lead. The Company shall not be liable
            for any losses, damages, or expenses incurred by the Subscriber as a
            result of responding to or engaging with non-genuine or fraudulent
            leads.
          </li>
          <li>
            <strong>No Guarantee of Lead Conversion or Volume:</strong> <br />
            a) The Company makes no representations, warranties, or guarantees
            regarding the conversion of leads generated through the Platform
            into actual business transactions. The Subscriber acknowledges that
            the ultimate success of any lead depends on a variety of factors,
            including but not limited to the Subscriber’s sales process, service
            offerings, pricing, and negotiations with potential Users.
            <br />
            <br />
            b)The Company does not guarantee the provision of any minimum number
            of leads, inquiries, or opportunities for the Subscriber. Lead
            volume may fluctuate based on various market conditions, User
            demand, and the Subscriber&#39;s competitiveness on the Platform.
          </li>
        </ol>

        {/*Independent Conclusion of Services*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>5. Independent Conclusion of Services</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Independent Negotiation and Agreement:</strong> <br />
            a) Upon receiving a lead or inquiry from a User via the Platform,
            the Subscriber and the User may engage in direct communication to
            negotiate the terms, conditions, and scope of any potential
            transaction, service arrangement, or engagement. The Company shall
            not participate in, mediate, or influence such negotiations, nor
            shall it be responsible for ensuring the success of any such
            negotiations.
            <br />
            <br />
            b) The Subscriber acknowledges that all agreements, contracts, or
            arrangements resulting from these negotiations, including but not
            limited to pricing, delivery schedules, warranties, service levels,
            and any other terms, shall be independently and exclusively
            concluded between the Subscriber and the User. The Subscriber
            assumes full responsibility for the successful conclusion and
            execution of any such agreements.
          </li>
          <li>
            <strong>Company’s Non-Involvement and Disclaimer:</strong> <br />
            The Company expressly disclaims any role or responsibility in the
            creation, negotiation, or enforcement of any contractual or legal
            relationship between the Subscriber and the User. The Company is
            not, and shall not be deemed to be, a party to any agreement,
            contract, or understanding entered into between the Subscriber and
            the User as a result of leads generated through the Platform.
          </li>
        </ol>

        {/*Limitation of Liability*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>6. Limitation of Liability</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Forwarding Leads:</strong> <br />
            a) The Subscriber acknowledges and agrees that the Company’s sole
            obligation with respect to lead generation is to make reasonable
            efforts to forward genuine and verified leads to the Subscriber in
            accordance with Clause 4. The Company does not guarantee the
            quality, volume, or outcome of such leads, nor does it guarantee
            that forwarded leads will result in business transactions for the
            Subscriber.
            <br />
            <br />
            b) The Company disclaims any responsibility or liability for the
            accuracy, completeness, or authenticity of the information provided
            by Users in connection with any lead forwarded to the Subscriber,
            beyond the verification efforts outlined in Clause 4.2.
          </li>
          <li>
            <strong>Limitation of Damages:</strong> <br />
            Notwithstanding anything to the contrary contained in this
            Agreement, and to the fullest extent permitted by applicable law,
            the Company&#39;s total aggregate liability, whether arising in
            contract, tort (including negligence), or otherwise, for any claims,
            damages, losses, or liabilities related to this Agreement or the use
            of the Platform and Features, shall in no event exceed the total
            amount of fees paid by the Subscriber to the Company for the
            Subscription in the twelve (12) months immediately preceding the
            event giving rise to the claim.
          </li>
        </ol>

        {/*Payment Terms*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>7. Payment Terms</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Subscription Fees:</strong> <br />
            a) The Subscriber agrees to receive a free subscription plan (“
            <strong>Free Subscription Plan</strong>”) from the date of execution
            of this Agreement until 1st May 2025 (the “
            <strong>Free Period</strong>”). During the Free Period, the
            Subscriber shall have complimentary access to the Platform.
            <br />
            <br />
            b) After the Free Period ends, the Subscriber agrees to pay an
            annual subscription fee of USD 699 (the “
            <strong>Subscription Fee</strong>”) if the Subscriber wishes to
            continue the use of the Subscription Services and the Platform.
            <br />
            <br />
            c) The Company reserves the right to adjust the Subscription Fee or
            implement new fee, subject to prior written notice provided to the
            Subscriber. Adjusted fees will take effect upon the renewal of the
            Subscription.
          </li>
          <li>
            <strong>Payment Schedule:</strong> <br />
            a) The Subscription Fee is billed annually. Payments for the
            Subscription Fee must be made using the methods specified by the
            Company, which will be communicated in advance.
            <br />
            <br />
            b) Subject to clause 7.1(a), the Subscriber will not be granted
            access to the Platform or permitted to use any of the Subscription
            Features until full payment of the Subscription Fee has been
            received and processed by the Company. Any delays in payment of the
            Subscription Fee will result in a delay or denial of access to the
            Platform.
          </li>
        </ol>

        {/*Term and Termination*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>8. Term and Termination</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Term:</strong> <br />
            After the Free Period comes to an end, the term of the subscription
            period shall commence on the date the Subscriber pays the
            Subscription Fee and shall continue for a period of one (1) year (“
            <strong>Subscription Period</strong>”). Thereafter, this Agreement
            shall automatically terminate upon the expiry of the Subscription
            Period unless the Subscriber renews the Subscription. Any renewal
            may be subject to revised Subscription Fees, which shall be
            communicated to the Subscriber prior to or at the time of renewal.
          </li>
          <li>
            <strong>Effect of Termination:</strong> <br />
            Upon termination or expiration of this Agreement, the Company shall,
            for a period of thirty (30) days after termination, upon the
            Subscriber’s written request, provide a means to export or retrieve
            Subscriber data. After such period, the Company may delete all
            Subscriber data unless otherwise required by law.
          </li>
        </ol>

        {/*Data collection and Use of Data*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>9. Data Collection and Use of Data</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            Notwithstanding anything to the contrary in this Agreement, the
            Subscriber consents to the Company using data provided by the
            Subscriber in a pseudonymised or aggregated form for the purposes of
            analyzing market trends, generating analytics, and improving the
            functionality and services of its platform. The Company shall ensure
            that the data is processed in a manner that does not identify the
            Subscriber or any individual associated with the Subscriber.
          </li>
          <li>
            The Company has sole discretion over the processing, analysis, and
            presentation of the data on its platform. The Subscriber agrees that
            the Company&#39;s decisions are final and waives any right to
            dispute or challenge how the data is used or displayed.
          </li>
        </ol>

        {/*Governing Law and Dispute Resolution*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>10. Governing Law and Dispute Resolution</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Governing Law:</strong> <br />
            This Agreement shall be governed by and construed in accordance with
            the laws of the UAE.
          </li>
          <li>
            <strong>Dispute Resolution:</strong> <br />
            Any dispute arising out of or in connection with this contract,
            including any question regarding its existence, validity or
            termination, shall be subject to the exclusive jurisdiction of the
            Dubai Courts.
          </li>
        </ol>

        {/*Notices*/}
        <h2 className="mb-2 text-center text-xs">
          <strong>11. Notices</strong>
        </h2>
        <div className={'mb-4'}>
          All notices required under this Agreement shall be in writing and
          delivered by email to the following email addresses: <br />
          <br />
          <div className={'ml-2'}>
            <strong>To the Company:</strong> <br />
            <span className={'font-bold'}>Attn:</span> JESSICA PANIGARI <br />
            <span className={'font-bold'}>Email: </span>
            <a
              href={'mailto:jpanigari@goods2load.com'}
              className={'text-[#ff6720]'}
            >
              jpanigari@goods2load.com
            </a>{' '}
            <br />
            <br />
            <strong>To the Subscriber:</strong> <br />
            <strong>Email:</strong> As provided at the time of signup and
            enrollment process
          </div>
        </div>

        {/*Miscellaneous*/}

        <h2 className="mb-2 text-center text-xs">
          <strong>12. Miscellaneous</strong>
        </h2>

        <ol className={'number-order mb-2'}>
          <li>
            <strong>Entire Agreement:</strong> <br />
            This Agreement, including all schedules and attachments, constitutes
            the entire agreement between the Parties and supersedes all prior
            and contemporaneous agreements, understandings, negotiations, and
            discussions, whether oral or written.
          </li>
          <li>
            <strong>Amendments: </strong> <br />
            Any amendments or modifications to this Agreement must be in writing
            and signed by authorized representatives of both parties.
          </li>
          <li>
            <strong>Severability:</strong> <br />
            If any provision of this Agreement is held to be invalid, illegal,
            or unenforceable, the remaining provisions shall remain in full
            force and effect.
          </li>
          <li>
            <strong>Waiver: </strong> <br />
            Failure to exercise any right under this Agreement shall not
            constitute a waiver of any other rights.
          </li>
          <li>
            <strong>Headings:</strong> <br />
            The headings in this Agreement are for reference purposes only and
            shall not affect the interpretation of this Agreement.
          </li>
          <li>
            <strong>Counterparts: </strong> <br />
            This Agreement may be executed in counterparts, each of which shall
            be deemed an original, but all of which together shall constitute
            one and the same instrument.
          </li>
          <li>
            <strong>Confidentiality: </strong> <br />
            The Parties agree to keep the content of this Agreement strictly
            confidential. Neither Party shall make or permit any person
            connected with it to make any announcement concerning this Agreement
            or any ancillary matter except as required by law or any competent
            regulatory body or with the prior written consent of the Company.
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
