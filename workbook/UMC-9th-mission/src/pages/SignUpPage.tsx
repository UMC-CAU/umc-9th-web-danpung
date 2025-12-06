import { useState } from 'react'; //회원가입 페이지
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import profile from '../assets/profile.webp';
import { signUp } from '../api/auth';
import GoogleButton from '../components/GoogleButton';
const schema = z.object({
  email: z.string().email({ message: '올바른 이메일 형식이 아닙니다.' }),
  password: z.string().min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
  confirmPassword: z
    .string()
    .min(1, { message: '비밀번호를 다시 입력해주세요.' }),
  nickName: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
  bio: z.string().optional(),
  avatar: z.string().optional(),
});

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const email = watch('email');
  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const nickName = watch('nickName');
  const matchError = confirmPassword && password !== confirmPassword;

  const onSubmit = async (formData: FormFields) => {
    try {
      const result = await signUp({
        name: formData.nickName,
        email: formData.email,
        password: formData.password,
        bio: formData.bio,
        avatar: formData.avatar,
      });
      console.log('회원가입 성공:,', result);
      alert('회원가입 성공');
      navigate('/');
    } catch (error: any) {
      console.log('회원가입 실패:', error.response?.data || error.message);
      alert('회원가입 실패');
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && !errors.email && email) setStep(2);
    else if (
      step === 2 &&
      !errors.password &&
      !errors.confirmPassword &&
      !matchError &&
      password
    )
      setStep(3);
  };

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-50">
      <form
        onSubmit={step === 3 ? handleSubmit(onSubmit) : handleNext}
        className="relative flex flex-col gap-4 items-center w-80 p-6 bg-white rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-center w-full">
          <button
            type="button"
            onClick={() => (step === 1 ? navigate('/') : setStep(step - 1))}
            className="absolute left-4 font-bold text-xl"
          >
            &lt;
          </button>
          <h1 className="font-bold text-2xl">회원가입</h1>
        </div>

        {step === 1 && (
          <div className="flex flex-col items-center">
            <input
              {...register('email')}
              placeholder="이메일을 입력하세요"
              className="w-60 border rounded border-gray-400 box-border px-2 py-2 mb-3 focus:border-green-500 outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <button
              type="submit"
              className={`border rounded w-60 h-8 text-white transition ${
                !email || errors.email
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700'
              }`}
            >
              다음
            </button>
          </div>
        )}

        {step === 2 && (
          <>
            <span className="font-semibold text-gray-500 text-sm">
              ✉️ {email}
            </span>

            <div className="relative w-60">
              <input
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                className="w-full border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showPassword ? '🕶️' : '👓'}
              </button>
            </div>

            <div className="relative w-60">
              <input
                {...register('confirmPassword')}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호를 다시 입력하세요"
                className="w-full border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 text-sm"
              >
                {showConfirmPassword ? '🕶️' : '👓'}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
            {matchError && (
              <p className="text-red-500 text-sm">
                비밀번호가 일치하지 않습니다.
              </p>
            )}

            <button
              type="submit"
              className={`border rounded w-60 h-8 text-white transition ${
                errors.password ||
                errors.confirmPassword ||
                matchError ||
                !password
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700'
              }`}
            >
              다음
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <img
              src={profile}
              alt="프로필"
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <input
              {...register('nickName')}
              placeholder="닉네임을 입력하세요"
              className="w-60 border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none"
            />
            {errors.nickName && (
              <p className="text-red-500 text-sm">{errors.nickName.message}</p>
            )}

            <button
              type="submit"
              className={`border rounded w-60 h-8 text-white transition ${
                !nickName || errors.nickName
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-700'
              }`}
            >
              회원가입 완료
            </button>
          </>
        )}
        <GoogleButton />
      </form>
    </div>
  );
};

export default SignUpPage;
