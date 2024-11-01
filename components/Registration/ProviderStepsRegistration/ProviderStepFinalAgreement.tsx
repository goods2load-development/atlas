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
      <h3 className="font-semibold text-[20px]/[24px] mb-2">
        Acknowledgment of Understanding and Responsibility
      </h3>
      <p className="mb-8 text-[14px]">
        By signing this form, I hereby confirm that:
      </p>

      <div className="text-[14px]/[17px]">
        <p className="mb-8">
          <strong>Accuracy of Information: </strong>I certify that all
          information provided in this application is complete, accurate, and
          truthful to the best of my knowledge. I understand that providing
          false or misleading information may result in the denial of my
          application or termination of any agreement with Goods2Load, as well
          as damaging the performance of the platform and my own potential to
          rank accurately.
        </p>

        <p className="mb-8">
          <strong>Responsibility for Information: </strong>I acknowledge that it
          is my responsibility to ensure that all details submitted are correct.
          I will promptly inform Goods2Load of any changes to the information
          provided in this application, including but not limited to changes in
          company structure, ownership, contact information, and operational
          capabilities.
        </p>

        <p className="mb-8">
          <strong>Language Proficiency: </strong>I confirm that I possess full
          proficiency in the language used in this document and understand all
          terms and conditions. I accept full responsibility for the information
          declared herein.
        </p>

        <p className="mb-8">
          <strong>Compliance with Laws: </strong>I agree to comply with all
          applicable laws and regulations of the United Arab Emirates, including
          but not limited to those pertaining to logistics and transportation
          services. I understand that non-compliance may result in legal action
          or the revocation of my enrollment.
        </p>

        <p className="mb-8">
          <strong>Indemnification: </strong>I agree to indemnify and hold
          harmless Goods2Load, its affiliates, and employees from any claims,
          losses, damages, liabilities, or expenses (including legal fees)
          arising from my use of the Goods2Load platform or any information
          provided in this application.
        </p>

        <p className="mb-8">
          <strong>Data Privacy: </strong>I consent to the collection,
          processing, and storage of my personal and company information by
          Goods2Load as necessary for enrollment, in accordance with applicable
          data protection laws.
        </p>

        <p className="mb-8">
          <strong>Review and Approval: </strong>I understand that Goods2Load
          reserves the right to review and approve my application at its sole
          discretion. Enrollment does not guarantee access to all services
          offered by Goods2Load.
        </p>

        <p className="mb-8">
          <strong>Governing Law: </strong>
          This agreement shall be governed by and construed in accordance with
          the laws of the United Arab Emirates. Any disputes arising from this
          agreement shall be resolved in the competent courts of the UAE.
        </p>

        <p className="mb-8">
          <strong>Acknowledgment of Terms: </strong>I have read, understood, and
          fully accept the Terms and Conditions, Privacy Policy, and Cookie
          Policy of Goods2Load.
        </p>

        <p className="mb-8">
          <strong>Rejection of Application: </strong>
          In the event that my application is rejected, I acknowledge that all
          information submitted, along with any attached documents, will be
          automatically deleted from the system without retention or further
          notice.
        </p>
      </div>

      <FormField
        control={form.control}
        name="finalAgreement"
        render={({ field }) => (
          <FormItem className="w-full mb-5">
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
