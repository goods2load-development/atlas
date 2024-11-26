import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import arrowRightIcon from '@/assets/icons/arrow-right-input.svg';
import { useNewsletterStore } from '@/lib/store';
import { zodResolver } from '@hookform/resolvers/zod';

import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type FormValues = z.infer<typeof schema>;

export default function JoinOurNewsLetter() {
  const { joinNewsletter, isNewsletterLoading } = useNewsletterStore();
  const { toast } = useToast();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async ({ email }: FormValues) => {
    try {
      const data = await joinNewsletter(email);

      if (data) {
        toast({
          description: 'You have successfully joined our newsletter',
          className: 'bg-green-500 text-white',
        });
      }
    } catch (error) {
      toast({
        description: 'Your email address is already on our magic list',
        className: 'bg-yellow-400 text-white',
      });
      return;
    }

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="md:max-w-[246px] min-w-[320px] md:min-w-max ml-auto"
    >
      <legend className="mb-4 font-semibold text-center sm:text-left">
        Join our News Letter
      </legend>
      <div className="relative">
        <Input
          type="email"
          className="pr-9 w-full text-black"
          placeholder="Enter your email"
          {...register('email')}
        />
        <button
          type="submit"
          title="send"
          className="absolute top-1/2 right-2 -translate-y-1/2"
        >
          <Image src={arrowRightIcon} width={24} height={24} alt="send" />
        </button>
      </div>
      {errors.email && <p className="text-sm">{errors.email?.message}</p>}
    </form>
  );
}
